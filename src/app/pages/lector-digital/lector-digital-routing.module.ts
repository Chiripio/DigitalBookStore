import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LectorDigitalPage } from './lector-digital.page';

const routes: Routes = [
  {
    path: '',
    component: LectorDigitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LectorDigitalPageRoutingModule {}
