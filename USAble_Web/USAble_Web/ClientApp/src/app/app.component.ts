import { Component } from '@angular/core';
import { Router} from '@angular/router';

import { AuthenticationService} from './services/authentication.service';
import { User} from './models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
