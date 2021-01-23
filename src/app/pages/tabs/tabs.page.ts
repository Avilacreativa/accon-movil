import { UsuarioService } from './../../services/usuario.service';
import { Component, Input, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { UiserviceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('slidesPrincipal') slides : IonSlides;
  @Input() usuario: Usuario = {};
  
  registerUser: Usuario = {

    email:'test',
    password:'12345',
    nombre:'test',
  
  };
  constructor(
    private usuarioService: UsuarioService,
    private navCtrl : NavController,
    private uiServices : UiserviceService
  ) {}
  async registro(fRegistro){

    if(fRegistro.invalid) { return; }
    
    const valido = await this.usuarioService.registro( this.registerUser );
   
    if(valido){

      //navegar al tabs
  
      this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } )
  
    }else{
  
      //mostrar alerta de Usuario y contraseña 
  
      this.uiServices.alertaInformativa('Correo electronico ya existe.');
  
    }
  }
  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
