import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTanimsComponent } from 'src/pandap-forms/form-tanimlari/form-tanims.component';
import { FormSorularComponent } from 'src/pandap-forms/form-tanimlari/form-edit.component';
import { FormYatayDataEditComponent } from 'src/pandap-forms/form-yatay-data-edit/form-yatay-data-edit.component';
import { FormgunlukComponent } from 'src/pandap-forms/form-gunluk/formgunluk.component';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'formTanimlari', component: FormTanimsComponent },
      { path: 'formGunluk', component: FormgunlukComponent },
      { path: 'formSorular', component: FormSorularComponent },
      {
        path: 'formYatayData',
        component: FormYatayDataEditComponent,
      },
      {
        path: 'formYatayData/:formAd?/:formGunlukId?',
        component: FormYatayDataEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PandapFormRoutingModule {}
