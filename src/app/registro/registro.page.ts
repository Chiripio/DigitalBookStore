import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { SqliteService } from '../services/sqlite.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  fechaNacimiento: string = '';
  mostrarCalendario: boolean = false;
  fechaNacimientoTexto: string = '';
  nivelEstudios: string = '';

  constructor(
    private storageService: StorageService,
    private sqliteService: SqliteService,
    private router: Router,
    private alertController: AlertController
  ) { }

  abrirCalendario() {
    const input = document.getElementById('fechaNacimiento') as HTMLInputElement;
    if (input && 'showPicker' in input) {
      input.showPicker();
    }
  }

  actualizarFecha(event: any) {
    this.fechaNacimiento = event.detail.value;
  }

  validarFechaManual(event: any) {
    this.fechaNacimientoTexto = event.target.value;
    this.fechaNacimiento = this.fechaNacimientoTexto;
  }

  toggleCalendario() {
    this.mostrarCalendario = !this.mostrarCalendario;
  }

  ngOnInit() {
  }

  private transformarFechaAISO(fecha: string): string {
    let fechaISO: Date;

    if (fecha.includes('/')) {
      const [dia, mes, anio] = fecha.split('/');
      fechaISO = new Date(`${anio}-${mes}-${dia}T00:00:00`);
    } else if (fecha.includes('-')) {
      fechaISO = new Date(fecha); // ya viene en formato ISO o YYYY-MM-DD
    } else {
      return '';
    }
    return isNaN(fechaISO.getTime()) ? '' : fechaISO.toISOString();
  }

  async registrarUsuario() {
    if (!this.nombre || !this.apellido || !this.correo || !this.contrasena || !this.confirmarContrasena || !this.nivelEstudios || !this.fechaNacimiento) {
      alert('Por favor, completa todos los campos');
      return;
    }
    if (this.contrasena.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (this.contrasena !== this.confirmarContrasena) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      confirmar_contrasena: this.confirmarContrasena,
      nivel_estudio: this.nivelEstudios,
      fecha_nacimiento: this.transformarFechaAISO(this.fechaNacimiento)
    };

    try {
      console.log('🔁 Intentando registrar usuario...', usuario);

      // Asegurar inicialización de la base de datos y creación de tabla
      await this.sqliteService.initDB();
      await this.sqliteService.createUsuariosTable();

      console.log('✅ Llamando a insertUsuario con:', usuario);
      await this.sqliteService.insertUsuario(usuario);
      // Guardar en localStorage sólo después de insertar en SQLite
      localStorage.setItem('usuarioActivo', 'true');
      localStorage.setItem('usuario', JSON.stringify(usuario));
      console.log('✅ Usuario guardado en localStorage:', usuario);
      await this.storageService.set('usuarioRegistrado', usuario);
      await this.storageService.set('usuarioActivo', true);
      console.log('Usuario registrado en SQLite:', usuario);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Usuario registrado correctamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/perfil-usuario']);
          }
        }]
      });
      await alert.present();
    } catch (error) {
      console.error('Error al registrar usuario en SQLite:', error);
      alert('Ocurrió un error al registrar el usuario');
    }
  }
}
