import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterViewInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { NgForm } from '@angular/forms';
import { CotizarService } from '../../services/cotizar.service';
import { UiserviceService } from '../../services/uiservice.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs.page';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit{

  carrito = [];
  habilitado : boolean = true;
  cantidad: number = 1;
  prueba=0;
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
    private navCtrl : NavController,
    private tabs : TabsPage
      ) {}

  ngOnInit() {
  }


  ionViewWillEnter(){
    console.log("ionViewWillEnter")
    this.storage.get('productList').then(resp => {
      this.carrito = resp; 
    }).catch(error => {
      this.storage.set('productList', [])
    })
}
ionViewDidEnter(){
    console.log("ionViewDidEnter")
}

addItem(p, indice){
  this.carrito[indice].cantidad = this.carrito[indice].cantidad + 1; 
  this.storage.set('productList', this.carrito).then(resp => {
    console.log("lista de productos ", resp)
    this.carrito = resp; 
  }).catch(error => {
    console.log("ocurrio un error ", error);
  }) 
}

removeItem(p, indice){
  this.carrito[indice].cantidad = this.carrito[indice].cantidad - 1; 
  this.storage.set('productList', this.carrito).then(resp => {
    console.log("lista de productos ", resp)
    this.carrito = resp; 
    
  }).catch(error => {
    console.log("ocurrio un error ", error);
  })
}

  removerCarritoItem(product, indice){
    console.log("esta es la posisicion ", indice);
    this.carrito.splice(indice,1);
    this.storage.set('productList', this.carrito).then(resp => {
      this.uiServices.presentToast('Eliminado Producto del Carrito!');
    }).catch(error => {
      this.uiServices.presentToast('Error! No se pudo eliminar del carrito' + error);
    })
   // this.cotizarService.eliminarProducto(product);
  }

  close(){
    this.modalCtrl.dismiss();
  }

  
  async cotizar(fCotizar: NgForm){

    if(fCotizar.invalid) { return; }
    this.cotizacion.productos = await this.storage.get('productList');

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
