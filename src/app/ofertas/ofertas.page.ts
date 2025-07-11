import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrosService } from '../services/libros.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
  standalone: false,
})
export class OfertasPage implements OnInit {
  public usuario: string | null = null;
  public mostrarMenu: boolean = false;
  public librosEnOferta: any[] = [];

  constructor(
    private router: Router,
    private librosService: LibrosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    this.usuario = usuarioGuardado || 'invitado';
    this.mostrarMenu = usuarioGuardado !== null;
    this.librosEnOferta = this.librosService.obtenerOfertas();
    console.log('librosEnOferta:', this.librosEnOferta);

    console.log('USUARIO:', this.usuario);
    console.log('MOSTRAR MENU:', this.mostrarMenu);
  }

  agregarAlCarrito(libro: any) {
    this.carritoService.agregarLibro(libro);
    console.log('Libro agregado al carrito:', libro);
  }

  verLibro(libro: any) {
    this.router.navigate(['/detalle-libro'], { state: { ...libro } });
  }
}