import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGunluk } from './_models/formGunluk';
import { FormSoru } from './_models/formSoru';
import { FormTanim } from './_models/formTanim';
import { FormYatayData } from './_models/formYatayData';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  constructor(private http: HttpClient) {}

  async formSorulariGetir(formAd: string) {
    let data = await this.http
      .get<FormSoru[]>(
        environment.apiUrl + `/FormSoru/FormSorulariGetir?formAd=${formAd}`
      )
      .toPromise();
    return data;
  }

  async formYatayDataGetirFromId(formGunlukId: string, formAd: string) {
    let data = await this.http
      .get<FormYatayData>(
        `${environment.apiUrl}/FormYatayData/FormYatayDataGetirFromId?formGunlukId=${formGunlukId}&formAd=${formAd}`
      )
      .toPromise();

    return data;
  }

  async formGunlukGetirTarihten(tarih: string) {
    let data = await this.http
      .get<FormGunluk[]>(
        `${environment.apiUrl}/FormGunluk/FormGunlukGetirTarihten?tarih=${tarih}`
      )
      .toPromise();

    return data;
  }

  async formOlusturTarihten(tarih: string, formAd: string) {
    let data = await this.http
      .get<FormGunluk>(
        `${environment.apiUrl}/FormGunluk/FormOlusturTarihten?tarih=${tarih}&formAd=${formAd}`
      )
      .toPromise();

    return data;
  }

  async formTanimListeGetir() {

    var userToken = JSON.parse(localStorage.getItem('currentUser')).Token;

    let options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };

    let data = await this.http
    .get<FormTanim[]>(environment.apiUrl + '/FormTanim/FormlariGetir', {
      ...options,
    })
    .toPromise();

    return data;
  }


  async formTanimGetirFormAd(formAd: string) {
    var userToken = JSON.parse(localStorage.getItem('currentUser')).Token;

    let options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };

    let data = await this.http
      .get<FormTanim>(
        `${environment.apiUrl}/FormTanim/FormGetirByFormAd?formAd=${formAd}`,
        { ...options }
      )
      .toPromise();

    return data;
  }
}
