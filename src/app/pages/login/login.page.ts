import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { UiserviceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidesPrincipal') slides : IonSlides;

  loading : HTMLIonLoadingElement;


loginUser = {
  email:'',
  password:''
}



  constructor(
    private usuarioService: UsuarioService,
    private navCtrl : NavController,
    private uiServices : UiserviceService,
    private loadingController: LoadingController
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
    this.presentLoading();
    this.usuarioService.validarPerfil(this.loginUser.email).then(respuesta =>{
      if (respuesta){
        
        this.navCtrl.navigateRoot( 'main/tabs/categorias', { animated: true } );

        setTimeout( ()=>{
          this.loading.dismiss();
        },2000);

      }else{
        this.uiServices.alertaInformativa('Usuario no tiene perfil de cliente.');
        setTimeout( ()=>{
          this.loading.dismiss();
        },1000);
      }
    }); 

    setTimeout( ()=>{
      this.loading.dismiss();
    },1000);

  }else{

    //mostrar alerta de Usuario y contraseña 

    this.uiServices.alertaInformativa('Usuario y Contraseña no son correctos.');
    setTimeout( ()=>{
      this.loading.dismiss();
    },1000);

  }
  
  }
  async presentLoading() {

    this.loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await this.loading.present();
  }


}
