import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarproductosPageRoutingModule } from './mostrarproductos-routing.module';

import { MostrarproductosPage } from './mostrarproductos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarproductosPageRoutingModule
  ],
  declarations: [MostrarproductosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MostrarproductosPageModule {}
