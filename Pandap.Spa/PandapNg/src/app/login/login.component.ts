import { Component, Input, OnInit, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { Kullanici } from '@app/_models/user';

declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  kullaniciModel: Kullanici = {};

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}
  onParolaDegisti($event) {
    this.kullaniciModel.Parola = $event;
  }

  async onGiris() {
    let hata = '';

    //  let kul1=await this.auth.login( this.kullaniciModel.KullaniciID,this.kullaniciModel.Parola)
    //  .catch((x)=>
    //   {
    //      hata=x;
    //   });

    //  if(hata.length>0)
    //  {
    //   alertify.confirm('Confirm Message');
    //    alertify.warning(hata);

    //  }

    // if(kul1!==null)
    // {
    //   localStorage.setItem("token",kul1.Token);
    //   this.router.navigateByUrl('/');
    // }
  }
}
