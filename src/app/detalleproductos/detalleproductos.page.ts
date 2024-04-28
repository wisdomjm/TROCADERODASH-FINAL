import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalleproductos',
  templateUrl: './detalleproductos.page.html',
  styleUrls: ['./detalleproductos.page.scss'],
})
export class DetalleproductosPage implements OnInit {

  nombre: any;
  detalle: any;
  precio: any;
  imagen: any;
  categoria: any;

  constructor(
    private rutactiva: ActivatedRoute
  ) { }

  ngOnInit() {
    this.nombre = this.rutactiva.snapshot.paramMap.get('nombre');
    this.detalle = this.rutactiva.snapshot.paramMap.get('descripcion');
    this.precio = this.rutactiva.snapshot.paramMap.get('precio');
    this.imagen =  this.rutactiva.snapshot.paramMap.get('imagen');
    this.categoria = this.rutactiva.snapshot.paramMap.get('categoria');

    console.log("INFORMACION: ",this.nombre);
  }

}
