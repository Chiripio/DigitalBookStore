import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false,
})
export class CarritoPage {

  public librosCarrito: any[] = [];
  public total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.librosCarrito = this.carritoService.obtenerCarrito().map(libro => ({ ...libro, eliminar: true }));
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.librosCarrito
      .filter(libro => libro.eliminar)
      .reduce((sum, libro) => sum + libro.precio, 0);
  }

  toggleEliminar(libro: any): void {
    if (libro) {
      libro.eliminar = !libro.eliminar;
      this.calcularTotal();
    }
  }

  async confirmarCompra(): Promise<void> {
    const seleccionados = this.librosCarrito.filter(libro => libro.eliminar);

    if (seleccionados.length === 0) {
      const alerta = await this.alertController.create({
        header: 'Carrito vacío',
        message: 'Debes seleccionar al menos un libro para continuar.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }

    const alerta = await this.alertController.create({
      header: 'Compra realizada',
      message: `Has comprado ${seleccionados.length} libro(s) por un total de $${this.total}.`,
      buttons: ['Aceptar']
    });
    await alerta.present();

    this.vaciarCarrito();
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.librosCarrito = [];
    this.total = 0;
  }
}
