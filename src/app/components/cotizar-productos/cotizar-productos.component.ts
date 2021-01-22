import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CotizarService } from 'src/app/services/cotizar.service';
import { UiserviceService } from '../../services/uiservice.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar-productos.component.html',
  styleUrls: ['./cotizar-productos.component.scss'],
})
export class CotizarProductosComponent implements OnInit {

  @Input() productos: Producto[] = []; 
  
  seleccionados: string[] = [];

  cotizacion : Cotizar = {

    nombre: '',
    email: '',
    telefono: 77,
    empresa: '',
    rut: 77,
    direccion: '',
    productos: []
  
  };
  
  constructor(
    private cotizarService: CotizarService,
    private navCtrl : NavController,
    private uiServices : UiserviceService,
    private emailComposer: EmailComposer
  ) {}

  ngOnInit() {

  }
  

}
