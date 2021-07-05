import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserDto } from '../../models/user-dto.interface';


@Component({
  selector: 'app-user-remove',
  styleUrls: ['user-remove.component.css'],
  template: `
    <button type="button" class="btn btn-danger btn-sm btn-block" (click)="open()"><strong>Remove User</strong></button>
  `
})
export class UserRemoveComponent {
  @Input()
  user: UserDto;

  @Output()
  remove: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
  ) {
  }

  open() {
    const modalRef = this.modalService.open(UserRemoveConfirmationModalContent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.componentInstance.user = this.user;

    modalRef.result.then((result: any) => {
      this.remove.emit();
    }, (reason) => {
      console.log(reason);
    })
  }
}

@Component({
  selector: 'app-user-remove-modal',
  styleUrls: ['user-remove.component.css'],
  template: `
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-8 offset-2 text-center">
            <h3 class="modal-title">Remove User</h3>
          </div>
          <div class="col-2 d-flex justify-content-start">
            <button type="button" class="close" aria-label="Close" (click)="userRemoveModal.dismiss('Cross click')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="text-center">Are you sure you want to remove <strong>{{ user.UserRole.Name }} - {{ user.FirstName }} {{ user.LastName }}</strong>?</p>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <button type="button" class="btn btn-danger btn-lg" (click)="userRemoveModal.close()">
          Remove User: <strong>{{ user.FirstName }} {{ user.LastName }}</strong>
        </button>
      </div>
    </div>
  `
})
export class UserRemoveConfirmationModalContent {
  user: UserDto;

  constructor(
    public userRemoveModal: NgbActiveModal
  ) {
  }
}
