import { ApplicationRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiserviceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PushService } from '../../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};
  mensajes: OSNotificationPayload[] = [];

  constructor(
    private usuarioService : UsuarioService,
    private uiServices: UiserviceService,
    private navCtrl : NavController,
    private productosService: ProductosService,
    private storage: Storage,
    private pushService : PushService,
    private aplicationRef : ApplicationRef
  ) {}
  
  ngOnInit() {
    
    this.pushService.pushListener.subscribe( noti => {
      this.mensajes.unshift( noti );
      this.aplicationRef.tick();
    });

    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario)
  }

  async ionViewDidEnter(){
    console.log('Will Enter - Se cargan los mensajes');
  this.mensajes = await this.pushService.getMensajes();
  }

  async actualizar( fActualizar: NgForm ){

    if( fActualizar.invalid ){return;}

    const actualizar = await this.usuarioService.actualizarUsuario(this.usuario);

    if( actualizar ){
      //toast con el mensaje actualizado
      this.uiServices.presentToast('Usuario actualizado');
      this.logout();
    }else{
      //toast con mensaje de error
      this.uiServices.presentToast('No se pudo actualizar');

    }

  }

  logout(){

    this.productosService.paginaPosts = 0;
    this.usuarioService.logout();
    this.storage.clear();
    
  }

}
