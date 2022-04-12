
import { HouseService } from './../services/house.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Propiedad para agregar y mostrar el valor en el HTML
  house!: string;
  
  //Inicializamos el servicio
  constructor(private service:HouseService) {}

  ngOnInit():void {

    // Agregamos el valor del observable y lo asignamos a la propiedad
     this.service.nombreCasa.subscribe(data=>{
       this.house = data
     })

  }
  
  
}

