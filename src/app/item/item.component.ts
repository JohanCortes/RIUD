import { Component, OnInit, Sanitizer } from '@angular/core';
import { MDato } from '../models/mDato';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  dato: MDato;


  constructor(private sanitizer: DomSanitizer) {
    this.dato = {
      titulo: 'Más que basura en el Relleno Sanitario Doña Juana',
      title: 'More than garbage at the Doña Juana Landfill',
      autor: ['López, Fabián', 'Maca, Karol', 'Gordillo, Lisney'],
      resumen: 'Este artículo detalla el mal manejo de los residuos orgánicos y otros residuos de diferente índole que llegan al Relleno Sanitario Doña Juana. Se han identificado en el problemas, malos procedimientos y malas decisiones debido a la zona donde está ubicado y al diseño del mismo. Debe realizarse el reconocimiento de toda la clase de desechos que llegan al relleno sanitario, y con base en los conflictos que se han generado dentro y fuera del relleno, se debe buscar una mejor solución, para que el impacto ambiental sea lo menor posible, y mejorar la calidad de vida de las familias que habitan en la periferia.',
      abstract: 'This article details the mismanagement of organic waste and other residues of different kinds that arrive at the Doña Juana Landfill. Bad procedures and bad decisions have been identified in the problem due to the area where it is located and the design of the landfill. The recognition of all types of waste that arrive at the sanitary landfill should be done, and based on the conflicts that have been generated inside and outside the landfill, a better solution should be sought, so that the environmental impact is as small as possible, and the quality of life of the families that live in the periphery should be improved.',
      enlace: 'https://revistas.udistrital.edu.co/index.php/tekhne/article/view/16679',
      uri: ['http://hdl.handle.net/11349/27468', 'http://hdl.handle.net/11349/27468', 'http://hdl.handle.net/11349/27468'],
      grafo: 'Tekhnê [199]',
      citacion: ''
    };
  }
  safeURL: any;
  //local = "192.168.20.74";
  local = "192.168.20.74";
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
    let p = new URLSearchParams(window.location.search),
      title = p.get('t');
    document.addEventListener('DOMContentLoaded', async () => {
      let Graphs = "",
        QGraphs: any = await this.cargar(`http://${this.local}:${this.portF}/dspace/sparql?query=` + encodeURIComponent(`SELECT DISTINCT ?g  WHERE  { GRAPH ?g {?s ?p ?o} }`));
      QGraphs.results.bindings.forEach((r: any) => {
        Graphs += `\nFROM <${r["g"].value}>`;
      });
      let Res: any = await this.cargar(
        `http://${this.local}:${this.portF}/dspace/sparql?query=` + encodeURIComponent(`PREFIX dcterms: <http://purl.org/dc/terms/> PREFIX dc: <http://purl.org/dc/elements/1.1/> SELECT * ${Graphs} WHERE { ?uri dc:contributor ?contributor. ?uri dc:creator ?creator. ?uri dc:date ?date. ?uri dc:language ?language. ?uri dc:publisher ?publisher. ?uri dcterms:abstract ?abstract. ?uri dcterms:available ?available. ?uri dcterms:hasPart ?hasPart. ?uri dcterms:issued ?issued. ?uri dcterms:title ?title. ?uri dcterms:bibliographicCitation ?citation. FILTER regex(?title, "${title}", "i") } limit 1`
        )),
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

      let obj = Res.results.bindings[0];
      console.log(obj);
      this.dato.title = obj.title.value;
      this.dato.titulo = obj.publisher.value;
      this.dato.autor = [obj.creator.value];
      this.dato.resumen = obj.abstract.value;
      this.dato.abstract = obj.date.value.split('T')[0];
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(obj.hasPart.value);
      this.dato.uri = [obj.hasPart.value];
      this.dato.enlace = obj.uri.value;
      this.dato.citacion = obj.citation.value;
      this.dato.grafo = "https://www.ldf.fi/service/rdf-grapher?rdf=" +
        encodeURIComponent(JSON.stringify(rdf)) +
        "&from=json";
      let a = document.getElementById("grafo");
      if (a) {
        a.innerHTML = this.dato.grafo.substring(0, 70) + "...";
      }

    });
    document.getElementById("preview")?.addEventListener("click", (e) => {
      e.preventDefault();
      let url = `http://${this.local}:5126/?url=` + this.dato.uri[0];

      fetch(url, {
        method: "GET",
        headers: {
          "accept": "text/plain"
        }
      }).then((res) => res.text()).then(res => {
        console.log(res);
        let $viewer = document.getElementById("viewer"),
          $iframe = document.createElement("iframe"),
          $modal = document.getElementById("pdfModal"),
          name:any = this.dato.uri[0].split('/');
        name = decodeURI(name[name.length - 1]).replace(".", "-1-15.");
        name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        $iframe.setAttribute("src", `../../assets/doc/${name}`);
        $viewer?.firstElementChild?.remove();
        $viewer?.appendChild($iframe);
        $iframe.style.width = "100%";
        $iframe.style.height = "520px";
        $modal?.style.setProperty("display", "block");
      })



      /* this.cargar(url).then((res) => {
        let $viewer = document.getElementById("viewer"),
          $iframe = document.createElement("iframe"),
          $modal = document.getElementById("pdfModal"),
          name = this.dato.uri[0].split('/');
        console.log("res:", res, "name:", name);
        $iframe.setAttribute("src", "../../assets/doc/doc-1-15.pdf");
        $viewer?.appendChild($iframe);
        $iframe.style.width = "100%";
        $iframe.style.height = "520px";
        $modal?.style.setProperty("display", "block");
      }); */
    });
    document.getElementById("closeview")?.addEventListener("click", (e) => {
      let $modal = document.getElementById("pdfModal");
      $modal?.style.setProperty("display", "none");
    });
  }
}



