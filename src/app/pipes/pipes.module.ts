import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { FiltroPipe } from './filtro.pipe';
import { OrdenarPipe } from './ordenar.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe, 
    ImageSanitizerPipe, 
    ImagenPipe, FiltroPipe, OrdenarPipe],
  exports:[ 
    DomSanitizerPipe, 
    ImageSanitizerPipe,
    ImagenPipe,
    FiltroPipe,
    OrdenarPipe
   ]
})
export class PipesModule { }
