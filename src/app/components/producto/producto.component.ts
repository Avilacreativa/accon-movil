import { Component, Input, OnInit, Output } from '@angular/core';
import { UiserviceService } from '../../services/uiservice.service';
import { CotizarService } from '../../services/cotizar.service';
import { Storage } from '@ionic/storage';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

@Input() producto: Producto = {};


slideSoloOpts = {

  allowSlideNext: false,
  allowSlidePrev: false

};

  constructor(
    private cotizarService : CotizarService,
  ) { }

  ngOnInit() {}
  
  agregar( product ){
    this.cotizarService.agregarProducto(product);
  }

}
