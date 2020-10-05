import { Component, Input, OnInit,NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from 'src/common/auth.service';
import { Kullanici } from 'src/common/Kullanici';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
kullaniciModel:Kullanici={};

  constructor(private auth:AuthService,private router: Router) { 

 
  }

  ngOnInit(): void {
   

  }
  onParolaDegisti($event)
  {
    this.kullaniciModel.Parola=$event;
  }

  async onGiris()
  {
     let kul1=await this.auth.login( this.kullaniciModel.KullaniciID,this.kullaniciModel.Parola);

    if(kul1!==null)
    {
      localStorage.setItem("token",kul1.Token);
      this.router.navigateByUrl('/');
    }
   
  }
}
