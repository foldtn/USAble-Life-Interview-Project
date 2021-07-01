import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MenuItems } from '../../../models/menu-items.interface';
import { MenuItemCategories } from '../../../models/menu-item-categories.interface';

import { HelperService } from '../../../../services/helper.service';

@Component({
  selector: 'app-menu-item-form',
  styleUrls: ['menu-item-form.component.css'],
  template: `
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-success btn-lg" (click)="open()">Create New Menu Item</button>
    </div>
  `
})
export class MenuItemFormComponent {
  @Input()
  categories: MenuItemCategories[];

  @Output()
  create: EventEmitter<MenuItems> = new EventEmitter<MenuItems>();

  menuItem: MenuItems;

  constructor(
    private modalService: NgbModal,
  ) {}

  open() {
    const modalRef = this.modalService.open(MenuItemFormModalContent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.componentInstance.categories = this.categories;

    modalRef.result.then((result: MenuItems) => {
      this.menuItem = result;
      this.create.emit(result);
    },(reason) => {
      console.log(reason);
    });

  }
}

@Component({
  selector:'app-menu-item-form-modal',
  styleUrls: ['menu-item-form.component.css'],
  templateUrl: 'menu-item-form-modal.component.html'
})
export class MenuItemFormModalContent implements OnInit {
  categories: MenuItemCategories[];
  decimalPattern: string;
  nameError: string;
  costError: string;
  tempName: string;
  tempCost: number;
  tempCategory: number;

  constructor(
    public menuItemFormModal: NgbActiveModal,
    public helperService: HelperService,
  ){}

  ngOnInit() {
    this.decimalPattern = this.helperService.twoDecimalCheckString();
  }

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

  onAmountChange(value: number) {
    // throw required validation error
    if (value === undefined || value === null) {
      this.costError = 'Tax Amount is Required'
    }
    // throw validation error if a decimal
    else if (!this.helperService.hasTwoDecimals(value)) {
      this.costError = 'Only 2 decimal places allowed'
    }
    else {
      this.tempCost = value;
      this.costError = undefined;
    }
  }

  disableSubmit() {
    return this.nameError || this.costError || this.tempName === undefined || this.tempCost === undefined;
  }
}
