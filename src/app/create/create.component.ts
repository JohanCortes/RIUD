import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Rdf } from '../models/rdf';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  model: Date | any = ('');
  dateAux: Date | any = ('');


  rdfJson: any;
  rdf: Rdf = {
    id: 0,
    autor: 'autora1,autor2',
    titulo: 'inv1',
    materia: 'Fisica de ondas',
    pClave: 'naturaleza,fisica',
    aConocimiento: 'ciencias exactas',
    coleccion: '3',
    tema: 'ondas',
    fecha: new Date(1995, 11, 17),
    observaciones: 'NA',
  }
  constructor() { }

  ngOnInit(): void {
  }
  rdfForm = new FormGroup({
    autor: new FormControl(''),
    titulo: new FormControl(''),
    materia: new FormControl(''),
    pClave: new FormControl(''),
    aConocimiento: new FormControl(''),
    coleccion: new FormControl(''),
    tema: new FormControl(''),
    fecha: new FormControl(''),
    observaciones: new FormControl(''),
  });
  onSubmit() {
    this.rdf = this.rdfForm.value;

    if (this.rdf != null) {
      console.log(this.rdf);
      this.createRdf(this.rdf);
    }

  }
  dateFormat(d: Object) {
    this.dateAux = this.rdf.fecha.getFullYear() + "," + this.rdf.fecha.getMonth() + "," + this.rdf.fecha.getDate();
    return this.dateAux;
  }

  createRdf(r: Rdf) {
    this.rdfJson = r;
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Registro creado',
      showConfirmButton: false,
      timer: 1000
    });


  }

}
