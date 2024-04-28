import { Component, OnInit } from '@angular/core';
import { GetDataFromFirebaseService } from '../services/get-data-from-firebase.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  clientesRegistrados: any[] = [];
  mensaje: any;
  mensajesDisponible: any = [];
  adminUser: any;
  usuarioSeleccionado: any;
  avatar: any;

  constructor(
    private datos: GetDataFromFirebaseService,
    private chat: ChatService,
  ) { }

  ngOnInit() {
    this.ObtenerUltimosUsuarios();
    this.avatar = '../../assets/icon/trocaderologo.jpg';
    this.adminUser = localStorage.getItem('userID');
  }

  ObtenerUltimosUsuarios(){
    this.clientesRegistrados = [];
    this.datos.obtenerListaDeUsuarios().subscribe((respuesta) =>{
      //console.log("RESPUESTA  USUARIOS #################", respuesta);
      this.clientesRegistrados = respuesta;

      
      //this.totalClientes = this.clientesRegistrados.length;
    }, (error: any) =>{
      this.datos.MensajeDeVerificacion("Se genero un error al cargar los Productos");
    });
  }

  public cargarMensajes(uiduser: any){
    this.usuarioSeleccionado = uiduser;
    this.chat.obtenerMensajes(uiduser, this.adminUser).subscribe(respuesta =>{
      this.mensajesDisponible = respuesta;
      console.log("El mensaje es: ", this.mensajesDisponible);
    }, error =>{
      console.log("Error al cargar los mensajes..", error);
    })
  }

  public enviarMensaje(){
    this.chat.enviarMensaje(this.adminUser, this.usuarioSeleccionado, this.mensaje, this.avatar);
    this.cargarMensajes(this.usuarioSeleccionado);
    this.mensaje = "";
  }

}
