import { Component, OnInit } from '@angular/core';
import { GetDataFromFirebaseService } from '../services/get-data-from-firebase.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  clientesRegistrados: any[] = [];
  detalleCliente: any = {};

  constructor(
    private datos: GetDataFromFirebaseService,
  ) { }

  ngOnInit() {
        //cargar la lista de Usuarios
        this.ObtenerUltimosUsuarios();
  }

  ObtenerUltimosUsuarios(){
    this.clientesRegistrados = [];
    this.datos.obtenerListaDeUsuarios().subscribe((respuesta) =>{
      console.log("RESPUESTA  USUARIOS #################", respuesta);
      this.clientesRegistrados = respuesta;
    }, (error: any) =>{
      this.datos.MensajeDeVerificacion("Se genero un error al cargar los Productos");
    });
  }

  SeleccionarCliente(uid: any, nombres:any, apellidos:any, email:any, telefono:any, direccion:any){
    this.detalleCliente = {};

    this.detalleCliente.uis = uid;
    this.detalleCliente.nombres = nombres;
    this.detalleCliente.apellidos = apellidos;
    this.detalleCliente.email = email;
    this.detalleCliente.telefono = telefono;
    this.detalleCliente.direccion = direccion;
    //this.detalleCliente.idVendedor = uid;
  }

}
