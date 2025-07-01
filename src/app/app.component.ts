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
    this.sqliteService.initDB().then(() => {
      this.sqliteService.createUsuariosTable();
    });

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
    this.router.navigate([ruta]);
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
        { title: 'Cerrar sesión', url: '/logout', icon: 'log-out' }
      ];
    } else {
      this.appPages = [
        { title: 'Inicio', url: '/home', icon: 'home' },
        { title: 'Catálogo', url: '/catalogo', icon: 'book' },
        { title: 'Ofertas', url: '/ofertas', icon: 'pricetag' },
        { title: 'Tiendas', url: '/tiendas', icon: 'map' },
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
