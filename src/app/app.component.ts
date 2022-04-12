import { Component, OnInit } from '@angular/core';
import { HouseService } from './modules/services/house.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hogwart-house';

  ngOnInit(): void {

  }

}
