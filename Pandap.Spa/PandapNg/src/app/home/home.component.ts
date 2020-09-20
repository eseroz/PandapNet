import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public baseUrl: string= environment.baseUrl;


  constructor() {
   
  }


}
