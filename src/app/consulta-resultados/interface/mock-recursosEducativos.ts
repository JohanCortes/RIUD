import { recursoEducativo } from "./recursosEducativos";

let cargar = async (url: string) => {
  let q;
  await fetch(url)
    .then((res) => res.json())
    .then((json) => (q = json))
    .catch((err) => err);
  return q;
},
  query = () =>
    cargar(
      `http://192.168.0.4:3030/dspace/sparql?query=` + encodeURIComponent(`
      PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX dc:      <http://purl.org/dc/elements/1.1/> 
    SELECT * 
    FROM <http://localhost:8080/rdf/resource/123456789/7>
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
        ?uri dcterms:title ?title.
    } order by ?title
      `)
    );

export let RECURSOS_EDUCATIVOS: recursoEducativo[] = [
  {
    title: 'Instructivo Catalogador metadatos y publicación de documentos',
    creator: 'Sistema de Bibliotecas',
    abstract: 'Revisar y completar los metadatos de los documentos finales almacenados en el RIUD a fin de realizar análisis de información bibliográfica para la recuperación de la información por parte del usuario final.'
    , contributor: "", date: "", language: "", publisher: "", avaible: "", hasPart: "", issued: ""
  },
  {
    title: 'Instructivo Gestor de Colecciones Gestor de ColeccionesGestor de Colecciones',
    creator: 'Pedro',
    abstract: 'Gestionar la Colección del Proyecto Curricular registrada en el Repositorio Institucional de la Universidad Distrital Francisco José de Caldas RIUD. Asignando los permisos correspondientes sobre la colección a los autores.'
    , contributor: "", date: "", language: "", publisher: "", avaible: "", hasPart: "", issued: ""
  },
  {
    title: 'Instructivo Autor "Autoarchivo"',
    creator: 'Sistema de Bibliotecas',
    abstract: 'Permitir al usuario registrar sus propios documentos (tesis y trabajos de grado) siguiendo actividades secuenciales de Autoarchivo, en el Repositorio Institucional RIUD'
    , contributor: "", date: "", language: "", publisher: "", avaible: "", hasPart: "", issued: ""
  }
  ,
  {
    title: 'gg Autor "Autoarchivo"',
    creator: 'gg de Bibliotecas',
    abstract: 'gg hi joan al usuario registrar sus propios documentos (tesis y trabajos de grado) siguiendo actividades secuenciales de Autoarchivo, en el Repositorio Institucional RIUD'
    , contributor: "", date: "", language: "", publisher: "", avaible: "", hasPart: "", issued: ""
  }
]