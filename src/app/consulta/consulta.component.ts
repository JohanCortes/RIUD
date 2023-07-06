import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import consultar from '/consulta.js';
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})

export class ConsultaComponent implements OnInit {


  public consultaForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.consultaForm = this.formBuilder.group({
      contributor: [''],
      creator: [''],
      date: [''],
      language: [''],
      publisher: [''],
      abstract: [''],
      avaible: [''],
      hasPart: [''],
      issued: [''],
      title: ['']
    })
  }
  local = "192.168.20.74";
  //local = "10.20.193.32";
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

    let query = async () => {
      let datos = this.consultaForm.value,
        filter = "";
      for (const key in datos) {
        console.log(key + ': ' + datos[key]);
        if (datos[key]) {
          filter += `\nFILTER regex(?${key},"${datos[key]}","i").`;
        }
      }
      let QGraphs: any = await this.cargar(`http://${this.local}:${this.portF}/dspace/sparql?query=` + encodeURIComponent(`SELECT DISTINCT ?g  WHERE  { GRAPH ?g {?s ?p ?o} }`)),
        Graphs = "";
      QGraphs.results.bindings.forEach((r: any) => {
        Graphs += `\nFROM <${r["g"].value}>`;
      });
      let Res:any = await this.cargar(`http://${this.local}:${this.portF}/dspace/sparql?query=` + encodeURIComponent(
        `
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX dc:      <http://purl.org/dc/elements/1.1/> 
        SELECT * ${Graphs}
        WHERE {
          ?uri dc:contributor ?contributor.
          ?uri dc:creator ?creator.
          ?uri dc:date ?date.
          ?uri dc:language ?language.
          ?uri dc:publisher ?publisher.
          ?uri dcterms:abstract ?abstract.
          ?uri dcterms:available ?available.
          ?uri dcterms:hasPart ?hasPart.
          ?uri dcterms:issued ?issued.
          ?uri dcterms:title ?title. ${filter}
        } order by ?title
        `
      ));
      Res.results.bindings.forEach((r:any) => {
        r.hasPart.value = r.hasPart.value.replace("localhost", this.local);
      });
      return Res;
    };

    document.getElementById("boton1")?.addEventListener("click", async (e) => {
      e.preventDefault();
      let Res: any = await query(),
        rdf: any = {};
      Res.results.bindings.forEach((r: any) => {
        rdf[r["uri"].value] = {};
        for (const key in r) {
          rdf[r["uri"].value][key] = r[key].value.replace("localhost", this.local);
        }
      });
      let ardf: any = [];
      for (const uri in rdf) {
        ardf.push(rdf[uri]);
      };
      let r = { res: [] };
      r.res = ardf;
      let url = encodeURI(JSON.stringify(r));
      while (url.indexOf("#") > -1) {
        url = url.replace("#", "%23");
      }
      window.open(`http://${this.local}:4200/conReComp?` + `p=${url}`, "_self");
    });

    document.getElementById("boton2")?.addEventListener("click", async (e) => {
      e.preventDefault();
      let Res: any = await query(),
        rdf: any = {};
      Res.results.bindings.forEach((r: any) => {
        if (!rdf[r.uri.value]) rdf[r.uri.value] = {};
        Res.head.vars.forEach((v: any) => {
          let val = "";
          if (r[v].value.startsWith("http")) {
            val = decodeURIComponent(
              r[v].value.replace(`http://${this.local}:${this.portD}/jspui`, "")
            ).substring(0, 45);
            if (val.length === 45) val += "...";
          } else {
            r[v].value.split(" ").forEach((w: any, i: any) => {
              if (i < 41) {
                val += w + " ";
                if ((i + 1) % 7 === 0) val += "\n";
              } else {
                if (i < 42) val += "...";
              }
            });
          }
          if (v !== "uri") {
            if (!rdf[r.uri.value][v]) {
              rdf[r.uri.value][v] = [{ value: val, type: r[v].type }];
            } else {
              let b = true;
              rdf[r.uri.value][v].forEach((e: any) => {
                if (
                  JSON.stringify(e) ===
                  JSON.stringify({ value: val, type: r[v].type })
                )
                  b = false;
              });
              if (b) rdf[r.uri.value][v].push({ value: val, type: r[v].type });
            }
          }
        });
      });
      window.open(
        "https://www.ldf.fi/service/rdf-grapher?rdf=" +
          encodeURIComponent(JSON.stringify(rdf)) +
          "&from=json"
      );
    });
  }


  //KEYWORDS MULTIPLES
  get keywords() {
    return this.consultaForm.get('keywords') as FormArray;
  }
  addKeywords() {
    this.keywords.push(this.formBuilder.control('', Validators.required));
  }
  deleteKeyword(index: number) {
    this.keywords.removeAt(index);
  }
}
