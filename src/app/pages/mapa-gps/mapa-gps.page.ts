import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-mapa-gps',
  templateUrl: './mapa-gps.page.html',
  styleUrls: ['./mapa-gps.page.scss'],
  standalone: false
})
export class MapaGpsPage implements OnInit {
  map: maplibregl.Map | undefined;

  constructor() {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.inicializarMapa();
    }, 300);
  }

  inicializarMapa() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    console.log('Vista pública: Mapa GPS. Usuario activo:', usuarioActivo);

    this.map = new maplibregl.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm'
          }
        ]
      },
      center: [-71.6127, -33.0472], // Valparaíso
      zoom: 13
    });

    new maplibregl.Marker()
      .setLngLat([-71.6127, -33.0472])
      .addTo(this.map);
  }
}
