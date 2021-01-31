import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriyodikBakimComponent } from './periyodik-bakim/periyodik-bakim.component';
import { PeriyodikBakimDashboardComponent } from './periyodik-bakim-dashboard/periyodik-bakim-dashboard.component';
import { PeriyodikBakimRoutingModule } from './bakim-onarim.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PandapControlsModule } from 'src/pandap-controls/PandapControlsModule';


@NgModule({
  declarations: [PeriyodikBakimDashboardComponent, PeriyodikBakimComponent],
  imports: [
    CommonModule,
    PeriyodikBakimRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    PandapControlsModule
  ]
})
export class BakimOnarimModule { }
