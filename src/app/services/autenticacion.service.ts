import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
//import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  userData: any; // Save logged in user data
  userID: any;

  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone,
    private toastController: ToastController 
  ) {

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

   }

   SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
        
        this.userID = result.user?.uid;
        console.log("INICIO SESION: ",this.userID);
        localStorage.setItem('userID', this.userID);
        localStorage.setItem('emailUser',email);
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            //this.router.navigate(['tiendaprincipal']);
            this.MensajeDeVerificacion("Bienvenido.");
          }
        });
      }).catch((error) => {
        //window.alert(error.message);
        this.MensajeDeVerificacion("Error, al Registrar tu Email y Contraseña.");
    });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `UsuariosTrocadero/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      nombres: '',
      apellidos:'',
      direccion:'',
      telefono:'',
      pais:'',
      tienda:''
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  GetUserData(UserId: any): Observable<any[]> {
    return this.afs.collection('UsuariosTrocadero', ref => ref.where('email', '==', UserId)).valueChanges();
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
