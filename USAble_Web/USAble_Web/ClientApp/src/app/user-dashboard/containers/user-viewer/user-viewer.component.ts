import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../models/user.interface';
import { UserDto } from '../../models/user-dto.interface';
import { ApiResponse } from '../../../models/api-response.interface';

import { UserDashboardService } from '../../user-dashboard.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user-viewer',
  styleUrls: ['user-viewer.component.css'],
  templateUrl: 'user-viewer.component.html'
})
export class UserViewerComponent implements OnInit {
  user: UserDto;
  currentUser: User;

  tempPassword: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserDashboardService,
    private authService: AuthenticationService,
  ) {
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService
      .getUserById(userId)
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.user = data.payload;
        }
        else {
          console.log(data.error);
        }
      });
  }

  generateNewPassword() {
    this.user.ModifiedBy = this.currentUser.id;

    this.userService
      .generateNewPassword(this.user)
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.tempPassword = data.payload.Password;
        }
        else {
          console.log(data.error);
        }
      });
  }

  removeUser() {
    this.user.ModifiedBy = this.currentUser.id

    this.userService
      .deleteUser(this.user)
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.goBack();
        }
        else {
          console.log(data.error);
        }
      });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
