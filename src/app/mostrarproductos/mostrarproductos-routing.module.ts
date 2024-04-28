import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarproductosPage } from './mostrarproductos.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarproductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarproductosPageRoutingModule {}
