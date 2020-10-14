import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormListeComponent } from 'src/pandap-forms-module/form-liste/form-liste.component';
import { FormSorularComponent } from 'src/pandap-forms-module/form-sorular/form-sorular.component';
import { FormYatayDataEditComponent } from 'src/pandap-forms-module/form-yatay-data-edit/form-yatay-data-edit.component';
import { FormgunlukComponent } from 'src/pandap-forms-module/formgunluk/formgunluk.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'formGunluk', component: FormgunlukComponent },
            { path: 'formSorular', component: FormSorularComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PandapFormRoutingModule { }