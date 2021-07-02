import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MenuItems } from '../../../models/menu-items.interface';
import { MenuItemCategories } from '../../../models/menu-item-categories.interface';
import { ApiResponse } from '../../../../models/api-response.interface';

import { HelperService } from '../../../../services/helper.service';

@Component({
  selector: 'app-menu-item-detail',
  styleUrls: ['menu-item-detail.component.css'],
  templateUrl: 'menu-item-detail.component.html'
})
export class MenuItemDetailComponent implements OnInit, OnChanges {
  @Input()
  detail: MenuItems;

  @Input()
  categories: MenuItemCategories[];

  @Input()
  response: ApiResponse;

  @Output()
  update: EventEmitter<MenuItems> = new EventEmitter<MenuItems>();

  @Output()
  delete: EventEmitter<MenuItems> = new EventEmitter<MenuItems>();

  editing: boolean = false;

  revertId: number;
  revertName: string;
  revertCost: number;
  revertCategory: number;
  failedAlertMessage: string;
  failedAlert: boolean = false;

  menuItemDetailForm: FormGroup;

  constructor(
    private helperService: HelperService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    let detailName: string;
    let detailCost: number;
    let selectedCategory: string = null;

    if (this.detail !== undefined) {
      detailName = this.detail.Name;
      detailCost = this.detail.Cost;

      let category = this.getCategoryById(this.detail.MenuItemCategoryId);

      if (category !== undefined) {
        selectedCategory = category.Id.toString();
      }

      // set revert names for undo and errors
      this.revertId = this.detail.Id;
      this.revertName = this.detail.Name;
      this.revertCost = this.detail.Cost;
      this.revertCategory = this.detail.MenuItemCategoryId;
    }

    this.menuItemDetailForm = this.fb.group({
      Id: this.detail.Id,
      Name: [
        detailName,
        [
          Validators.required,
          Validators.maxLength(25)
        ]
      ],
      Cost: [
        detailCost,
        [
          Validators.required,
          Validators.pattern(this.helperService.twoDecimalPattern()),
          Validators.min(1),
          Validators.max(100)
        ]
      ],
      MenuItemCategoryId: selectedCategory,
    });
  }

  ngOnChanges() {
    if (this.menuItemDetailForm !== undefined) {
      if (this.response !== undefined && this.response.payload !== undefined)
      {
        let payload = this.response.payload;

        if (payload.Id === this.detail.Id)
        {
          if (this.response.success) {
            this.detail = payload;

            this.menuItemDetailForm.patchValue({
              Id: payload.Id,
              Name: payload.Name,
              Cost: payload.Cost,
              MenuItemCategoryId: payload.MenuItemCategoryId.toString()
            });
          }
          else {
            this.failedAlert = true;
            this.failedAlertMessage = this.response.error;

            this.editing = true;

            this.revertDetails();
          }
        }
      }
      else {
        this.revertDetails();
      }
    }
  }

  onSubmit() {
    if (this.menuItemDetailForm.valid) {
      this.detail = this.menuItemDetailForm.value;
      this.detail.MenuItemCategoryId = parseInt(this.menuItemDetailForm.value.MenuItemCategoryId);
      this.update.emit(this.detail);
      this.editing = false;
      this.closeFailedAlert();
    }
  }

  onDelete() {
    this.delete.emit(this.detail);
  }

  undoChanges() {
    this.revertForm();

    this.editing = false;

    this.closeFailedAlert();
  }

  closeFailedAlert() {
    this.failedAlert = false;
    this.failedAlertMessage = undefined;
  }

  setEditing() {
    this.editing = true;
  }

  getCategoryText(value: number) {
    const menuItemCategory = this.getCategoryById(value);

    return menuItemCategory !== undefined ? menuItemCategory.Name : 'No Category';
  }

  getCategoryById(value: number) {
    if (this.categories !== undefined) {
      return this.categories.find((category: MenuItemCategories) => {
        if (category.Id === value) {
          return category.Name;
        }
      });
    }
  }

  revertDetails() {
    this.detail.Id = this.revertId;
    this.detail.Name = this.revertName;
    this.detail.Cost = this.revertCost;
    this.detail.MenuItemCategoryId = this.revertCategory;

    this.revertForm();
  }

  revertForm() {
    this.menuItemDetailForm.patchValue({
      Id: this.revertId,
      Name: this.revertName,
      Cost: this.revertCost,
      MenuItemCategoryId: this.revertCategory
    });
  }

  getFormGroup(value: string) {
    return this.menuItemDetailForm.get(value);
  }

  hasErrors(value: string) {
    return this.getFormGroup(value).invalid && this.getFormGroup(value).errors && (this.getFormGroup(value).dirty || this.getFormGroup(value).touched)
  }
}
