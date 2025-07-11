import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  usuarioLogueado = false;

  ngOnInit() {
    const activo = localStorage.getItem('usuarioActivo');
    this.usuarioLogueado = activo === 'true';
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    localStorage.removeItem('usuario');
    this.usuarioLogueado = false;
    location.href = '/login';
  }

}
