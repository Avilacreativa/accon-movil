import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { UiserviceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from '../../services/usuario.service';
import { Storage } from '@ionic/storage';
import { CookieService } from 'ngx-cookie-service';

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
rememberMe: boolean ;
email: string;
password: string;


  constructor(
    private usuarioService: UsuarioService,
    private navCtrl : NavController,
    private uiServices : UiserviceService,
    private loadingController: LoadingController,
    private cookieService: CookieService,
    private storage: Storage 
  ) {
   }

  ngOnInit() {
    if(this.cookieService.get('remember') === 'Yes'){
      this.loginUser.email = this.cookieService.get('email');
      this.loginUser.password = this.cookieService.get('password');
      this.rememberMe = true;
    }else{
      this.loginUser.email = '';
      this.loginUser.password = '';
    }

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
      if(this.rememberMe == true){
        console.log('check remember', true);
        this.cookieService.set('email', this.loginUser.email);  
        this.cookieService.set('password', this.loginUser.password);
        this.cookieService.set('remember', 'Yes');

      }else{
        this.cookieService.set('remember', 'No');
        this.cookieService.set('email', '');  
        this.cookieService.set('password', '');
      }
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
