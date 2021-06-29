import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tax } from '../../models/tax.interface';

import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-tax-form',
  styleUrls: ['tax-form.component.css'],
  template: `
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-success btn-sm" (click)="open()">Create New Tax</button>
    </div>
  `
})
export class TaxFormComponent {
  @Output()
  create: EventEmitter<Tax> = new EventEmitter<Tax>();

  tax: Tax;

  constructor(
    private modalService: NgbModal,
  ) {}

  open() {
    const modalRef = this.modalService.open(TaxFormModalContent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.result.then((result: Tax) => {
      console.log(result);
      this.tax = result;
      console.log(this.tax);
      this.create.emit(result);
      },(reason) => {
      console.log(reason);
    });

  }
}

@Component({
  selector:'app-tax-form-modal',
  styleUrls: ['tax-form.component.css'],
  templateUrl: 'tax-form-modal.component.html'
})
export class TaxFormModalContent implements OnInit {
  decimalPattern: string;
  taxNameError: string;
  taxAmountError: string;
  tempName: string;
  tempAmount: number;

  constructor(
    public taxFormModal: NgbActiveModal,
    public helperService: HelperService,
  ){}

  ngOnInit() {
    this.decimalPattern = this.helperService.twoDecimalCheckString();
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
}
