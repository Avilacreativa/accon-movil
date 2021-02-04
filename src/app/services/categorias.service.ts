import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UiserviceService } from './uiservice.service';
import { NavController } from '@ionic/angular';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment.prod';
import { Storage } from '@ionic/storage';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  token: string = null;
  private categoria: Categorias = {};
  paginaPosts = 0;
  nuevaCategoria = new EventEmitter<Categorias>();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private uiServices: UiserviceService,
    private usuarioService: UsuarioService,
    private navCtrl: NavController
  ) { }
  registro( categoria: Categorias){

    const headers = new HttpHeaders ({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL }/categoria` , categoria, { headers } )
      .subscribe( async resp => {
        console.log( resp );

        if( resp['ok'] ) {
    
          this.nuevaCategoria.emit(resp['categoria']);
          resolve(true);
  
        }else{
      
          resolve(false);
        }

      });



    });

  }

  getCategorias( pull: boolean = false ){

    if( pull ){
      this.paginaPosts = 0;
    }
  
    this.paginaPosts ++;
  
    return this.http.get<RespuestaCategorias>(`${ URL }/categoria/?pagina=${ this.paginaPosts }`)
  }
  
  
  borrar(id: string) {
    const urls = `${ URL }/categoria/delete/${id}`;

    const headers = new HttpHeaders ({
      'x-token': this.usuarioService.token
    });

    return this.http.delete(urls, { headers });
  }
}
