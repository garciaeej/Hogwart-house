import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  // Url de la Api de Harry Potter
  private url: string = "http://hp-api.herokuapp.com/api/characters";

  //Observable que obtiene el valor de la seleccion del Dropdwon Navbar
  ObtenerNombreCasa = new Subject<string>()

  // Instanciamos la clase HTTP
  constructor(private http: HttpClient) {

  }

  // Funcion con parametro para obterner los registros de la API
  getDataValue(student: string) {

    // Variable observable que emitira la url asignada
    let dataUrl: Observable<string[]> = new Observable()

    //Reseteamos la variable en miniscula
    student = student.trim().toLocaleLowerCase()

    //Verificamos y asignamos dependiendo del valor de la variable la ruta de la API
    if (student === "staff") {

      const data = this.http.get<string[]>(`${this.url}/staff`)

      dataUrl = data


    } // FIN IF Staff

    if (student === "students") {

      const data = this.http.get<string[]>(`${this.url}/students`)

      dataUrl = data

    } // FIN IF Students

    // Si la propiedad es diferente la ruta de la API es estdiante
    if (student !== "staff" && student !== "students") {

      const data = this.http.get<string[]>(`${this.url}/house/${student}`)

      dataUrl = data

    } // FIN IF

    // Retornamo el valor
    return dataUrl

  } // FIN Funcion getDataValue

  // Funcion para emitir el nombre de la casa obtenida
  getNombrecasa(casa: string) {
    this.ObtenerNombreCasa.next(casa)

  }

  // Metodo get para manipular el observable
  get nombreCasa() {
    return this.ObtenerNombreCasa
  }


}
