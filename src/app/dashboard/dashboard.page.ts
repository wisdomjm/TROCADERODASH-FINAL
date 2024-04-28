import { Component, OnInit } from '@angular/core';
import { GetDataFromFirebaseService } from '../services/get-data-from-firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  totalProductos: any;
  totalClientes: any;
  emailtest: string = "user@email.com";

  productosDisponibles: any[] = [];
  clientesRegistrados: any[] = [];

  constructor(
    private datos: GetDataFromFirebaseService,
  ) { }

  ngOnInit() {
    this.totalProductos = 0;
    this.totalClientes = 0;

    //carga la lista de Productos
    this.ObtenerUltimosProductos();

    //cargar la lista de Usuarios
    this.ObtenerUltimosUsuarios();
  }


  ObtenerUltimosProductos(){
    this.productosDisponibles = [];
    this.datos.obtenerTodosLosProductos().subscribe((respuesta) =>{
      console.log("RESPUESTA PRODUCTOS #################", respuesta);
      this.productosDisponibles = respuesta;
      this.totalProductos = this.productosDisponibles.length;
    }, (error: any) =>{
      this.datos.MensajeDeVerificacion("Se genero un error al cargar los Productos");
    });
  }

  ObtenerUltimosUsuarios(){
    this.clientesRegistrados = [];
    this.datos.obtenerListaDeUsuarios().subscribe((respuesta) =>{
      console.log("RESPUESTA  USUARIOS #################", respuesta);
      this.clientesRegistrados = respuesta;

      
      this.totalClientes = this.clientesRegistrados.length;
    }, (error: any) =>{
      this.datos.MensajeDeVerificacion("Se genero un error al cargar los Productos");
    });
  }

}
