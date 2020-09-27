import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormSoru } from '../models/formSoru';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-sorular',
  templateUrl: './form-sorular.component.html',
})
export class FormSorularComponent implements OnInit {
  public FormSorular: FormSoru[];

  public baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,private router: Router) {
   
  }

  async ngOnInit(): Promise<void> {
    this.FormSorular = await this.http
    .get<FormSoru[]>(
      this.baseUrl + 'FormSoru/FormSorulariGetir?formAd=SH-Gunluk'
    )
    .toPromise();
  }
    
}

