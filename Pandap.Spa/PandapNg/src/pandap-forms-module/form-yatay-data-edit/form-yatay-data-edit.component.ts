import { Component, OnInit } from '@angular/core';
import { FormYatayData } from '../models/formYatayData';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { FormTanim } from '../models/formTanim';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { FormSoru } from '../models/formSoru';
import { ActivatedRoute, Router } from '@angular/router';
import SoruCevapExtra from '../models/SoruCevapExtra';

@Component({
  selector: 'app-form-yatay-data-edit',
  templateUrl: './form-yatay-data-edit.component.html',
})
export class FormYatayDataEditComponent implements OnInit {
  public FormYatayData: FormYatayData;
  public FormTanim: FormTanim;
  public FormSorular: FormSoru[];

  public baseUrl: string = environment.baseUrl;
  FormAd: string;
  FormGunlukId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.FormAd = this.route.snapshot.paramMap.get('formAd');
    this.FormGunlukId = this.route.snapshot.paramMap.get('formGunlukId');

    console.log(this.FormGunlukId);
  }

  async ngOnInit(): Promise<void> {
    this.FormYatayData = await this.http
      .get<FormYatayData>(
        this.baseUrl +
          `FormYatayData/FormYatayDataGetirFromId?formGunlukId=${this.FormGunlukId}&formAd=${this.FormAd}`
      )
      .toPromise();

    this.FormYatayData.CevapEktraObj = JSON.parse(this.FormYatayData.CevapJson);

    console.log(this.FormYatayData);

    this.FormSorular = await this.http
      .get<FormSoru[]>(
        this.baseUrl + `FormSoru/FormSorulariGetir?formAd=${this.FormAd}`
      )
      .toPromise();
  }
  kaydet() {
    let json = `{"Id":1,"FormGunlukId":1,"FormAdi":"SH-Gunluk"}`;

    let obj=JSON.parse(json);

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    
    };

    let yol = this.baseUrl + `FormYatayData/Kaydet`;

    this.http.post<FormYatayData>(yol, obj, options).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => console.error(error)
    );
  }
}
