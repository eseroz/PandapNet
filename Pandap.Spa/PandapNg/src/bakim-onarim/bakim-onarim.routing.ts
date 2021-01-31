import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BakimPlanlariComponent } from './bakim-planlari/bakim-planlari.component';

import { PeriyodikBakimDashboardComponent } from './periyodik-bakim-dashboard/periyodik-bakim-dashboard.component';
import { PeriyodikBakimComponent } from './periyodik-bakim/periyodik-bakim.component';



const routes: Routes = [
  {
    path: '',
    component: PeriyodikBakimDashboardComponent,
    children: [
      { path: 'dashboard', component: PeriyodikBakimDashboardComponent },
      { path: 'periyodik-bakim/bakim-planlari', component:BakimPlanlariComponent },
      { path: 'periyodik-bakim/bakim-planla', component:PeriyodikBakimComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriyodikBakimRoutingModule {}
