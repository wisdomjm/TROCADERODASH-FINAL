import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  // Importa desde '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Asegúrate de importar AngularFireAuth desde '@angular/fire/compat/auth'
import { Observable } from 'rxjs';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GetDataFromFirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private toastController: ToastController,
  ) { }

  obtenerListaDeUsuarios(){
    return this.firestore.collection('UsuariosTrocadero').valueChanges();
  }

  //Obtener la lista de Todos los Productos dentro de la Coleccion Productos
  obtenerTodosLosProductos(): Observable<any[]> {
    return this.firestore.collection('Productos').valueChanges();
  }

  //BUSCAR LOS PRODUCTOS POR NOMBRE
  buscarProductosPorNombre(nombre: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('nombre', '>=', nombre).where('nombre', '<=', nombre + '\uf8ff')).valueChanges();
  }

  //FILTRAR UN PRODUCTO POR UNA CATEGORIA
  buscarProductosPorCategoria(categoria: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  //FILTRAR UN PRODUCTO POR EL ID DEL VENDEDOR
  buscarProductosPorIdDelVendedor(idVendedor: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('idVendedor', '==', idVendedor)).valueChanges();
  }

  async MensajeDeVerificacion(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
    });

    await toast.present();
  }


}
