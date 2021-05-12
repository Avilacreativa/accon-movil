import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CotizarService } from '../../services/cotizar.service';
import { UiserviceService } from '../../services/uiservice.service';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit{

  usuario: Usuario = {};
  carrito = [];
  habilitado : boolean = true;
  cantidad: number = 1;
  prueba=0;
  cotizacion : Cotizar = {

    nombre: '',
    email: '',
    telefono: 9,
    empresa: '',
    observaciones: '',
    tipo: '',
    direccion: '',
    estado:'',
    productos: []
 
  };
  

  constructor( 
    private cotizarService : CotizarService,
    private uiServices : UiserviceService,
    private modalCtrl : ModalController,
    private storage : Storage,
    private route: Router,
    private navCtrl : NavController,
    private usuarioService: UsuarioService
      ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.storage.set('productList', [])
  }


  ionViewWillEnter(){
    // console.log("ionViewWillEnter")
    this.storage.get('productList').then(resp => {
      this.carrito = resp; 
    }).catch(error => {
      this.storage.set('productList', [])
    })
}
ionViewDidEnter(){
    // console.log("ionViewDidEnter")
}

addItem(p, indice){
  this.carrito[indice].cantidad = this.carrito[indice].cantidad + 1; 
  this.storage.set('productList', this.carrito).then(resp => {
    this.carrito = resp; 
  }).catch(error => {
    console.log("ocurrio un error ", error);
  }) 
}

removeItem(p, indice){
  if (this.carrito[indice].cantidad > 0) {
    this.carrito[indice].cantidad = this.carrito[indice].cantidad - 1; 

    this.storage.set('productList', this.carrito).then(resp => {
      this.carrito = resp; 
    }).catch(error => {
      console.log("ocurrio un error ", error);
    })
  }
}

  removerCarritoItem(product, indice){
    // console.log("esta es la posisicion ", indice);
    this.carrito.splice(indice,1);
    this.storage.set('productList', this.carrito).then(resp => {
      this.uiServices.presentToast('Eliminado Producto del Carrito!');
      this.route.navigateByUrl('/main/tabs/tab4');
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
    this.cotizacion.nombre =  this.usuario.nombre;
    this.cotizacion.email =  this.usuario.email;
    this.cotizacion.empresa =  this.usuario.empresa;
    this.cotizacion.estado = "nuevo";

    this.cotizacion.productos = await this.storage.get('productList');
    if(this.cotizacion.productos == null){

      this.uiServices.presentToast('Debe agregar al menos un producto')

    }else{
    const valido = await this.cotizarService.cotizar( this.cotizacion );
  

      if(valido){

      this.uiServices.alertaInformativa('Solicitud ha sido enviada.');
      this.storage.set('productList', []).then(resp => {
      }).catch(error => {
        this.uiServices.presentToast('Error! No se pudo eliminar del carrito' + error);
      })
      //navegar al tabs y enviar correo
      this.cotizarService.enviarCorreo(this.cotizacion).subscribe(resp => {
        this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } );
      },
      () =>{
        this.uiServices.alertaInformativa('Error al enviar el correo de notificacion.');
      }); 
    
      
 
     
      
      }else{
  
      //mostrar alerta de Usuario y contraseña 
  
      this.uiServices.alertaInformativa('Solicitud no ha podido ser enviada.');
  
      }
    }
  }

}
