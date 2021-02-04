import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UiserviceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidesPrincipal') slides : IonSlides;


loginUser = {
  email:'cliente5@cliente.cl',
  password:'cliente'
}



  constructor(
    private usuarioService: UsuarioService,
    private navCtrl : NavController,
    private uiServices : UiserviceService
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){

   // if(fLogin.invalid){ return }

  const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password);

  if(true){

    this.usuarioService.validarPerfil(this.loginUser.email).then(respuesta =>{
      if (respuesta){
        
        this.navCtrl.navigateRoot( 'main/tabs/categorias', { animated: true } )
      }else{
        this.uiServices.alertaInformativa('Usuario no tiene perfil de cliente.');
      }
    }); 

  }else{

    //mostrar alerta de Usuario y contraseña 

    this.uiServices.alertaInformativa('Usuario y Contraseña no son correctos.');

  }
  
  }


}
