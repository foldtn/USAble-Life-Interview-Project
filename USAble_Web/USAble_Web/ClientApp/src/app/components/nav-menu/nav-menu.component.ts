import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

import { User } from '../../models/user.interface';
import { Role } from '../../models/role.enum';

@Component({
  selector: 'app-nav-menu',
  styleUrls: ['./nav-menu.component.css'],
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent  {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isServer() {
    return this.currentUser && this.currentUser.userRole === Role.Server;
  }

  get isManager() {
    return this.currentUser && this.currentUser.userRole === Role.Manager;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
