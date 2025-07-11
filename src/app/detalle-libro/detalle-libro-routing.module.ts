import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleLibroPage } from './detalle-libro.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleLibroPageRoutingModule {}
