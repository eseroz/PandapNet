import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { int } from '@zxing/library/esm/customTypings';
import { env } from 'process';
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

  public async GuncellemeDurumuSayilariGetir() {

    let data = await this.http.get<number[]>(
      environment.apiUrl + '/StokTanim/GuncellemeDurumuSayilariGetir'
    ).toPromise();
   

    return data;
  }

  public StokTanimGuncelle(stok: STOKTANIM) {
    stok.DosyaListesiJson = JSON.stringify(stok.DosyaListesi);

    var jsonStok = JSON.stringify(stok);

    let yol = environment.apiUrl + `/StokTanim/StokTanimGuncelle`;
    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let sonuc = this.http
      .post(yol, jsonStok, { ...options, responseType: 'text' })
      .toPromise();

    return sonuc;
  }
}
