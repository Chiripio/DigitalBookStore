import { Observable } from 'rxjs';
import { CarritoService } from '../services/carrito.service';
import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service'; // Asegúrate de que este servicio exista

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage implements OnInit {

  libros: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private librosService: LibrosService,
    private storageService: StorageService,
    private router: Router
  ) {
    console.log('[CatalogoPage] Constructor ejecutado');
  }

  ngOnInit() {
    console.log('[CatalogoPage] ngOnInit ejecutado');
    const libros = this.librosService.obtenerLibros();
    this.procesarLibros(libros);
  }

  private procesarLibros(data: any[]) {
    this.libros = data.map(libro => ({
      ...libro,
      imagen: `assets/img/${libro.imagen}`
    }));
    this.storageService.set('libros', this.libros); // Guarda para uso offline
  }

  agregarAlCarrito(libro: any) {
    this.carritoService.agregarLibro(libro);
    console.log('Libro agregado al carrito:', libro);
    console.log('Estado actual del carrito:', this.carritoService.obtenerCarrito());
  }

  verLibro(libro: any) {
    this.router.navigate(['/detalle-libro'], { state: { ...libro } });
  }

}