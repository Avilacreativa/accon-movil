import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoCategoriaPage } from './producto-categoria.page';
import { ProductosComponent } from '../../components/productos/productos.component';

const routes: Routes = [
  {
    path: ':categoria', 
    component: ProductoCategoriaPage
  },
  {
    path: '',
    component: ProductoCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoCategoriaPageRoutingModule {}
