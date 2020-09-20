import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListeComponent } from 'src/kestirimci-bakim/form-liste/form-liste.component';
import { FormSorularComponent } from 'src/kestirimci-bakim/form-sorular/form-sorular.component';
import { FormYatayDataEditComponent } from 'src/kestirimci-bakim/form-yatay-data-edit/form-yatay-data-edit.component';
import { FormgunlukComponent } from 'src/kestirimci-bakim/formgunluk/formgunluk.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'kestirimci-bakim/formliste',
    component: FormListeComponent,
  },

  {
    path: 'kestirimci-bakim/formGunluk',
    component: FormgunlukComponent,
  },

  {
    path: 'kestirimci-bakim/formYatayData/:formAd/:formGunlukId',
    component: FormYatayDataEditComponent,
  },

  {
    path: 'kestirimci-bakim/formSorular',
    component: FormSorularComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
