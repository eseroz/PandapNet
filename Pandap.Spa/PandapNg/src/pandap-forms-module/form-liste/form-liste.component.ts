import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormTanim } from '../models/formTanim';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-liste',
  templateUrl: './form-liste.component.html',
})
export class FormListeComponent implements OnInit {
  public FormTanims: FormTanim[];


  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit(): Promise<void> {

    let options = {
      headers: {
        'Authorization':'Bearer ' + localStorage.getItem("token")
      },
    };

    this.FormTanims = await this.http
      .get<FormTanim[]>(environment.apiUrl + 'FormTanim/FormlariGetir',{ ...options})
      .toPromise();
  }

  edit() {
    this.router.navigateByUrl('pandap-forms/formSorular');
  }

  yeniForm() {
    alert('yeni form');
  }
}
