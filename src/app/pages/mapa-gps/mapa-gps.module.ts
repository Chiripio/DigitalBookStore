import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaGpsPageRoutingModule } from './mapa-gps-routing.module';

import { MapaGpsPage } from './mapa-gps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaGpsPageRoutingModule
  ],
  declarations: [MapaGpsPage]
})
export class MapaGpsPageModule {}
