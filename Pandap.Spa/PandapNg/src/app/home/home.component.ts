import { Component, OnInit } from '@angular/core';
import { jwtHelper } from '@app/_helpers/jwt.helper';
import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
 

  constructor() {}

  ngOnInit() {}
}
