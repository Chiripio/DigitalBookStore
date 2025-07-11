import { Component, OnInit, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { SqliteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  mostrarMenu: boolean = true;
  usuario: any = null;
  usuarioLogueado: boolean = false;
  appPages: any[] = [];

  ngOnInit() {
    this.sqliteService.initDB()
      .then(() => {
        console.log('🟢 Base de datos inicializada correctamente');
        return this.sqliteService.createUsuariosTable();
      })
      .then(() => {
        return this.sqliteService.getAllUsuarios()
          .then(usuarios => {
            const usuario = usuarios?.find(u => u.correo === 'admin@admin.com');
            if (!usuario) {
              console.log('👤 Usuario por defecto no encontrado. Insertando...');
              return this.sqliteService.insertUsuario({
                nombre: 'Eduardo',
                apellido: 'Guerrero',
                correo: 'admin@admin.com',
                contrasena: '123456',
                confirmar_contrasena: '123456',
                nivel_estudio: 'Superior',
                fecha_nacimiento: '1990-01-01'
              }).then(() => {});
            } else {
              console.log('👤 Usuario por defecto ya existe.');
              return;
            }
          });
      })
      .then(() => {
        return this.sqliteService.getAllUsuarios();
      })
      .then(usuarios => {
        console.log('📋 Usuarios actuales en SQLite:', usuarios);
      })
      .catch(error => console.error('❌ Error al inicializar DB o insertar usuario:', error));

    this.actualizarUsuarioActivo();

    // Escuchar evento personalizado emitido después del login
    window.addEventListener('usuarioIniciado', () => {
      this.actualizarUsuarioActivo();
    });

    // Escuchar cambios en el almacenamiento local desde otras pestañas/ventanas
    window.addEventListener('storage', () => {
      this.actualizarUsuarioActivo();
    });
  }

  constructor(
    private router: Router,
    private menu: MenuController,
    @Inject(DOCUMENT) public document: Document,
    private sqliteService: SqliteService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.mostrarMenu = event.url !== '/login';
      });

    // Solo en desarrollo o para pruebas E2E con Cypress
    if (window && !(window as any)['sqliteService']) {
      (window as any)['sqliteService'] = this.sqliteService;
    }
  }

  async cerrarSesion() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Cerrar sesión';
    alert.message = '¿Estás seguro de que deseas cerrar sesión?';
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Aceptar',
        handler: () => {
          localStorage.removeItem('usuarioActivo');
          localStorage.removeItem('usuario');
          window.dispatchEvent(new Event('usuarioCerroSesion')); // Notifica logout
          this.actualizarUsuarioActivo(); // Actualiza el menú y estado
          this.menu.close(); // Cierra el menú lateral
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/login']);
            });
          }, 300);
        },
      },
    ];
    document.body.appendChild(alert);
    await alert.present();
  }

  navigateAndClose(ruta: string) {
    const usuarioActivo = localStorage.getItem('usuarioActivo');

    switch (ruta) {
      case '/perfil-usuario':
        if (usuarioActivo === 'true') {
          this.router.navigate(['/perfil-usuario']);
        } else {
          this.router.navigate(['/login']);
        }
        break;

      case '/logout':
        this.cerrarSesion();
        break;

      case '/mapa-gps':
        // Aseguramos que solo se navegue cuando se llama explícitamente
        this.router.navigate(['/mapa-gps']);
        break;

      default:
        this.router.navigate([ruta]);
        break;
    }

    this.menu.close();
  }

  actualizarMenu() {
    if (this.usuario) {
      this.appPages = [
        { title: 'Inicio', url: '/home', icon: 'home' },
        { title: 'Catálogo', url: '/catalogo', icon: 'book' },
        { title: 'Ofertas', url: '/ofertas', icon: 'pricetag' },
        { title: 'Tiendas', url: '/tiendas', icon: 'map' },
        { title: 'Carrito', url: '/carrito', icon: 'cart' },
        { title: 'Perfil Usuario', url: '/perfil-usuario', icon: 'person' },
        { title: 'Mapa GPS', url: '/mapa-gps', icon: 'location' },
        { title: 'Cerrar sesión', url: '/logout', icon: 'log-out' }
      ];
    } else {
      this.appPages = [
        { title: 'Inicio', url: '/home', icon: 'home' },
        { title: 'Catálogo', url: '/catalogo', icon: 'book' },
        { title: 'Ofertas', url: '/ofertas', icon: 'pricetag' },
        { title: 'Tiendas', url: '/tiendas', icon: 'map' },
        { title: 'Mapa GPS', url: '/mapa-gps', icon: 'location' },
        { title: 'Login', url: '/login', icon: 'log-in' }
      ];
    }
  }

  actualizarUsuarioActivo() {
    const activo = localStorage.getItem('usuarioActivo');
    this.usuarioLogueado = activo === 'true';
    this.usuario = this.usuarioLogueado ? localStorage.getItem('usuario') : null;

    console.log('¿Usuario logueado?:', this.usuarioLogueado);
    this.actualizarMenu();
    this.document.body.setAttribute('data-usuario-logueado', this.usuarioLogueado.toString());
  }
}
