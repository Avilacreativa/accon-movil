import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-producto-categoria',
  templateUrl: './producto-categoria.page.html',
  styleUrls: ['./producto-categoria.page.scss'],
})
export class ProductoCategoriaPage implements OnInit {

  productosCategoria : Producto[] = [];
  habilitado : boolean = true;
  textoBuscar: string = '';
  categoriaProductos = this._route.snapshot.paramMap.get('categoria');
  pageTitle = this._route.snapshot.paramMap.get('categoria');

  constructor(
    private productosService : ProductosService,
    private _route : ActivatedRoute 
  ) { 
  }

  ngOnInit() {
    this.siguientes();
    this.productosService.nuevoProducto
    .subscribe( producto =>{
      this.productosCategoria.unshift( producto );
    });

  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter")
}
  recargar( event ){

    this.siguientes( event, true );
    this.habilitado = true;
    this.productosCategoria = [];

  }
  siguientes( event?, pull: boolean = false){
 
    const filtro = this.categoriaProductos;
    
    this.productosService.getCategoriasProductos( pull, filtro )
        .subscribe( resp => {
  
          this.productosCategoria.push(...resp.productosByCategoria )
     
          if( event ){
            event.target.complete();
            
            if( this.productosCategoria.length === 0 ){
              this.habilitado = false;
    
            }
          }
     
        });
      
  }

  onSearchChange( event ){

    this.textoBuscar = event.detail.value;
  }

}
