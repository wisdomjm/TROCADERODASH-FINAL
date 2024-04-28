import { Component, OnInit } from '@angular/core';
import { GetDataFromFirebaseService } from '../services/get-data-from-firebase.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productosDisponibles: any[] = [];

  constructor(
    private datos: GetDataFromFirebaseService,
  ) { }

  ngOnInit() {
    this.ObtenerUltimosProductos();
  }

  ObtenerUltimosProductos(){
    this.productosDisponibles = [];
    this.datos.obtenerTodosLosProductos().subscribe((respuesta) =>{
      console.log("RESPUESTA PRODUCTOS #################", respuesta);
      this.productosDisponibles = respuesta;
      //this.totalProductos = this.productosDisponibles.length;
    }, (error: any) =>{
      this.datos.MensajeDeVerificacion("Se genero un error al cargar los Productos");
    });
  }

}
