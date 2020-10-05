import { Component, OnInit } from '@angular/core';
import { jwtHelper } from 'src/common/jwtHelper';
import { environment } from '../../environments/environment';
import {AuthService} from 'src/common/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public baseUrl: string= environment.baseUrl;
  AutService: any;


  constructor(private auth:AuthService,private router: Router ) {

  }

  ngOnInit()
  {
    if(this.auth.loggedIn()==false)
    {
      this.router.navigateByUrl('login');
    }
  }



}
