import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { FormTanim } from '../_models/formTanim';
import { Router } from '@angular/router';
import { FormSoru } from '../_models/formSoru';

@Component({
  selector: 'app-form-tanims',
  templateUrl: './form-tanims.component.html',
})
export class FormTanimsComponent implements OnInit {
  public FormTanims: FormTanim[];

  loading: true;

  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit(): Promise<void> {
    var userToken = JSON.parse(localStorage.getItem('currentUser')).Token;

    let options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };

    this.loading = true;

    this.FormTanims = await this.http
      .get<FormTanim[]>(environment.apiUrl + '/FormTanim/FormlariGetir', {
        ...options,
      })
      .toPromise();

    console.log(this.FormTanims);
  }

  edit(id: number) {
    this.router.navigate(['formSorular'], {
      queryParams: { formId: id.toString() },
    });
  }

  yeniForm() {
    alert('yeni form');
  }
}
