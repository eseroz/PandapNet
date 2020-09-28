import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GkUploadComponent } from './gk-upload/gk-upload.component';


@NgModule({
  declarations: [GkUploadComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GkUploadComponent
  ]
})
export class PandapControlsModule {
}
