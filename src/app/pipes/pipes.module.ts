import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { FiltroPipe } from './filtro.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe, 
    ImageSanitizerPipe, 
    ImagenPipe, FiltroPipe],
  exports:[ 
    DomSanitizerPipe, 
    ImageSanitizerPipe,
    ImagenPipe,
    FiltroPipe
   ]
})
export class PipesModule { }
