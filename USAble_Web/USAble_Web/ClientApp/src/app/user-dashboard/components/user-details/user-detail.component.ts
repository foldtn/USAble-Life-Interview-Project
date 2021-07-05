import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UserDto } from '../../models/user-dto.interface';

@Component({
  selector: 'app-user-detail',
  styleUrls: ['user-detail.component.css'],
  template: `
    <div class="col-sm-4 offset-sm-4 mt-4">
      <div class="card">
        <div class="mt-2 d-flex justify-content-center" *ngIf="user !== undefined">
          <h5>Username: {{ user.Username }}</h5>
        </div>
        <div class="mt-2 d-flex justify-content-center" *ngIf="user !== undefined">
          <h5>Name: {{ user.FirstName }} {{ user.LastName }}</h5>
        </div>
        <div class="mt-2 d-flex justify-content-center" *ngIf="user !== undefined && user.UserRole !== undefined">
          <h5>Role: {{ user.UserRole.Name }}</h5>
        </div>
        <div class="mt-2 mb-2 d-flex justify-content-center">
          <button type="button" class="btn btn-success btn-lg" (click)="viewUser()">
            View User
          </button>
        </div>
      </div>
    </div>
  `
})
export class UserDetailComponent {
  @Input()
  user: UserDto;

  @Output()
  view: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  @Output()
  remove: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  constructor() {
  }

  viewUser() {
    this.view.emit(this.user);
  }
}
