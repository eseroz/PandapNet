import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepoDashboardComponent } from './depo-dashboard/depo-dashboard.component';
import { HDepoRoutingModule } from './hdepo.routing';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DepoSayimComponent } from './depo-sayim/depo-sayim.component';



@NgModule({
  declarations: [DepoDashboardComponent, LayoutComponent, DepoSayimComponent],
  imports: [
    CommonModule,
    HDepoRoutingModule,
    FormsModule,
    HttpClientModule



  ]
})
export class HDepoModule { }
