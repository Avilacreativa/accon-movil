import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  paginaPosts = 0;
  nuevoProducto = new EventEmitter<Producto>();

  constructor( 
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private filetransfer: FileTransfer
    
    ) { }

  getPost( pull: boolean = false ){

    if( pull ){
      this.paginaPosts = 0;
    }

    this.paginaPosts ++;
     return this.http.get<RespuestaProductos>(`${ URL }/productos/?pagina=${ this.paginaPosts }`)
  }

  getCategoriasProductos( pull: boolean = false, categoria: any ){

    if( pull ){
      this.paginaPosts = 0;
    }
  
    this.paginaPosts ++;

    return this.http.get<RespuestaCategoriasByProducto>(`${ URL }/productos/${ categoria }/?pagina=${ this.paginaPosts }`)
  }

  crearProducto( producto ){
    
    const headers = new HttpHeaders ({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL }/productos`, producto, { headers })
        .subscribe(resp => {
      
        this.nuevoProducto.emit(resp['producto']);
        resolve(true);

    });
      
    });

    
  }

  subirImagen( img: string ){

    const options: FileUploadOptions = {

      fileKey: 'image',
      headers:{
        'x-token': this.usuarioService.token }

    };

    const fileTransfer: FileTransferObject = this.filetransfer.create();
    fileTransfer.upload( img, `${ URL }/productos/upload`, options )
    .then( data =>{
      console.log(data);
    }).catch( err => {
      console.log('Error en carga', err);
    });


  }

  
}
