import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { MenuItemCategories } from '../../../models/menu-item-categories.interface';
import { ApiResponse } from '../../../../models/api-response.interface';

@Component({
  selector: 'app-category-detail',
  styleUrls: ['category-detail.component.css'],
  templateUrl: 'category-detail.component.html'
})
export class CategoryDetailComponent implements OnChanges {
  @Input()
  detail: MenuItemCategories;

  @Input()
  response: ApiResponse;

  @Output()
  update: EventEmitter<MenuItemCategories> = new EventEmitter<MenuItemCategories>();

  @Output()
  delete: EventEmitter<MenuItemCategories> = new EventEmitter<MenuItemCategories>();

  editing: boolean = false;
  nameError: string;
  tempName: string;
  revertName: string;
  failedAlertMessage: string;
  failedAlert: boolean = false;

  constructor() {}

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
      this.tempName = this.detail.Name;
    }

    if (changes.response) {
      const response = Object.assign({}, changes.response.currentValue);
      if (response.success !== undefined) {
        if(response.success){
          if (this.tempName !== undefined) {
            this.detail.Name = this.tempName;
          }

          this.editing = false;
        } else if (response.payload.Id === this.detail.Id) {
          this.detail.Name = this.revertName;

          this.tempName = this.detail.Name;

          this.revertName = undefined;

          this.editing = true;

          this.failedAlertMessage = response.error;
          this.failedAlert = true;
        }
      }
    }
  }

  onNameChange(value: string) {
    // check if name is already exists
    if (value === undefined || value === null || value === '') {
      this.nameError = 'Tax Name is Required';
    }
    else {
      this.tempName = value;
      this.nameError = undefined;
    }

    this.closeFailedAlert();
  }

  onDelete() {
    this.delete.emit(this.detail);
  }

  undoChanges() {
    this.nameError = undefined;
    this.revertName = undefined;
    this.editing = false;

    this.closeFailedAlert();
  }

  toggleEdit() {
    if (this.editing) {
      if (this.tempName !== undefined) {
        this.revertName = this.detail.Name;
        this.detail.Name = this.tempName;
      }

      this.update.emit(this.detail);
    }

    this.editing = !this.editing;
  }

  closeFailedAlert() {
    this.failedAlert = false;
    this.failedAlertMessage = undefined;
  }

  disableSubmit() {
    return this.nameError || this.tempName === this.detail.Name
  }
}
