import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { OfertasPageRoutingModule } from './ofertas-routing.module';
import { OfertasPage } from './ofertas.page';

@NgModule({
  declarations: [
    OfertasPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertasPageRoutingModule,
    RouterModule
  ]
})
export class OfertasPageModule {}  // <== ESTE NOMBRE DEBE COINCIDIR CON app-routing.module.ts