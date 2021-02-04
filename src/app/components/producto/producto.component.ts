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

// Usamos el decorador Output
@Output() enviarIndice = new EventEmitter();

slideSoloOpts = {

  allowSlideNext: false,
  allowSlidePrev: false

};

  constructor(
    private uiServices : UiserviceService,
    private cotizarService : CotizarService,
    private storage : Storage
  ) { }

  ngOnInit() {}
  
  agregar( product ){

    this.uiServices.presentToast('Se ha añadido stisfactoriamente');
    this.enviarIndice.emit(product);
    this.cotizarService.agregarProducto(product);
    
  }

}
