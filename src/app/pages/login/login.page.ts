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
  email:'admin2@avila.cl',
  password:'admin'
}

registerUser: Usuario = {

  email:'test',
  password:'12345',
  nombre:'test',
  rol: 'ROL_CLIENT'

};



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

    if(fLogin.invalid){ return }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password);

  if(valido){

    //navegar al tabs

    this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } )

  }else{

    //mostrar alerta de Usuario y contraseña 

    this.uiServices.alertaInformativa('Usuario y Contraseña no son correctos.');

  }
  
  }


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

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
