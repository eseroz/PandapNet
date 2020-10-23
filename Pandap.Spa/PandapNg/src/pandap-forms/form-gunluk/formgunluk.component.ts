import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGunluk } from '../_models/formGunluk';
import { FormYatayDataEditComponent } from '../form-yatay-data-edit/form-yatay-data-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormDataService } from '../formData.service';
import { FormTanim } from '../_models/formTanim';

@Component({
  selector: 'app-formgunluk',
  templateUrl: './formgunluk.component.html',
})
export class FormgunlukComponent implements OnInit {
  public FormGunluks: FormGunluk[];
  public FormHaftalikTanims: FormTanim[]=[];
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
    this._aktifTarih= bugun.toISOString().split("T")[0];

    console.log(bugun.toISOString());

    this.yukle();
   
  }

  async yukle()
  {
    
    let formTanimlari= await this.dataService.formTanimListeGetir();
    this.FormHaftalikTanims=formTanimlari.filter(c=>c.FormAd.includes("Hafta"));
   
    this.FormGunluks = await this.dataService.formGunlukGetirTarihten(this.aktifTarih);


    let doldurulan_formSayisi=this.FormGunluks.filter(c=>c.FormGuncellenmeTarihi===null);
    let gunluk_formSayisi=this.FormGunluks.length;

    this.DoldurulmaYuzde=100-(doldurulan_formSayisi.length/gunluk_formSayisi)*100;
  }

  async OzelFormEkle(formAd)
  {
    var form=await this.dataService.formOlusturTarihten(this.aktifTarih,formAd);
    this.FormGunluks.push(form);

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
