import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.page.html',
  styleUrls: ['./tiendas.page.scss'],
  standalone: false
})
export class TiendasPage implements AfterViewInit {
  private map: L.Map | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 300);
  }

  private async initMap(): Promise<void> {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lng = coordinates.coords.longitude;

    this.map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Marcador de ubicación actual con un ícono personalizado
    const userIcon = L.icon({
      iconUrl: 'assets/icon/marker-user.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    L.marker([lat, lng], { icon: userIcon }).addTo(this.map)
      .bindPopup('Estás aquí');

    // Marcadores simulando tiendas cercanas
    const tiendas = [
      { nombre: 'Librería Estrella', lat: lat + 0.004, lng: lng + 0.004 },
      { nombre: 'Tienda Sol Naciente', lat: lat - 0.003, lng: lng - 0.004 },
      { nombre: 'Libros del Bosque', lat: lat + 0.002, lng: lng - 0.003 }
    ];

    tiendas.forEach(tienda => {
      if (this.map) {
        L.marker([tienda.lat, tienda.lng])
          .addTo(this.map)
          .bindPopup(tienda.nombre);
      }
    });
  }
}
