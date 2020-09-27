import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormTanim } from '../models/formTanim';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-liste',
  templateUrl: './form-liste.component.html'

})
export class FormListeComponent implements OnInit {
  public FormTanims: FormTanim[];

  public baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,private router: Router) {
   
  }

  async ngOnInit(): Promise<void> {


    this.FormTanims =
       await this.http.get<FormTanim[]>(this.baseUrl + 'FormTanim/FormlariGetir')
      .toPromise();
  }

  edit()
  {
      this.router.navigateByUrl('kestirimci-bakim/formSorular');
  }

  yeniForm()
  {
    alert("yeni form");
  }
    
}

