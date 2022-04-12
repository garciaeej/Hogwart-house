import { HouseService } from './../../services/house.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  title: string = "Hogwarts House"
  houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]
  nameHouse!: string

    //Instanciamos el servicio y la clase Router
  constructor(
    private service:HouseService,
    private readonly route:Router
    ) { }

  //Funcion para seleccionar la ruta /home cuando se toque el Dropdwon Navbar
  homeRoute(){
    this.route.navigate(["home"])
  }
  

  //Funcion para obtener la casa seleccionada y emitirla al servicio
  obtenerCasa(house:string){

    this.service.getNombrecasa(house)
     
  }

}