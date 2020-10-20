import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGunluk } from '../_models/formGunluk';
import { FormYatayDataEditComponent } from '../form-yatay-data-edit/form-yatay-data-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormDataService } from '../formData.service';

@Component({
  selector: 'app-formgunluk',
  templateUrl: './formgunluk.component.html',
})
export class FormgunlukComponent implements OnInit {
  public FormGunluks: FormGunluk[];
  public FormRouter: Router;

  public DoldurulmaYuzde:number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService:FormDataService
  ) {
    this.FormRouter = router;


  }

  
  private _aktifTarih : string;
  public get aktifTarih() : string {
    return this._aktifTarih;
  }
  public set aktifTarih(v : string) {
    this._aktifTarih = v;

    this.yukle();
  }
  

  async ngOnInit(): Promise<void> {

    let bugun=new Date();
    this.aktifTarih= bugun.toISOString().split("T")[0];

    this.yukle();
   
  }

  async yukle()
  {
    this.FormGunluks = await this.dataService.formGunlukGetirTarihten(this.aktifTarih);

    let doldurulan_formSayisi=this.FormGunluks.filter(c=>c.FormGuncellenmeTarihi===null);
    let gunluk_formSayisi=this.FormGunluks.length;

    this.DoldurulmaYuzde=100-(doldurulan_formSayisi.length/gunluk_formSayisi)*100;
  }



  edit(formgunluk: FormGunluk) {

    this.router.navigate(['/formYatayData'], {
      queryParams: { formAd: formgunluk.FormAd, formGunlukId: formgunluk.Id,sadeceSorunluSorular:false },
    });
  }

  sorunluSorulariGoster(formgunluk: FormGunluk) {

    this.router.navigate(['/formYatayData'], {
      queryParams: { formAd: formgunluk.FormAd, formGunlukId: formgunluk.Id,sadeceSorunluSorular:true },
    });
  }
}
