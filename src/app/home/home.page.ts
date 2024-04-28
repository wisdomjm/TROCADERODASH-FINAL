import { Component } from '@angular/core';
import { AutenticacionService } from '../services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: any;
  password: any;

  constructor(
    private autenticacion: AutenticacionService,
    public router: Router
  ) {}

  iniciarSesion(){
    console.log(this.email , this.password);
    this.autenticacion.SignIn(this.email,this.password).then(res =>{
      this.router.navigate(['/dashboard']);
    }).catch(error =>{
      this.autenticacion.MensajeDeVerificacion("Verifica el email o contraseña");
    }).finally(() =>{
      this.autenticacion.MensajeDeVerificacion("Bienvenido a TrocaderoShop");
    })
  }

}
