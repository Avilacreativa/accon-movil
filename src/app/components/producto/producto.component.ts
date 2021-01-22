import { Component, Input, OnInit } from '@angular/core';
import { UiserviceService } from '../../services/uiservice.service';
import { CotizarService } from '../../services/cotizar.service';
import { Storage } from '@ionic/storage';

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
    private uiServices : UiserviceService,
    private cotizarService : CotizarService,
    private storage : Storage
  ) { }

  ngOnInit() {}
  
  agregar( product ){
  console.log(product);
    this.uiServices.presentToast('Se ha añadido stisfactoriamente');
    this.cotizarService.agregarProducto(product);
  }

}
