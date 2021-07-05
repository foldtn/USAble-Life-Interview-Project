import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserDto } from '../../models/user-dto.interface';
import { UserRoleDto } from '../../models/user-role-dto.interface';

@Component({
  selector: 'app-user-form',
  styleUrls: ['user-form.component.css'],
  template: `
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-success btn-lg" (click)="open()">Create New User</button>
    </div>
  `
})
export class UserFormComponent {
  @Input()
  roles: UserRoleDto[];

  @Input()
  allUsernames: number[];

  @Output()
  create: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  constructor(
    private modalService: NgbModal,
  ) {
  }

  open() {
    const modalRef = this.modalService.open(UserFormModalContent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.componentInstance.roles = this.roles;
    modalRef.componentInstance.allUsernames = this.allUsernames;

    modalRef.result.then((result: any) => {
      if (result.valid){
        this.create.emit(result.value);
      }
    },(reason) => {
      console.log(reason);
    });
  }
}


@Component({
  selector:'app-user-form-modal',
  styleUrls: ['user-form.component.css'],
  templateUrl: 'user-form-modal.component.html'
})
export class UserFormModalContent implements OnInit {
  roles: UserRoleDto[];
  allUsernames: number[];

  integerError: boolean = false;
  usernameExists: boolean = false;

  userForm: FormGroup;

  constructor(
    public userFormModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      Username: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(9999)
        ]
      ],
      FirstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(25)
        ]
      ],
      LastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(25)
        ]
      ],
      UserRoleId: [
        '',
        [
          Validators.required,
        ]
      ]
    });
  }

  usernameAlreadyExists(value: number) {
    if (value !== undefined && value !== null) {
      const foundUsername = this.allUsernames.find((username: number) => {
        if (username === value) {
          return username;
        }
      });

      return foundUsername !== undefined;
    }

    return false;
  }

  onUsernameChange() {
    const value = this.userForm.value.Username;
    this.integerError = (value !== undefined && value !== null) ? !Number.isInteger(value) : false;

    this.usernameExists = this.usernameAlreadyExists(value)
  }

  getFormGroup(value: string) {
    return this.userForm.get(value);
  }

  isValid(value: string) {
    return this.getFormGroup(value).valid && this.fieldInteractedWith(value);
  }

  isInvalid(value: string) {
    return this.getFormGroup(value).invalid && this.fieldInteractedWith(value);
  }

  isUsernameValid(value: string) {
    return this.isValid(value) && !this.integerError && !this.usernameExists;
  }

  isUsernameInvalid(value: string) {
    return (this.getFormGroup(value).invalid || this.integerError || this.usernameExists) && this.fieldInteractedWith(value);
  }

  fieldInteractedWith(value: string) {
    return this.getFormGroup(value).dirty || this.getFormGroup(value).touched;
  }

  hasErrors(value: string) {
    return this.getFormGroup(value).invalid && this.getFormGroup(value).errors && this.fieldInteractedWith(value);
  }
}
