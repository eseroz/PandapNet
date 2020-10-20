import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormYatayData } from '../_models/formYatayData';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { FormTanim } from '../_models/formTanim';
import { environment } from '@environments/environment';
import { FormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { FormSoru } from '../_models/formSoru';
import { ActivatedRoute, Router } from '@angular/router';
import SoruCevapExtra from '../_models/SoruCevapExtra';
import { chdir, on } from 'process';
import { FormDataService } from '../formData.service';

@Component({
  selector: 'app-form-yatay-data-edit',
  templateUrl: './form-yatay-data-edit.component.html',
  styleUrls: ['./form-yatay-data-edit.component.css'],
})
export class FormYatayDataEditComponent implements OnInit {
  public FormYatayData: FormYatayData;
  public FormTanim: FormTanim;
  public FormSorular: FormSoru[];
  public FormSorularMetaData: FormSoru[];

  FormAd: string;
  FormGunlukId: string;
  @ViewChild('btnSoruInfo') btnSoruInfo;

  sorunluMu:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService:FormDataService
  ) {
    this.FormAd = this.route.snapshot.queryParams['formAd'];
    this.FormGunlukId = this.route.snapshot.queryParams['formGunlukId'];
  
    this.sorunluMu=this.route.snapshot.queryParams['sadeceSorunluSorular'];

  }

  
  private _SadeceSorunlularGosterilsinMi : boolean;
  public get SadeceSorunlularGosterilsinMi() : boolean {
    return this._SadeceSorunlularGosterilsinMi;
  }
  public set SadeceSorunlularGosterilsinMi(v : boolean) {
    this._SadeceSorunlularGosterilsinMi = v;
  }
  


  async ngOnInit() {



    let formTanim= await this.dataService.formTanimGetirFormAd(this.FormAd);
    let sorular = await this.dataService.formSorulariGetir(this.FormAd);
    let data =  await this.dataService.formYatayDataGetirFromId(this.FormGunlukId,this.FormAd);
    


    this.FormTanim=formTanim;

    this.FormSorularMetaData = sorular.filter(c=>c.HtmlKontrolTip==='form-meta-data');
    this.FormSorular = sorular.filter(c=>c.HtmlKontrolTip!=='form-meta-data');
    this.FormYatayData = data;

    this.FormYatayData.CevapEktraObj = JSON.parse(this.FormYatayData.CevapJson);

    let extraObj = this.FormYatayData.CevapEktraObj;

    for (var i = 1; i < 100; i++) {
      let propName = 'S' + i.toString().padStart(2, '0');

      if (extraObj[propName] == null) {
        extraObj[propName] = { Aciklama: '', Dosyalar: [] };
      }
    }
    
    var sorunSayisi=this.sorunDurumGuncelle();
    var isTrueSet = (this.sorunluMu === 'true');

    if(isTrueSet===false) isTrueSet=null;
    this.SadeceSorunlularGosterilsinMi=isTrueSet;

    }
  async kaydet() {
    let validationText = this.isFormValid();

    if (validationText.length > 0) {
      alert(validationText);
      return;
    }


    var sorunSayisi=this.sorunDurumGuncelle();
    
    this.FormYatayData.BulunanProblemSayisi=sorunSayisi;

    this.FormYatayData.CevapJson = JSON.stringify(
      this.FormYatayData.CevapEktraObj
    );

    this.FormYatayData.BulunanProblemSayisi=sorunSayisi;

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let yol = environment.apiUrl + `/FormYatayData/Kaydet`;

    let sonuc = await this.http
      .post(yol, this.FormYatayData, { ...options, responseType: 'text' })
      .toPromise();

    alert('Kayıt işlemi tamalandı');
  }

  isFormValid() {
    let validationText = '';

    for (var item of this.FormSorular) {
      if (item.ZorunluMu === true && !this.FormYatayData[item.SoruKod]) {
        let uyariText = item.SoruKod + ' : Bu alanın girilmesi zorunludur. \n';
        this.FormYatayData.CevapEktraObj[item.SoruKod].Uyari = uyariText;
        validationText += uyariText;
      }
    }

    return validationText;
  }


  sorunDurumGuncelle() {
 
    let sorunSayisi=0;

    for (var soru of this.FormSorular) {

      if(soru.SoruKod==null) continue; // section bölümü
      this.FormYatayData.CevapEktraObj[soru.SoruKod]["SorunluMu"]=false;


      let soruDeger=this.FormYatayData[soru.SoruKod];

      if(soruDeger==null) continue;

      if (soruDeger=="UYGUN DEĞİL") {
        this.FormYatayData.CevapEktraObj[soru.SoruKod]["SorunluMu"]=true;
        sorunSayisi+=1;
      }
    
      if(soru.MinMax!==null)
      {
        let min = parseFloat(soru.MinMax.split('-')[0].replace(',', '.'));
        let max = parseFloat(soru.MinMax.split('-')[1].replace(',', '.'));

        let aralikDisiMi=this.aralikDisiMi(soruDeger,min,max);

        if(aralikDisiMi) {
          this.FormYatayData.CevapEktraObj[soru.SoruKod]["SorunluMu"]=true;
          sorunSayisi+=1;

        } 
        
      }
    
    }

    return sorunSayisi;
  }


  soruInfo() {
    this.btnSoruInfo.nativeElement.setAttribute('data-content', 'dikkat et');

    this.btnSoruInfo.nativeElement.show();
  }

  modelChangeNumber($event: number, soruKod: string) {
    this.FormYatayData.CevapEktraObj[soruKod].Uyari = '';

    if ($event == null) {
      this.FormYatayData[soruKod] = null;
      return $event;
    }

    this.FormYatayData[soruKod] = $event.toString();
    var soru = this.FormSorular.find((c) => c.SoruKod == soruKod);

    var min = parseFloat(soru.MinMax.split('-')[0].replace(',', '.'));
    var max = parseFloat(soru.MinMax.split('-')[1].replace(',', '.'));
    var deger = parseFloat($event.toString());

    console.log(min, max, deger);

    if (deger < min || deger > max) {
      this.FormYatayData.CevapEktraObj[soruKod].Uyari =
        'Aralık dışı değer. Uygun aralık [' + soru.MinMax + ']';
    } else {
      this.FormYatayData.CevapEktraObj[soruKod].Uyari = '';
    }
    console.log(deger, this.FormYatayData.CevapEktraObj[soruKod]);
  }


  aralikDisiMi(deger,min,max)
  {
    return (deger < min || deger > max);
     
  }

}
