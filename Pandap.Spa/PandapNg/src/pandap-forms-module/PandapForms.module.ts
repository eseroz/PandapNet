import { FormListeComponent } from './form-liste/form-liste.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormgunlukComponent } from './formgunluk/formgunluk.component';
import { FormYatayDataEditComponent } from './form-yatay-data-edit/form-yatay-data-edit.component';
import { FormsModule } from '@angular/forms';
import { FormSorularComponent } from './form-sorular/form-sorular.component';
import { PandapControlsModule } from 'src/pandap-controls-module/PandapControlsModule';
import { DateFromUTCPipe } from './utils/DateFromUTCPipe';
import { PandapFormRoutingModule } from './pandapforms.routing';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    FormListeComponent,
    FormgunlukComponent,
    FormYatayDataEditComponent,
    FormSorularComponent,
    LayoutComponent,
    DateFromUTCPipe,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    PandapControlsModule,
    PandapFormRoutingModule,
  ],
  exports: [
    LayoutComponent,
    FormListeComponent,
    FormgunlukComponent,
    FormYatayDataEditComponent,
    FormSorularComponent,
  ],
})
export class PandapFormsModule {}
