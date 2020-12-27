import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/hdepo/layout/layout.component';
import { DepoDashboardComponent } from './depo-dashboard/depo-dashboard.component';
import { DepoSayimComponent } from './depo-sayim/depo-sayim.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DepoDashboardComponent },
      { path: 'deposayim', component:DepoSayimComponent },
  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HDepoRoutingModule {}
