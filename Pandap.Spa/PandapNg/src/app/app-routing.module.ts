import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListeComponent } from 'src/pandap-forms-module/form-liste/form-liste.component';
import { FormSorularComponent } from 'src/pandap-forms-module/form-sorular/form-sorular.component';
import { FormYatayDataEditComponent } from 'src/pandap-forms-module/form-yatay-data-edit/form-yatay-data-edit.component';
import { FormgunlukComponent } from 'src/pandap-forms-module/formgunluk/formgunluk.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full',canActivate: [AuthGuard] },
  {path:'login',component:LoginComponent},
  {
    path: 'pandap-forms/formliste',
    component: FormListeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'pandap-forms/formGunluk',
    component: FormgunlukComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'pandap-forms/formYatayData/:formAd/:formGunlukId',
    component: FormYatayDataEditComponent,
  },

  {
    path: 'pandap-forms/formSorular',
    component: FormSorularComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
