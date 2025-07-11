import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorDigitalPageRoutingModule } from './lector-digital-routing.module';

import { LectorDigitalPage } from './lector-digital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectorDigitalPageRoutingModule
  ],
  declarations: [LectorDigitalPage]
})
export class LectorDigitalPageModule {}
