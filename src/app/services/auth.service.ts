import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})



export class AuthService {

  tokenUsuario : any;
  constructor(private auth: AngularFireAuth) {
    

    //Para crear un observador sobre el estado del usuario
    auth.authState.subscribe(user => {
      console.log(user);
      this.tokenUsuario = user?.uid;
      console.log(this.tokenUsuario);
    })
  }

  //Funciones de login y logout
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  //Para poder ocultar o mostrar elementos en función de si estamos logeados o no
  getTokenUser(){
    return (this.tokenUsuario);
  }
  


  //GET TOKEN USER
  TesttokenUser(){
    console.log(this.tokenUsuario);
  }
}
