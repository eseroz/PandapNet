import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { STOKTANIM } from './_models/STOKTANIM';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HdepoService {
  constructor(private http: HttpClient) {}

  async depoSayimListeGetir() {
    let data = await this.http
      .get<STOKTANIM[]>(
        environment.apiUrl + `/StokTanim/StokTanimBarkodOkutulanListeGetir`
      )
      .toPromise();
    return data;
  }
}
