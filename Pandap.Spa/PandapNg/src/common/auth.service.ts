import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Kullanici } from './Kullanici';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  async  login(_kullaniciId,_parola){
    
  
    let kul={kullaniciId:_kullaniciId,parola:_parola}

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let yol = this.baseUrl + `Kullanici/Login`;

    let sonuc:Kullanici = await this.http
      .post(yol, JSON.stringify(kul), { ...options})
      .toPromise();

    
    

    return sonuc;

  }

  loggedIn()
  {
    return  localStorage.getItem("token")!=null;
  }

  logOut()
  {
    localStorage.removeItem("token");
  }
}
