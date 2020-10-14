import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListeComponent } from 'src/pandap-forms-module/form-liste/form-liste.component';
import { FormSorularComponent } from 'src/pandap-forms-module/form-sorular/form-sorular.component';
import { FormYatayDataEditComponent } from 'src/pandap-forms-module/form-yatay-data-edit/form-yatay-data-edit.component';
import { FormgunlukComponent } from 'src/pandap-forms-module/formgunluk/formgunluk.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';

const pandapFormModule = () =>
  import('src/pandap-forms-module/PandapForms.module').then(
    (x) => x.PandapFormsModule
  );

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'pandapforms', loadChildren:pandapFormModule },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
