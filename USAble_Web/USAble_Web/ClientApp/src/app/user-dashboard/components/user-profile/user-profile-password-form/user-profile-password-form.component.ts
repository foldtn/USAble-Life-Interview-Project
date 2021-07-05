import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserPasswords } from '../../../models/user-password.interface';

@Component({
  selector: 'app-user-profile-password-form',
  styleUrls: ['user-profile-password-form.component.css'],
  templateUrl: 'user-profile-password-form.component.html'
})
export class UserProfilePasswordFormComponent implements OnInit {
  @Input()
  errorResponse: string;

  @Output()
  update: EventEmitter<UserPasswords> = new EventEmitter<UserPasswords>();

  passwordForm: FormGroup;

  passwordsMatch: boolean = true;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16)
        ]
      ],
      PasswordConfirmation: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16)
        ]
      ]
    });
  }

  onPasswordChange() {
    let password = this.getFormGroup('Password').value;
    let passwordConfirmation = this.getFormGroup('PasswordConfirmation').value;

    if (password !== '' && passwordConfirmation !== '') {
      this.passwordsMatch =  password === passwordConfirmation;
    }
  }

  onUpdate() {
    if (this.passwordForm.valid) {
      this.update.emit(this.passwordForm.value);
    }
  }

  isValid(value: string) {
    return this.getFormGroup(value).valid && this.fieldInteractedWith(value);
  }

  isInvalid(value: string) {
    return this.getFormGroup(value).invalid && this.fieldInteractedWith(value);
  }

  getFormGroup(value: string) {
    return this.passwordForm.get(value);
  }

  fieldInteractedWith(value: string) {
    return this.getFormGroup(value).dirty || this.getFormGroup(value).touched;
  }

  hasErrors(value: string) {
    return this.getFormGroup(value).invalid && this.getFormGroup(value).errors && this.fieldInteractedWith(value);
  }

  closeFailedAlert() {
    this.errorResponse = undefined;
  }
}
