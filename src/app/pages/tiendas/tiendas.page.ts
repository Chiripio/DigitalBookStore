declare module 'maplibre-gl';
import { Component, AfterViewInit } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.page.html',
  styleUrls: ['./tiendas.page.scss'],
  standalone: false
})
export class TiendasPage implements AfterViewInit {
  private map: maplibregl.Map | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 300);
  }

  private async initMap(): Promise<void> {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-70.6506, -33.4372], // Santiago de Chile como punto de referencia
      zoom: 13
    });
  }
}
