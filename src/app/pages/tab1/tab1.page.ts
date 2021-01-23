import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UiserviceService } from '../../services/uiservice.service';
import { CotizarService } from '../../services/cotizar.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  productos : Producto[] = [];
  habilitado : boolean = true;
  textoBuscar: string = '';


  constructor( 
    private productosService : ProductosService
    
    ) { }

  ngOnInit() {

    this.siguientes();
    this.productosService.nuevoProducto
    .subscribe( producto =>{
      this.productos.unshift( producto );
    });
    
      
  }
  recargar( event ){

    this.siguientes( event, true );
    this.habilitado = true;
    this.productos = [];

  }
  siguientes( event?, pull: boolean = false ){

    this.productosService.getPost( pull )
        .subscribe( resp => {
  
          this.productos.push(...resp.producto )
     
          if( event ){
            event.target.complete();
            
            if( resp.producto.length === 0 ){
              this.habilitado = false;
    
            }
          }
     
        });
      
  }

  onSearchChange( event ){

    this.textoBuscar = event.detail.value;
  }



}
