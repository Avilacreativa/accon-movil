import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProductosService } from '../../services/productos.service';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages : string[] = [];
  producto = {
    titulo: '',
    descripcion: '',
    precio: '',
    precioOferta: '',
    stock: '',
    sku: ''
  };
  constructor(
    private productosService: ProductosService,
    private route: Router,
    private camera: Camera
  ) {}

  async crearProducto(){

    const creado = await this.productosService.crearProducto( this.producto );
    
    this.producto = {
      titulo: '',
      descripcion: '',
      precio: '',
      precioOferta: '',
      stock: '',
      sku: ''
    };
    this.tempImages = [];
    
    this.route.navigateByUrl('/main/tabs/tab1');

  }

  camara(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.procesarImagen( options );
    
    
  }
  libreria(){
    
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.procesarImagen( options );
    

  }
  
  procesarImagen( options: CameraOptions){

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      
      const img = window.Ionic.WebView.convertFilesSrc(imageData);
       

      this.productosService.subirImagen(imageData);
       this.tempImages.push(img);
 
     }, (err) => {
      // Handle error
     });
  }

}
