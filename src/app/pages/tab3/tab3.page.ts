import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiserviceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(
    private usuarioService : UsuarioService,
    private uiServices: UiserviceService,
    private navCtrl : NavController,
    private productosService: ProductosService,
    private storage: Storage
  ) {}
  
  ngOnInit() {
    
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario)
  }

  async actualizar( fActualizar: NgForm ){

    if( fActualizar.invalid ){return;}

    const actualizar = await this.usuarioService.actualizarUsuario(this.usuario);

    if( actualizar ){
      //toast con el mensaje actualizado
      this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } );
      this.uiServices.presentToast('Usuario actualizado');
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
