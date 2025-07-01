import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  usuario: string = '';

  nombre: string = '';
  apellido: string = '';
  nivel: string = '';
  fechaNacimiento: string = '';

  @ViewChild('nombreInput') nombreInput!: ElementRef;
  @ViewChild('apellidoInput') apellidoInput!: ElementRef;
  @ViewChild('homeTitle') homeTitle!: ElementRef;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['usuario']) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.nivel = '';
    this.fechaNacimiento = '';

    const animate = (el: ElementRef) => {
      el.nativeElement.classList.add('animate-slide');
      setTimeout(() => {
        el.nativeElement.classList.remove('animate-slide');
      }, 1000);
    };

    animate(this.nombreInput);
    animate(this.apellidoInput);
  }

  mostrarDatos() {
    alert(`Nombre: ${this.nombre}\nApellido: ${this.apellido}`);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.homeTitle.nativeElement.classList.remove('home-title');
      void this.homeTitle.nativeElement.offsetWidth;
      this.homeTitle.nativeElement.classList.add('home-title');
    }, 50);
  }
}
