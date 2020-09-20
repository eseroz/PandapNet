import { FormListeComponent } from './form-liste/form-liste.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormgunlukComponent } from './formgunluk/formgunluk.component';
import { FormYatayDataEditComponent } from './form-yatay-data-edit/form-yatay-data-edit.component'
import { FormsModule } from '@angular/forms';
import { FormSorularComponent } from './form-sorular/form-sorular.component';
import { GkControlsModule } from 'src/gk-controls/gk-controls.module';


@NgModule({
  declarations: [FormListeComponent, FormgunlukComponent, FormYatayDataEditComponent, FormSorularComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    GkControlsModule
  ],
  exports:      
  [ 
    FormListeComponent,
    FormgunlukComponent,
    FormYatayDataEditComponent,
    FormSorularComponent

  ]
})
export class KestirimciBakimModule { }


