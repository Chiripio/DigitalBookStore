import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private libros = [
    {
      id: 1,
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      descripcion: 'Este pequeño libro es una de las obras más traducidas y leídas del mundo.',
      texto: 'Una historia poética sobre la inocencia, el amor, la amistad y el valor de las pequeñas cosas, narrada por un piloto que conoce a un niño venido de otro planeta.',
      imagen: 'principito.jpg',
      precio: 7500
    },
    {
      id: 2,
      titulo: '1984',
      autor: 'George Orwell',
      descripcion: 'Una novela distópica sobre un futuro totalitario.',
      texto: 'Una obra fundamental de la literatura distópica, donde el autor describe un mundo vigilado por el Gran Hermano, cuestionando la libertad, la verdad y la manipulación política.',
      imagen: '1984.jpg',
      precio: 8900
    },
    {
      id: 3,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      descripcion: 'Un viaje mágico por la historia de la familia Buendía.',
      texto: 'Un viaje mágico a través de la historia de la familia Buendía en el pueblo de Macondo, con elementos de realismo mágico, amor, guerra y soledad.',
      imagen: 'cien-anos.jpg',
      precio: 10500
    },
    {
      id: 4,
      titulo: 'Silabario Hispanoamericano',
      autor: 'Anónimo',
      descripcion: 'Un clásico de la enseñanza de la lectura.',
      texto: 'Tradicional libro escolar utilizado para enseñar a leer a varias generaciones, con ilustraciones y ejercicios simples pero efectivos para el aprendizaje.',
      imagen: 'silabario.jpg',
      precio: 6000,
      precioOferta: 3500
    },
    {
      id: 5,
      titulo: 'Don Quijote de la Mancha',
      autor: 'Miguel de Cervantes',
      descripcion: 'Las aventuras del ingenioso hidalgo Don Quijote.',
      texto: 'Considerada la primera novela moderna, narra las aventuras de un caballero idealista y su fiel escudero Sancho, explorando la delgada línea entre realidad y locura.',
      imagen: 'quijote.jpg',
      precio: 12000,
      precioOferta: 8900
    },
    {
      id: 6,
      titulo: 'Angular desde Cero',
      autor: 'Jane Dev',
      descripcion: 'Guía práctica para aprender Angular desde lo más básico.',
      texto: 'Una guía práctica para aprender Angular desde los fundamentos, con ejemplos paso a paso, buenas prácticas y casos reales para comenzar tus propios proyectos.',
      imagen: 'angular.png',
      precio: 18000,
      precioOferta: 12000
    },
    {
      id: 7,
      titulo: 'Domina Ionic',
      autor: 'John App',
      descripcion: 'Aprende a crear aplicaciones móviles con Ionic y Angular.',
      texto: 'Un libro ideal para desarrolladores móviles que quieren dominar el framework Ionic y construir apps híbridas eficientes con Angular y Capacitor.',
      imagen: 'ionic.png',
      precio: 22000,
      precioOferta: 15000
    },
    {
      id: 8,
      titulo: 'Silabario Ilustrado',
      autor: 'Manuel Rodríguez',
      descripcion: 'Libro educativo para aprender a leer con imágenes y sílabas.',
      texto: 'Este libro ofrece una forma visual y entretenida de aprender a leer, con sílabas y dibujos llamativos para niños en etapa escolar inicial.',
      imagen: 'silabario.png',
      precio: 9000,
      precioOferta: 5000
    }
  ];

  constructor() {}

  obtenerLibros(): any[] {
    return this.libros;
  }

  obtenerOfertas(): any[] {
    return this.libros.filter(libro => libro.precioOferta !== undefined);
  }
}