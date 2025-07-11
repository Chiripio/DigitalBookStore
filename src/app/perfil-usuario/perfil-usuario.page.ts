import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]  // ¡ESTO ES CLAVE!
})
export class PerfilUsuarioPage {
  usuario: any;
  fotoPerfil: string = 'assets/avatar-default.png';
  nuevaContrasena = '';
  confirmarContrasena = '';
  usuarioLogueado = false;

  constructor(
    private alertCtrl: AlertController,
    private storageService: StorageService,
    private sqliteService: SqliteService
  ) {}

  ngOnInit() {
    const activo = localStorage.getItem('usuarioActivo');
    this.usuarioLogueado = activo === 'true';

    const datos = localStorage.getItem('usuario');
    if (datos) {
      this.usuario = JSON.parse(datos);
      this.fotoPerfil = this.usuario.fotoPerfil || 'assets/avatar-default.png';
    } else {
      console.warn('No se encontraron datos de usuario en localStorage.');
    }
  }


  async actualizarContrasena() {
    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      const alerta = await this.alertCtrl.create({
        header: 'Error',
        message: 'Debe completar ambos campos de contraseña',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          cssClass: 'alert-ok-button'
        }],
        cssClass: 'alerta-personalizada'
      });
      await alerta.present();
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      const alerta = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          cssClass: 'alert-ok-button'
        }],
        cssClass: 'alerta-personalizada'
      });
      await alerta.present();
      return;
    }

    this.usuario.contrasena = this.nuevaContrasena;
    await this.storageService.set('usuarioRegistrado', this.usuario);

    const alerta = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Contraseña actualizada correctamente',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'alert-ok-button'
      }],
      cssClass: 'alerta-personalizada'
    });
    await alerta.present();

    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
  }

  async guardarPerfil() {
    await this.storageService.set('usuarioRegistrado', this.usuario);
    this.fotoPerfil = this.usuario.fotoPerfil || 'assets/avatar-default.png';
  }

  async cambiarFoto() {
    const alerta = await this.alertCtrl.create({
      header: 'Cambiar Foto',
      message: '¿Desde dónde quieres obtener la imagen?',
      cssClass: 'alerta-negra',
      buttons: [
        {
          text: 'Cámara',
          handler: async () => {
            const permission = await Camera.requestPermissions();
            if (permission.camera !== 'granted' && permission.photos !== 'granted') {
              const alertaPermiso = await this.alertCtrl.create({
                header: 'Permiso requerido',
                message: 'Debes otorgar permisos de cámara y galería para cambiar la foto.',
                buttons: ['OK'],
                cssClass: 'alerta-personalizada'
              });
              await alertaPermiso.present();
              return;
            }

            const image = await Camera.getPhoto({
              quality: 80,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Camera
            });
            this.fotoPerfil = image.dataUrl!;
            await this.guardarFotoEnPerfil();
          }
        },
        {
          text: 'Galería',
          handler: async () => {
            const permission = await Camera.requestPermissions();
            if (permission.camera !== 'granted' && permission.photos !== 'granted') {
              const alertaPermiso = await this.alertCtrl.create({
                header: 'Permiso requerido',
                message: 'Debes otorgar permisos de cámara y galería para cambiar la foto.',
                buttons: ['OK'],
                cssClass: 'alerta-personalizada'
              });
              await alertaPermiso.present();
              return;
            }

            const image = await Camera.getPhoto({
              quality: 80,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Photos
            });
            this.fotoPerfil = image.dataUrl!;
            await this.guardarFotoEnPerfil();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alerta.present();
  }

  private async guardarFotoEnPerfil() {
    if (this.usuario) {
      this.usuario.fotoPerfil = this.fotoPerfil;
      await this.storageService.set('usuarioRegistrado', this.usuario);
    }
  }

  cerrarSesion() {
    localStorage.setItem('usuarioActivo', 'false');
    this.usuarioLogueado = false;
    location.href = '/login';
  }
}