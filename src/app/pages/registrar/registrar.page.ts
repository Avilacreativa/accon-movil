import { UsuarioService } from './../../services/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { UiserviceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {

  @ViewChild('slidesPrincipal') slides : IonSlides;
  
  registerUser: Usuario = {

    email:'',
    password:'',
    nombre:'',
    empresa:'',
    rol:''
  
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
  
      this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } );

      this.uiServices.alertaInformativa('Usuario nuevo registrado');
  
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
