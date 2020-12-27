import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';

const pandapFormModule = () =>
  import('src/pandap-forms/PandapForms.module').then(
    (x) => x.PandapFormsModule
  );

const hdepoFormModule = () =>
  import('src/hdepo/hdepo.module').then(
    (x) => x.HDepoModule
  );


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'pandapforms', loadChildren: pandapFormModule },
  { path: 'hdepo', loadChildren: hdepoFormModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
