import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserDto } from '../../../models/user-dto.interface';

@Component({
  selector: 'app-user-profile-form',
  styleUrls: ['user-profile-form.component.css'],
  templateUrl: 'user-profile-form.component.html'
})
export class UserProfileFormComponent implements OnInit, OnChanges {
  @Input()
  user: UserDto;

  @Output()
  update: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      FirstName: [
        this.user.FirstName,
        [
          Validators.required,
          Validators.maxLength(25)
        ]
      ],
      LastName: [
        this.user.LastName,
        [
          Validators.required,
          Validators.maxLength(25)
        ]
      ],
      Id: [
        this.user.Id
      ]
    });
  }

  ngOnChanges(changes) {
    if (changes.user && this.userForm !== undefined && this.userForm !== null) {
      this.userForm.patchValue({
        FirstName: this.user.FirstName,
        LastName: this.user.LastName
      });
    }
  }

  onUpdate() {
    if (this.userForm.valid) {
      this.update.emit(this.userForm.value);
    }
  }

  isValid(value: string) {
    return this.getFormGroup(value).valid && this.fieldInteractedWith(value);
  }

  isInvalid(value: string) {
    return this.getFormGroup(value).invalid && this.fieldInteractedWith(value);
  }

  getFormGroup(value: string) {
    return this.userForm.get(value);
  }

  fieldInteractedWith(value: string) {
    return this.getFormGroup(value).dirty || this.getFormGroup(value).touched;
  }

  hasErrors(value: string) {
    return this.getFormGroup(value).invalid && this.getFormGroup(value).errors && this.fieldInteractedWith(value);
  }
}
