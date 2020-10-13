import { Component } from '@angular/core';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor( private authenticationService: AuthenticationService)
  {
    
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut()
  {
    this.authenticationService.logout();
 
  }
}
