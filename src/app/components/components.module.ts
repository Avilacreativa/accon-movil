import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CotizarProductosComponent } from './cotizar-productos/cotizar-productos.component';


@NgModule({
  declarations: [
    ProductosComponent,
    ProductoComponent,
    CotizarProductosComponent
  ],
  exports:[
    ProductosComponent,
    ProductoComponent,
    CotizarProductosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
