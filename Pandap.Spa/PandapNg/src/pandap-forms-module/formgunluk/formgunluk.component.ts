import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGunluk } from '../models/formGunluk';
import { FormYatayDataEditComponent } from '../form-yatay-data-edit/form-yatay-data-edit.component';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-formgunluk',
  templateUrl: './formgunluk.component.html',
})
export class FormgunlukComponent implements OnInit {
  public FormGunluks: FormGunluk[];
  public FormRouter: Router;


  constructor(private http: HttpClient, private router: Router) {
    this.FormRouter = router;
  }

  async ngOnInit(): Promise<void> {
    this.FormGunluks = await this.http
      .get<FormGunluk[]>(environment.apiUrl + 'FormGunluk/BugunBakilacaklar')
      .toPromise();
  }

  edit(formgunluk: FormGunluk) {
    this.router.navigateByUrl(
      `pandap-forms/formYatayData/${formgunluk.FormAd}/${formgunluk.Id}`
    );
  }
}
