import {Component, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Tax } from '../../models/tax.interface';

import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-tax-details',
  styleUrls: ['tax-detail.component.css'],
  templateUrl: 'tax-detail.component.html'
})
export class TaxDetailComponent implements OnChanges {
  @Input()
  detail: Tax;

  @Output()
  update: EventEmitter<Tax> = new EventEmitter<Tax>();

  @Output()
  delete: EventEmitter<Tax> = new EventEmitter<Tax>();

  editing: boolean = false;
  taxNameError: string;
  taxAmountError: string;
  tempName: string;
  tempAmount: number;

  constructor(private helperService: HelperService) {}

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
      this.tempName = this.detail.Name;
      this.tempAmount = this.detail.Amount;
    }

    if (changes.nameExists) {
      const tempTax = changes.nameExists.currentValue;

      if (tempTax !== undefined && tempTax.Id !== this.detail.Id) {
        this.taxNameError = 'Tax name already exists';
      }
      else {
        this.taxNameError = undefined;
      }
    }
  }

  onNameChange(value: string) {
    // check if name is already exists
    if (value === undefined || value === null || value === '') {
      this.taxNameError = 'Tax Name is Required';
    }
    else {
      this.tempName = value;
      this.taxNameError = undefined;
    }
  }

  onAmountChange(value: number) {
    // throw required validation error
    if (value === undefined || value === null) {
      this.taxAmountError = 'Tax Amount is Required'
    }
    // throw validation error if a decimal
    else if (!this.helperService.hasTwoDecimals(value)) {
      this.taxAmountError = 'Only 2 decimal places allowed'
    }
    else {
      this.tempAmount = value;
      this.taxAmountError = undefined;
    }
  }

  onDelete() {
    this.delete.emit(this.detail);
  }

  undoChanges() {
    this.taxNameError = undefined;
    this.taxAmountError = undefined;
    this.editing = false;
  }

  toggleEdit() {
    if (this.editing) {
      if (this.tempName !== undefined) {
        this.detail.Name = this.tempName;
        this.tempName = undefined;
      }

      if (this.tempAmount !== undefined) {
        this.detail.Amount = this.tempAmount;
        this.tempAmount = undefined;
      }

      this.update.emit(this.detail);
    }

    this.editing = !this.editing;
  }
}
