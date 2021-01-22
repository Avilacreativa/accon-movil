import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiserviceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';

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
    private productosService: ProductosService
  ) {}
  
  ngOnInit() {
    
    this.usuario = this.usuarioService.getUsuario();

    console.log(this.usuario);
  }

  async actualizar( fActualizar: NgForm ){

    if( fActualizar.invalid ){return;}

    const actualizar = await this.usuarioService.actualizarUsuario(this.usuario);

    if( actualizar ){
      //toast con el mensaje actualizado
      this.uiServices.presentToast('Usuario actualizado');
    }else{
      //toast con mensaje de error
      this.uiServices.presentToast('No se pudo actualizar');

    }

  }

  logout(){

    this.productosService.paginaPosts = 0;
    this.usuarioService.logout();
    
  }

}
