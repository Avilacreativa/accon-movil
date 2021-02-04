import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

 @Input() categorias : Categorias[] = [];
 habilitado : boolean = true;
  textoBuscar: string = '';

  constructor(
    private categoriasService: CategoriasService,
    private navCtrl : NavController,
    private router: Router
  ) { }

  

  ngOnInit() {
    this.siguientes();
    this.categoriasService.nuevaCategoria
    .subscribe( category =>{
      this.categorias.unshift( category );
    });
  }
  recargar( event ){

    this.siguientes( event, true );
    this.habilitado = true;
    this.categorias = [];

  }

  onSearchChange( event ){

    this.textoBuscar = event.detail.value;
  }
  siguientes( event?, pull: boolean = false ){

    this.categoriasService.getCategorias( pull )
        .subscribe( resp => {
          console.log(resp);
          this.categorias.push(...resp.categorias )
     
          if( event ){
            event.target.complete();
            
            if( resp.categorias.length === 0 ){
              this.habilitado = false;
    
            }
          }
     
        });
      
  }
  categoriasProducto(categoria){
    // this.navCtrl.navigateForward('main/tabs/producto-categoria', categoria);
    this.router.navigate(['main/tabs/producto-categoria', categoria]);
  }

}
