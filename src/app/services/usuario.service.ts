import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { environment } from '../../environments/environment';
import { async } from '@angular/core/testing';
import { UiserviceService } from './uiservice.service';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};
  
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private uiServices: UiserviceService
  ) { }

  login(email: string, password: string){

    return new Promise(
      resolve =>{

        const data =  { email, password } ;
        this.http.post(`${ URL }/user/login`, data)
        .subscribe( async resp => {
          if( resp['ok'] ) {
    
           await this.guardartoken( resp['token'] );
            resolve(true);
    
          }else{
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
    
        });

      });

 

  }

  registro( usuario: Usuario){

    return new Promise( resolve => {

      this.http.post(`${ URL }/user/create` , usuario )
      .subscribe( async resp => {

        if( resp['ok'] ) {
    
         await this.guardartoken( resp['token'] );
          resolve(true);
  
        }else{
          this.token = null;
          this.storage.clear();
          resolve(false);
        }

      });



    });

  }

getUsuario() {

  if(!this.usuario._id){
    this.validaToken();
  }

  return { ...this.usuario }; 

}


  async cargarToken(){

    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean>{

    await this.cargarToken;

    if( !this.token ){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token' : this.token
      });

      this.http.get(`${ URL }/user/`, { headers })
      .subscribe( resp => {

        if( resp['ok'] ){
          this.usuario = resp['usuario'];
          resolve(true);
        }else{
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }

      });
    
    });
  }


  async guardartoken( token: string ){
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }
  actualizarUsuario( usuario: Usuario){

    const headers = new HttpHeaders({

      'x-token': this.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL }/user/update`, usuario, { headers })
      .subscribe(resp => {

        if( resp['ok']) {
          this.guardartoken( resp['token' ] );
          resolve(true);
        }else{
          resolve(false);
        }

      });

    });

  }

logout(){
  // this.token = null;
  // this.usuario = null;
  this.storage.clear();
  this.navCtrl.navigateRoot('/login', {animated: true});
}

validarPerfil(email: string){

  return new Promise(
    resolve =>{

      
      this.http.get<any>(`${ URL }/user/list`)
      .subscribe( async resp => {
        if( resp['ok'] ) {
         
         let login = []; 
         login = resp.usuarios.filter(element => element.email === email && element.estado === "activo" && element.rol === "ROL_CLIENTE")
          
          if (login.length > 0){
            resolve(true);
          }else{
            resolve(false)
          }
     
        }else{
          this.uiServices.alertaInformativa('No se pudo validar perfil de Usuario.');
          resolve(false)
        }
  
      });

    });
}


}
