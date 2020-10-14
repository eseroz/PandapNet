import { Component, OnInit, ViewChild } from '@angular/core';
import { FormYatayData } from '../models/formYatayData';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { FormTanim } from '../models/formTanim';
import { environment } from '@environments/environment';
import { FormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { FormSoru } from '../models/formSoru';
import { ActivatedRoute, Router } from '@angular/router';
import SoruCevapExtra from '../models/SoruCevapExtra';
import { chdir } from 'process';

@Component({
  selector: 'app-form-yatay-data-edit',
  templateUrl: './form-yatay-data-edit.component.html',
  styleUrls:['./form-yatay-data-edit.component.css']
})
export class FormYatayDataEditComponent implements OnInit {
  public FormYatayData: FormYatayData;
  public FormTanim: FormTanim;
  public FormSorular: FormSoru[];

  FormAd: string;
  FormGunlukId: string;
  @ViewChild('btnSoruInfo') btnSoruInfo; 

  

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.FormAd = this.route.snapshot.queryParams['formAd'];
    this.FormGunlukId = this.route.snapshot.queryParams['formGunlukId'];

    console.log(this.FormGunlukId);
  }

  async ngOnInit(): Promise<void> {
    let sorular = await this.http
      .get<FormSoru[]>(
        environment.apiUrl + `/FormSoru/FormSorulariGetir?formAd=${this.FormAd}`
      )
      .toPromise();

    let data = await this.http
      .get<FormYatayData>(
        environment.apiUrl +
          `/FormYatayData/FormYatayDataGetirFromId?formGunlukId=${this.FormGunlukId}&formAd=${this.FormAd}`
      )
      .toPromise();

      this.FormSorular=sorular;
    this.FormYatayData=data;
 

    this.FormYatayData.CevapEktraObj = JSON.parse(this.FormYatayData.CevapJson);

    let extraObj = this.FormYatayData.CevapEktraObj;

    for (var i = 1; i < 100; i++) {
      let propName = 'S' + i.toString().padStart(2, '0');

      if (extraObj[propName] == null) {
        extraObj[propName] = { Aciklama: '', Dosyalar: [] };
      }
    }
  }
  async kaydet() {
    let validationText=this.isFormValid();

    if(validationText.length>0)
    {
      alert(validationText);
      return;
    }

    this.FormYatayData.CevapJson = JSON.stringify(
      this.FormYatayData.CevapEktraObj
    );

    console.log(this.FormYatayData);

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let yol =environment.apiUrl + `/FormYatayData/Kaydet`;

    let sonuc = await this.http
      .post(yol, this.FormYatayData, { ...options, responseType: 'text' })
      .toPromise();

    alert('Kayıt işlemi tamalandı');
  }


  isFormValid()
  {
    let validationText="";

    for (var item of this.FormSorular) {
      if(item.ZorunluMu===true &&  !this.FormYatayData[item.SoruKod])
      {
        let uyariText=item.SoruKod + " : Bu alanın girilmesi zorunludur. \n";
        this.FormYatayData.CevapEktraObj[item.SoruKod].Uyari= uyariText;
        validationText+=uyariText;

      }
     
    }

    return validationText;

  }

  soruInfo()
  {
    
    this.btnSoruInfo.nativeElement.setAttribute('data-content','dikkat et');

    this.btnSoruInfo.nativeElement.show();

  }


  modelChangeNumber($event: number, soruKod: string) {

    this.FormYatayData.CevapEktraObj[soruKod].Uyari = '';

    if ($event == null){
      this.FormYatayData[soruKod] =null;
      return $event;
    } 

    this.FormYatayData[soruKod] = $event.toString();
    var soru = this.FormSorular.find((c) => c.SoruKod == soruKod);

    var min = parseFloat(soru.MinMax.split('-')[0].replace(',','.'));
    var max = parseFloat(soru.MinMax.split('-')[1].replace(',','.'));
    var deger = parseFloat($event.toString());


    console.log(min,max,deger);

    if (deger < min || deger > max) {
      this.FormYatayData.CevapEktraObj[soruKod].Uyari = 'Aralık dışı değer. Uygun aralık [' +  soru.MinMax + ']';
    } else {
      this.FormYatayData.CevapEktraObj[soruKod].Uyari = '';
     
    }
    console.log(deger,this.FormYatayData.CevapEktraObj[soruKod]);
  }
}
