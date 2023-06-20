import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(public auth:AuthService) { }

  

  async login(email:string,password:string){
    try {
      await this.auth.login(email, password);
      alert("SESION INICIADA");
    } catch (error:any) {
      alert(error.message);
    }
  }
}
