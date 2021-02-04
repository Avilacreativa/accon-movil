import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoCategoriaPageRoutingModule } from './producto-categoria-routing.module';

import { ProductoCategoriaPage } from './producto-categoria.page';
import { PipesModule } from '../../pipes/pipes.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    ExploreContainerComponentModule,
    ProductoCategoriaPageRoutingModule
  ],
  declarations: [ProductoCategoriaPage]
})
export class ProductoCategoriaPageModule {}
