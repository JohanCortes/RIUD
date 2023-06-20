import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Rdf } from 'src/app/models/rdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  model: Date | any = ('');
  dateAux: Date | any = ('');
  rdfJson2: any;

  rdf: Rdf = {
    id: 0,
    autor: 'autora1,autor2',
    titulo: 'inv1',
    materia: 'Fisica de ondas',
    pClave: 'naturaleza,fisica',
    aConocimiento: 'ciencias exactas',
    coleccion: '3',
    tema: 'ondas',
    fecha: new Date(2017, 4, 4),
    observaciones: 'NA',
  }

  constructor() {
  }


  ngOnInit() {
    this.formdefault(this.rdf);

}
  rdf2Form = new FormGroup({
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
    this.rdf = this.rdf2Form.value;

    if (this.rdf != null) {
      console.log(this.rdf);
      this.editRdf(this.rdf);
    }
    
  }
  formdefault(r: Rdf) {
    this.rdf2Form.patchValue({
      id: r.id,
      autor: r.autor,
      titulo: r.titulo,
      materia: r.materia,
      pClave: r.pClave,
      aConocimiento: r.aConocimiento,
      coleccion: r.coleccion,
      tema: r.tema,
      fecha:"11",
      observaciones: r.observaciones,

    });
  }
  dateFormat(d: Object) {
    this.dateAux = this.rdf.fecha.getFullYear() + "," + this.rdf.fecha.getMonth() + "," + this.rdf.fecha.getDate();
    return this.dateAux;
  }
  editRdf(r: Rdf) {
    this.rdfJson2 = r;
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Registro actualizado',
      showConfirmButton: false,
      timer: 1000
    });  
   

  }
}
