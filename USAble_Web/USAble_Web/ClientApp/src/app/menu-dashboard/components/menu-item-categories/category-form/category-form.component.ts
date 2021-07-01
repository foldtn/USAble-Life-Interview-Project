import {Component, EventEmitter , Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MenuItemCategories } from '../../../models/menu-item-categories.interface';

@Component({
  selector: 'app-category-form',
  styleUrls: ['category-form.component.css'],
  template: `
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-success btn-lg" (click)="open()">Create New Tax</button>
    </div>
  `
})
export class CategoryFormComponent {
  @Output()
  create: EventEmitter<MenuItemCategories> = new EventEmitter<MenuItemCategories>();

  category: MenuItemCategories;

  constructor(
    private modalService: NgbModal,
  ) {}

  open() {
    const modalRef = this.modalService.open(CategoryFormModalContent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.result.then((result: MenuItemCategories) => {
      this.category = result;
      this.create.emit(result);
    },(reason) => {
      console.log(reason);
    });

  }
}

@Component({
  selector:'app-category-form-modal',
  styleUrls: ['category-form.component.css'],
  templateUrl: 'category-form-modal.component.html'
})
export class CategoryFormModalContent  {
  nameError: string;
  amountError: string;
  tempName: string;
  tempAmount: number;

  constructor(
    public categoryFormModal: NgbActiveModal,
  ){}

  onNameChange(value: string) {
    // check if name already exists
    if (value === undefined || value === null || value === '') {
      this.nameError = 'Tax Name is Required';
    }
    else {
      this.tempName = value;
      this.nameError = undefined;
    }
  }

  disableSubmit() {
    return this.nameError || this.tempName === undefined;
  }
}
