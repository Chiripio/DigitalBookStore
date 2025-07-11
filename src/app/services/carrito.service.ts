import { Injectable } from '@angular/core';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  imagen: string;
  precio: number;
  precioOferta?: number; // <-- agregado
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Libro[] = [];

  agregarLibro(libro: any): void {
    const precioFinal = libro.precioOferta ?? libro.precio;
    const libroConPrecioFinal = { ...libro, precio: precioFinal };
    this.carrito.push(libroConPrecioFinal);
  }

  obtenerCarrito(): Libro[] {
    return this.carrito;
  }

  obtenerLibros(): Libro[] {
    return this.carrito;
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, libro) => total + libro.precio, 0);
  }

  guardarCompra(): void {
    const compra = {
      libros: this.carrito,
      total: this.obtenerTotal(),
      fecha: new Date().toISOString()
    };
    localStorage.setItem('ultimaCompra', JSON.stringify(compra));
    this.vaciarCarrito();
  }
}
