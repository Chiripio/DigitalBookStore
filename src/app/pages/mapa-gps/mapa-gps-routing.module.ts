import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaGpsPage } from './mapa-gps.page';

const routes: Routes = [
  {
    path: '',
    component: MapaGpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaGpsPageRoutingModule {}
