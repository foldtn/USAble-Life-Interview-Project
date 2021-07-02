import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MenuItems } from '../../../models/menu-items.interface';
import { MenuItemCategories } from '../../../models/menu-item-categories.interface';

import { HelperService } from '../../../../services/helper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

    modalRef.result.then((result: any) => {
      if (result.valid){
        this.menuItem = result.value;
        this.menuItem.MenuItemCategoryId = parseInt(result.value.MenuItemCategoryId);
        this.create.emit(this.menuItem);
      }
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

  menuItemDetailForm: FormGroup;

  constructor(
    public menuItemFormModal: NgbActiveModal,
    private helperService: HelperService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    let test = this.categories;

    this.menuItemDetailForm = this.fb.group({
      Name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25)
        ]
      ],
      Cost: [
        '',
        [
          Validators.required,
          Validators.pattern(this.helperService.twoDecimalPattern()),
          Validators.min(1),
          Validators.max(100)
        ]
      ],
      MenuItemCategoryId: null,
    });
  }

  getFormGroup(value: string) {
    return this.menuItemDetailForm.get(value);
  }

  hasErrors(value: string) {
    return this.getFormGroup(value).invalid && this.getFormGroup(value).errors && (this.getFormGroup(value).dirty || this.getFormGroup(value).touched)
  }
}
