import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { NgForm } from '@angular/forms';
import { CotizarService } from '../../services/cotizar.service';
import { UiserviceService } from '../../services/uiservice.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  carrito : string[] = [];
  habilitado : boolean = true;
  cantidad: Number = 1;

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
    private productosService : ProductosService,
    private cotizarService : CotizarService,
    private uiServices : UiserviceService,
    private emailComposer: EmailComposer,
    private modalCtrl : ModalController,
    private alertCtrl : AlertController,
    private storage : Storage,
    private navCtrl : NavController
      ) {}

  ngOnInit() {
   
  }

  bajarCantidad(product){
    this.cotizarService.bajarCantidadProducto(product);
  }

  aumentarItemCarrito(product){
    this.cotizarService.agregarProducto(product);
  }

  removerCarritoItem(product){
    this.cotizarService.eliminarProducto(product);
  }

  close(){
    this.modalCtrl.dismiss();
  }

  
  async cotizar(fCotizar: NgForm){

    if(fCotizar.invalid) { return; }
    
    const valido = await this.cotizarService.cotizar( this.cotizacion );
   
    if(valido){
  

      let emailCotizacion = 
      'Solicitud de cotizacion: <br/>' + 
      'Nombre y Apellido: <br/>' + this.cotizacion.nombre +
      'Correo: <br/>' + this.cotizacion.email +
      'Telefono: <br/>'+ this.cotizacion.telefono +
      'Nombre de Empresa: <br/>'+ this.cotizacion.empresa +
      'RUT: <br/>' + this.cotizacion.rut +
      'Dirección: <br/>' + this.cotizacion +
      'Productos: <br/>'+ this.cotizacion.productos;

      //enviar email administrador
      let email = {
        to: 'avilacreativa.cl@gmail.com',
        cc: this.cotizacion.email,
        bcc: ['', ''],
        attachments: [
          'file://img/logo.png',
          'res://icon.png',
          'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
          'file://README.pdf'
        ],
        subject: 'Solicitud de Cotización Accon ',
        body: emailCotizacion,
        isHtml: true
      }
      
      // Send a text message using default options
      this.emailComposer.open(email);

      //navegar al tabs
      this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } );
      
      this.uiServices.alertaInformativa('Cotización ha sido enviada.');

      
    }else{
  
      //mostrar alerta de Usuario y contraseña 
  
      this.uiServices.alertaInformativa('Cotización no ha podido ser enviada.');
  
    }
  }

}
