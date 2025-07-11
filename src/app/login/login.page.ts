import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  // 👇 Esto fuerza a NO usar standalone
  standalone: false
})
export class LoginPage implements OnInit {
  public clima: {
    icono: string;
    temperatura: number;
    descripcion: string;
    ciudad: string;
  } | null = null;

  user = {
    usuario: '',
    password: ''
  };

  constructor(
    private alertController: AlertController,
    private router: Router,
    private storageService: StorageService,
    private sqliteService: SqliteService
  ) {}

  async ngOnInit() {
    await this.sqliteService.initDB();
    await this.sqliteService.createUsuariosTable();

    try {
      const usuarios = await this.sqliteService.getAllUsuarios();
      console.log('👥 Usuarios almacenados en SQLite:', usuarios);
    } catch (error) {
      console.error('❌ Error al obtener usuarios desde SQLite:', error);
    }

    this.verificarPermisoGeolocalizacion();
  }

  ionViewWillEnter() {
    const activo = localStorage.getItem('usuarioActivo');
    if (activo === 'true') {
      this.router.navigate(['/perfil-usuario']);
    }
  }

  async verificarPermisoGeolocalizacion() {
    if (!navigator.geolocation) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Geolocalización no está soportada por tu dispositivo.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiKey = '3aa40bf58c891102b7f62742923f8b68';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          this.clima = {
            icono: data.weather[0].icon,
            temperatura: data.main.temp,
            descripcion: data.weather[0].description,
            ciudad: data.name
          };
        } catch (error) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo obtener el clima.',
            buttons: ['Aceptar']
          });
          await alert.present();
        }
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Permiso denegado',
          message: 'No se otorgaron permisos para usar el GPS.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    );
  }

  async ingresar() {
    if (!this.user.usuario || !this.user.password) {
      if (!this.user.usuario) {
        const alert = await this.alertController.create({
          header: 'Campo requerido',
          message: 'Correo es obligatorio',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }

      if (!this.user.password) {
        const alert = await this.alertController.create({
          header: 'Campo requerido',
          message: 'Contraseña es obligatoria',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }
    }

    try {
      await this.sqliteService.initDB();
      const isOpen = await this.sqliteService.isDBOpen?.();
      if (!isOpen) {
        console.error('❌ La base de datos no está abierta.');
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo abrir la base de datos.',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }
      await this.sqliteService.createUsuariosTable();


      const usuarioEncontrado = await this.sqliteService.getUsuarioPorCredenciales(
        this.user.usuario.trim().toLowerCase(),
        this.user.password
      );
      console.log('🔍 Buscando usuario con:', this.user.usuario, this.user.password);
      console.log('🔎 Resultado de búsqueda:', usuarioEncontrado);

      if (usuarioEncontrado && usuarioEncontrado.correo) {
        console.log('✅ Usuario encontrado:', usuarioEncontrado);
        await this.storageService.set('usuario', usuarioEncontrado.correo);
        localStorage.setItem('usuarioActivo', 'true');
        localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
        const navigationExtras: NavigationExtras = {
          state: { usuario: usuarioEncontrado.correo }
        };
        console.log('🔁 Redirigiendo a perfil-usuario...');
        this.router.navigate(['/perfil-usuario'], navigationExtras);
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Correo o contraseña incorrectos.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo validar el usuario.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  async recuperarPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu correo electrónico',
          cssClass: 'white-placeholder'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'black-text'
        },
        {
          text: 'Enviar',
          handler: (data) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
              this.alertController.create({
                header: 'Error',
                message: 'Por favor ingresa un correo válido.',
                buttons: ['Aceptar']
              }).then(alert => alert.present());
              return false;
            }

            this.alertController.create({
              header: 'Éxito',
              message: 'Se ha enviado un enlace de recuperación a tu correo.',
              buttons: ['Aceptar']
            }).then(alert => alert.present());

            return true;
          },
          cssClass: 'black-text'
        }
      ]
    });

    await alert.present();
  }

  registrarse() {
    this.router.navigate(['/registro']);
  }

}
