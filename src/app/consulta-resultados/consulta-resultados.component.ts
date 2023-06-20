import { Component, OnInit } from '@angular/core';
//interface
import { RECURSOS_EDUCATIVOS } from './interface/mock-recursosEducativos';

@Component({
  selector: 'app-consulta-resultados',
  templateUrl: './consulta-resultados.component.html',
  styleUrls: ['./consulta-resultados.component.css']
})
export class ConsultaResultadosComponent implements OnInit {

  RecursosEducativos = RECURSOS_EDUCATIVOS;

  constructor() {


  }
  local = "192.168.0.4";
  portF = "3030";
  portD = "8080";
  cargar = async (url: RequestInfo) => {
    let q;
    await fetch(url)
      .then((res) => res.json())
      .then((json) => (q = json))
      .catch((err) => err);
    return q;
  };
  ngOnInit(): void {
    this.RecursosEducativos = [];
    let p = new URLSearchParams(window.location.search),
      json = p.get('p');
    //console.log(json+"");
    if (json) {
      let arr = JSON.parse(json);
      arr.res.forEach((e: any) => {
        for (const key in e) {
          e[key] = e[key];
        }
        this.RecursosEducativos.push(e);
      });
      //console.log(this.RecursosEducativos);
    }

    document.addEventListener('click', async (e: any) => {
      if (e.target.className === 'btn') {
        e.preventDefault();
        e.stopPropagation();
        window.open(`http://192.168.0.4:4200/itemComp?t=${e.target.parentElement.firstElementChild.textContent}`, "_self");



      }
    });

  }
}
