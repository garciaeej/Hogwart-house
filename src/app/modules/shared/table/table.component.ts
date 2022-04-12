import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Student } from '../../interfaces/houses';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges {

  //Obtenemos la referencia seleccionada del Dropdown Navbar
  @Input() houseSelected!: string

  mostrarHouse!: string

  //Propiedades del MATTable y MATPaginator
  displayedColumns: string[] = ['Image', 'Name', 'Patronus', 'Age'];
  dataSource!: any
  length!: number
  pageSize = 5
  pageSizeOption: number[] = [5, 10]
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  //Instanciamos el servicio
  constructor(private service: HouseService,
    private route:Router) { }

  //Actualiza los cambio de propiedades y funciones referentes al @Input
  ngOnChanges(changes: SimpleChanges): void {
    this.mostrarHouse = this.houseSelected
    this.obternerTabla()

  }

  //Funcion para obtener los valores provenientes de una metodo del servicio
  obternerTabla(): void {

    this.service.getDataValue(this.mostrarHouse).subscribe(data => {

      //Arreglo final donde se almacenaran todos los estudiantes
      const studentsArray: Student[] = []

      //Registrar el año actual
      const currentYear = new Date().getFullYear()

      //Recorremos la data para trabajar los Objetos de manera independiente
      data.forEach((element: any) => {


      //Se verifican y ordenan si los elementos estan vacios

        //Verificamos si el elemento viene vacio y por medio del año de nacimiento su edad
        if (element.yearOfBirth == "") {
          element.age = "Fecha No Registrada"
        } else {
          element.age = (currentYear - element.yearOfBirth)
        }

        //Verificamos si el elemento patronus viene vacio
        if (element.patronus == "") element.patronus = "Patronus no Registrado"


        //Verificamos si el elemento imagen viene vacio y le asignamos su imagen mediante su genero
        if (element.image === null || element.image === "" && element.gender === "female") element.image = "https://cdn-icons-png.flaticon.com/512/1154/1154448.png"

        if (element.image === null || element.image === "" && element.gender === "male") element.image = "https://cdn-icons-png.flaticon.com/512/145/145867.png"

        
        
        // Guardamos los elementos en una constante
        const obj: Student = {
          image: element.image,
          name: element.name,
          patronus: element.patronus,
          age: element.age,
          gender: element.gender,
          house: element.house
        } 

        //Agregamos el nuevo objeto recorrido por el FOREACH al arreglo principal
        studentsArray.push(obj)

      }); // FIN FOREACH

    // Segmento para verificar en el LOCALSTORAGE si hay registros

      // Guardamos la variable en miniscula
      const houseLocal: string = this.mostrarHouse.toLowerCase()

     

      // Si la variable es "Students"
      // Pasamos el LOCALSTORAGE directo para mostrar todos los estudiantes
      if (houseLocal==="students") {

         //Guardamos los registros del LOCALSTORAGE "newStudent"
      let getLocalStorage: any = localStorage.getItem("newStudent")

     
      
      //Verificamos si existen registros
      if (getLocalStorage) {

        //Se guarda en formato arreglo en la variable
        getLocalStorage = JSON.parse(getLocalStorage)

        // For OF para recorrer el arreglo y manipular el arreglo de objecto
        for (const data of getLocalStorage) {

          //SE guarda el nuevo arreglo de objecto en la primera posicion en el arreglo del estudiantes
          studentsArray.unshift(data)

        }

      } // FIN IF getLocalStorage
        
      } // FIN IF Students      
      
      // De lo contrario

      //Guardamos los registros del LOCALSTORAGE
      let getLocalStorage: any = localStorage.getItem(houseLocal)

      
      //Verificamos si existen registros
      if (getLocalStorage) {

        //Se guarda en formato arreglo en la variable
        getLocalStorage = JSON.parse(getLocalStorage)

        // For OF para recorrer el arreglo y manipular el arreglo de objecto
        for (const data of getLocalStorage) {

          //SE guarda el nuevo arreglo de objecto en la primera posicion en el arreglo del estudiantes
          studentsArray.unshift(data)

        }

      } // FIN IF



      // Se instancia el arreglo de estudiante con la clase de MATTable para mostrar los valores
      //de manera dinamica
      this.dataSource = new MatTableDataSource(studentsArray)

      // Se guardan las propiedades de paginacion en la propiedad del arreglo
      this.dataSource.paginator = this.paginator

    })


  }


  //Funcion de Filtrado de estudiantes
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
