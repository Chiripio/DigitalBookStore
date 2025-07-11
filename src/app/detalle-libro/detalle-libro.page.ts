import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.page.html',
  styleUrls: ['./detalle-libro.page.scss'],
  standalone: false,
})
export class DetalleLibroPage implements OnInit {
  libro: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const nav = history.state;
    if (nav && Object.keys(nav).length > 0) {
      this.libro = {
        titulo: nav.titulo || 'Título no disponible',
        autor: nav.autor || 'Autor no disponible',
        descripcion: nav.descripcion || 'Sin descripción',
        precio: nav.precio || 0,
        imagen: nav.imagen?.replace(/^assets\/img\//, '') || 'libro1.jpg', // Imagen por defecto
        ...nav
      };
      console.log('Libro recibido:', this.libro);
    } else {
      console.warn('No se recibió información del libro');
    }
  }
}
