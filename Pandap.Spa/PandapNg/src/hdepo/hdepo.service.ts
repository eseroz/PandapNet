import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { STOKTANIM } from './_models/STOKTANIM';

@Injectable({
  providedIn: 'root',
})
export class HdepoService {
  constructor(private http: HttpClient) {}

  public async depoSayimListeGetir() {
    let data = await this.http
      .get<STOKTANIM[]>(
        environment.apiUrl + `/StokTanim/StokTanimBarkodOkutulanListeGetir`
      )
      .toPromise();
    return data;
  }

  public async StokTanimBul(stokKod: string) {
    let data = await this.http
      .get<STOKTANIM>(
        environment.apiUrl + `/StokTanim/StokTanimBul?stokKod=${stokKod}`
      )
      .toPromise();
    return data;
  }


  
}
