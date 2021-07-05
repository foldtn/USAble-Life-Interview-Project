import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user.interface';
import { UserDto } from '../../models/user-dto.interface';
import { UserPasswords } from '../../models/user-password.interface';
import { UserRequest } from '../../models/user-request.interface';
import { ApiResponse } from '../../../models/api-response.interface';

import { UserDashboardService } from '../../user-dashboard.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user-profile',
  styleUrls: ['user-profile.component.css'],
  template: `
    <div class="text-center">
      <h1>User Profile</h1>
    </div>
    <div class="col-sm-4 offset-sm-4 mt-4">
      <div class="card" *ngIf="user !== undefined">
        <div class="card-header">
          <h1>Username: {{ user.Username }}</h1>
          <h3 *ngIf="user.UserRole !== undefined">Role: {{ user.UserRole.Name }}</h3>
        </div>
        <div class="card-body">
          <app-user-profile-form [user]="user"
                                 (update)="onUpdate($event)"
          ></app-user-profile-form>
          <hr/>
          <app-user-profile-password-form [errorResponse]="passwordErrorResponse" (update)="updatePassword($event)">
          </app-user-profile-password-form>
        </div>
      </div>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
  user: UserDto;
  currentUser: User;
  passwordErrorResponse: string;

  userRequest: UserRequest = new class implements UserRequest {
    Password: UserPasswords;
    User: UserDto;
  }

  userPassword: UserPasswords = new class implements UserPasswords {
    Active: boolean;
    CreatedDate: Date;
    Id: number;
    Password: string;
    UserId: number;
  }

  constructor(
    private router: Router,
    private userService: UserDashboardService,
    private authService: AuthenticationService,
  ) {
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit() {
    this.userService
      .getUserById(this.currentUser.id)
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.user = data.payload;
        }
        else {
          console.log(data.error);
        }
      });
  }

  onUpdate(event: UserDto) {
    event.CreatedBy = this.currentUser.id;

    this.userService
      .updateUser(event)
      .subscribe((data: ApiResponse) => {
      if (data.success) {
        console.log(data.payload);
        this.user = data.payload;
      }
      else {
        console.log(data.error);
      }
    });
  }

  updatePassword(event: UserPasswords) {
    this.userRequest.User = this.user;
    this.userPassword.Password = event.Password;
    this.userRequest.Password = this.userPassword;

    console.log(this.userRequest);

    this.userService
      .resetPassword(this.userRequest)
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        else {
          this.passwordErrorResponse = data.error;
        }
      });
  }
}
