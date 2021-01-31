import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormSoru } from '../_models/formSoru';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTanim } from '../_models/formTanim';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
})
export class FormSorularComponent implements OnInit {
  
  public FormSorular: FormSoru[];
  public FormTanim: FormTanim[];
  FormId = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.FormId = this.route.snapshot.queryParams['formId'];
  }

  async ngOnInit(): Promise<void> {
    var userToken = JSON.parse(localStorage.getItem('currentUser')).Token;

    let options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };

    this.FormTanim = await this.http
      .get<FormTanim[]>(
        `${environment.apiUrl}/FormTanim/FormGetirById?Id=${this.FormId}`,
        { ...options }
      )
      .toPromise();

    this.FormSorular = await this.http
      .get<FormSoru[]>(
        environment.apiUrl + '/FormSoru/FormSorulariGetir?formAd=SH-Gunluk',
        options
      )
      .toPromise();

    console.log(this.FormTanim);
  }
}
