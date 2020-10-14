import { FormTanimsComponent } from './form-tanimlari/form-tanims.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormgunlukComponent } from './form-gunluk/formgunluk.component';
import { FormYatayDataEditComponent } from './form-yatay-data-edit/form-yatay-data-edit.component';
import { FormsModule } from '@angular/forms';
import { FormSorularComponent } from './form-tanimlari/form-sorular.component';
import { PandapControlsModule } from 'src/pandap-controls/PandapControlsModule';
import { DateFromUTCPipe } from './_utils/DateFromUTCPipe';
import { PandapFormRoutingModule } from './pandapforms.routing';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FormTanimsComponent,
    FormgunlukComponent,
    FormYatayDataEditComponent,
    FormSorularComponent,
    LayoutComponent,
    DateFromUTCPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    PandapControlsModule,
    PandapFormRoutingModule,
  ],
  exports: [
    LayoutComponent,
    FormTanimsComponent,
    FormgunlukComponent,
    FormYatayDataEditComponent,
    FormSorularComponent,
  ],
})
export class PandapFormsModule {}
