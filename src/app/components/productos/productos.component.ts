import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  @Input() productos: Producto[] = []; 

  constructor() { }

  ngOnInit() {

    console.log(this.productos);

  }

  removerProducto(event, indice):void{

    this.productos.splice(indice,1);
    console.log("el producto es ", event); 
    console.log("el indice es ", indice); 
  }



}
