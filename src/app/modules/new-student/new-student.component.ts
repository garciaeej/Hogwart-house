import { map } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../interfaces/houses';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStudentComponent implements OnInit {

  //Inicializamos con la interfaz FormGroup
  newStudentForm!: FormGroup

  //Instanciamos el FormBuilder en una variable privada
  constructor(
    private readonly fb: FormBuilder,
    private readonly route: Router) { }


  ngOnInit(): void {

    //Se agrega la funcion a la propieda de la interfaz FromGroup
    this.newStudentForm = this.initForm()

  }

  //Funcion al dar click en el botton de submit del Formulario
  onSubmit() {

    let arrayDataForm: Student[] = []
    let studentListRoute;

    //Agrgamos los valores del formulario al array
    arrayDataForm.push(this.newStudentForm.value)


    //Recorremos el array
    arrayDataForm.map(data => {

      studentListRoute = data.house

      // Verificamos el genero y le asignamos la imagen

      if (data.gender === "female") data.image = "https://cdn-icons-png.flaticon.com/512/1154/1154448.png"

      if (data.gender === "male") data.image = "https://cdn-icons-png.flaticon.com/512/145/145867.png"



      // Proceso para verificar la casa y agregarlo al LOCALSTORAGE de cada casa
      // Todos los condicionales IF realizan el mismo procedimiento para la casa seleccionada

      // Casa "Gryffindor"
      if (data.house === "gryffindor") {

        this.asigHouse(arrayDataForm, data.house)

      } // FIN IF Casa "Gryffindor"

      // Casa "Slytherin"
      if (data.house === "slytherin") {

        this.asigHouse(arrayDataForm, data.house)

      } // FIN IF Casa "Slytherin"

      // Casa "Ravenclaw"
      if (data.house === "ravenclaw") {

        this.asigHouse(arrayDataForm, data.house)

      }// FIN IF Casa "Ravenclaw"

      // Casa "Hufflepuff"
      if (data.house === "hufflepuff") {

        this.asigHouse(arrayDataForm, data.house)

      }// FIN IF Casa "Hufflepuff"

    })


    //Proceso para agregar al LOCALSTORAGE de nuevo estudiante

    //Se agrega a la variable el arreglo del LOCALSTORAGE
    let local: any = localStorage.getItem("newStudent")

    // Verificamos si hay registros
    if (local) {

      // Guardamos en formato arreglo
      local = JSON.parse(local)

      // Recorre el arreglo para manipular los arrays de objetos
      for (const obj of local) {

        // Agregamos el objecto recorrido al array principal
        arrayDataForm.unshift(obj)


        // Registramos el arreglo principal en el LOCALSTORAGE
        localStorage.setItem("newStudent", JSON.stringify(arrayDataForm))

      }

    }// FIN IF 


    // Se registra el arreglo principal al LOCALSTORAGE
    localStorage.setItem("newStudent", JSON.stringify(arrayDataForm))

    // Reseteamos el formulario
    this.newStudentForm.reset()

    // Redireccionamos a la ruta de la lista de estudiantes
    this.route.navigate(['/students',])

  }// FIN FUNCION onSubmit


  // Funcion para pasar las propiedades y validaciones de los campos del formulario
  initForm(): FormGroup {

    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      patronus: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      house: ['', [Validators.required]],
    });
  }

  // Funcion para asignar al arreglo principal los registros del LOCALSTORAGE de cada casa
  asigHouse(array: Student[], house: string) {

    // Obtenemos los registro del LOCALSTORAGE de la casa seleccionada
    let arrayLocal: any = localStorage.getItem(house)

    // Verificamos si hay registros
    if (arrayLocal) {

      // Guardamos en formato arreglo
      arrayLocal = JSON.parse(arrayLocal)

      // Recorre el arreglo para manipular los arrays de objetos
      for (let obj of arrayLocal) {

        //Inicializamos el arreglo de objetos para evitar error de tipo 'never'
        const arr = obj

        // Agregamos el objecto recorrido al array principal
        array.push(arr)

        // Registramos el arreglo principal en el LOCALSTORAGE
        localStorage.setItem(house, JSON.stringify(array))

      }// FIN FOREACH

    }else{
      //Si el LOCALSTORAGE esta vacio, se agrega el registro directamente 
      localStorage.setItem(house, JSON.stringify(array))
    }

  
  }


}
