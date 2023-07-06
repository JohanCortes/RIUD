import { Component, OnInit} from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form-help',
  templateUrl: './form-help.component.html',
  styleUrls: ['./form-help.component.css'],
})
export class FormHelpComponent implements OnInit {

  mostrarDivLoader:boolean = false;
  mostrarLoader:boolean = false;
  mostrarCheck:boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  public sendEmail(e: Event) {
    this.mostrarDivLoader=true;
    this.mostrarLoader=true;
    
    console.log("Mostrando loader")
    e.preventDefault();
    emailjs.sendForm('service_68cidyj', 'template_gdl0lz4', e.target as HTMLFormElement, 'uXmLDLTA6eG7FVshS')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        this.mostrarLoader= false;
        this.mostrarCheck = true;
        setTimeout(()=>{
          this.mostrarDivLoader=false;
          this.resetForm(e);
        },1000)
      }, (error) => {
        console.log(error.text);
      });
  }

  public resetForm(e:Event){
    const node = e.target as HTMLElement;

    node.querySelectorAll('input').forEach(input=>{
      if(input.getAttribute("type") == 'text'){
        input.value='';
      }
    })

    node.querySelectorAll('textarea').forEach(textarea=>{
      textarea.value='';
    })
  }

}
