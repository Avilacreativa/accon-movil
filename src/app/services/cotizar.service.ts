import { UsuarioService } from './usuario.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { UiserviceService } from './uiservice.service';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CotizarService {

  private carrito = [];
  private carritoNumeroItems = new BehaviorSubject(0);
  producto: string[] = null;
  nuevoCotizacion = new EventEmitter<Cotizar>();

  constructor(
    private uiServices : UiserviceService,
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private storage: Storage

  ) { }

  obtenerCarrito(){
    return this.carrito;
  }

  obtenerCarritoNumeroItems(){
    return this.carritoNumeroItems;
  }
  
  eliminarProducto(product){
    for(let [index, p] of this.carrito.entries()){
      if(p.id === product.id){
        this.carritoNumeroItems.next(this.carritoNumeroItems.value - p.cantidad);
        this.carrito.splice(index,1);
      }
    }
  }

  bajarCantidadProducto(product){
    for(let [index, p] of this.carrito.entries()){
      if(p.id === product.id){
        p.cantidad -= 1;
        if(p.cantidad == 0){
          this.carrito.splice(index,1);
        }
      }
    }
  }

    agregarProducto(carrito){

      this.storage.get('productList').then(carritoStore => {
        const find = carritoStore.filter(item => item._id === carrito._id); 
        if (find.length > 0) {
            this.uiServices.presentToast('Este producto ya se encuentra agregado en su carrito!');
        }else{
            this.carrito = carritoStore; 
            this.carrito.push({...carrito, cantidad:1}); 
            this.storage.set('productList', this.carrito).then(resp => {
              this.uiServices.presentToast('Se ha añadido satisfactoriamente!');
            }).catch(error => {
              this.uiServices.presentToast('Error! No se pudo agregar al carrito' + error);
            })
        }
      }).catch(error => {
      this.storage.set('productList', [])
      }) 
     
  }
  
  
  cotizar( cotizar: Cotizar){

    const headers = new HttpHeaders ({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL }/cotizar` , cotizar, { headers } )
      .subscribe( async resp => {
        // console.log( resp );

        if( resp['ok'] ) {
    
          this.nuevoCotizacion.emit(resp['cotizar']);
          resolve(true);
  
        }else{
      
          resolve(false);
        }

      });



    });

  }

  enviarCorreo( body ){

    const headers = new HttpHeaders ({
      'x-token': this.usuarioService.token
    });


    return this.http.post<any>(`${ URL }/email/notificacion`, body, { headers })
  }
}
