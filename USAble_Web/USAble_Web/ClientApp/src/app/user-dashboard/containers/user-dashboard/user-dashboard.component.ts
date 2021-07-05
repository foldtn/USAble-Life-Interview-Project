import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user.interface';
import { UserDto } from '../../models/user-dto.interface';
import { UserRoleDto } from '../../models/user-role-dto.interface';
import { ApiResponse } from '../../../models/api-response.interface';

import { UserDashboardService } from '../../user-dashboard.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user-dashboard',
  styleUrls: ['user-dashboard.component.css'],
  template: `
    <div class="text-center">
      <h1>Users</h1>
    </div>
    <app-user-form [roles]="userRoles"
                   [allUsernames]="allUsernames"
                   (create)="createUser($event)"
    >
    </app-user-form>
    <div *ngIf="tempPassword !== undefined" class="col-sm-6 offset-3 mt-4">
      <div class="alert alert-success alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeFailedAlert()">&times;</a>
        <h5 class="text-center mt-2">New user was created, have the user login with this temporary password <strong>{{ tempPassword }}</strong></h5>
      </div>
    </div>
    <div *ngIf="users !== undefined">
      <app-user-detail *ngFor="let user of users;"
                       [user]="user"
                       (view)="viewUser($event)"
      >
      </app-user-detail>
    </div>
  `
})
export class UserDashboardComponent implements OnInit {
  users: UserDto[];
  currentUser: User;
  tempPassword: string;
  userRoles: UserRoleDto[];
  allUsernames: number[];

  constructor(
    private router: Router,
    private userService: UserDashboardService,
    private authService: AuthenticationService,
  ) {
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit() {
    this.userService
      .getUserRoles()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.userRoles = data.payload;
        }
        else {
          console.log(data.error);
        }
      });

    this.userService
      .getAllUsernames()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.allUsernames = data.payload;
        }
        else {
          console.log(data.error);
        }
      })

    this.userService
      .getUsers(this.currentUser.id)
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.users = data.payload;
          this.users = this.sortAscending(this.users);
        }
        else {
          console.log(data.error);
        }
      })
  }

  createUser(newUser: UserDto) {
    newUser.CreatedBy = this.currentUser.id;

    this.userService
      .createUser(newUser)
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.tempPassword = data.payload.Password;
          this.users.push(data.payload);
          this.users = this.sortAscending(this.users);
        }
        else {
          console.log(data.error);
        }
      });
  }

  viewUser(event: any) {
    this.router.navigate(['/users',event.Id]);
  }

  sortAscending(users: UserDto[]): UserDto[] {
    return users.sort((a,b) => a.Username - b.Username);
  }
}
