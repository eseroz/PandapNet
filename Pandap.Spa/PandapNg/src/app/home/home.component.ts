import { Component } from '@angular/core';
import { jwtHelper } from 'src/common/jwtHelper';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public baseUrl: string= environment.baseUrl;


  constructor() {
    var text="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJnb2ttZW4xOTc3IiwidW5pcXVlX25hbWUiOiJnb2ttZW4iLCJuYmYiOjE2MDE5MTYwNzEsImV4cCI6MTYwMjAwMjQ3MSwiaWF0IjoxNjAxOTE2MDcxfQ.BlNiJ4_vhyGzZDyoD70n4pkiA1zMXZNNO5dn91vb1c8";
    let jwt=new jwtHelper(text);

    console.log(jwt.getDecodedToken());
  }


}
