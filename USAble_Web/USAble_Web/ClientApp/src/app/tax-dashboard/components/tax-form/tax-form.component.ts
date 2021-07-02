import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Tax } from '../../models/tax.interface';

import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-tax-form',
  styleUrls: ['tax-form.component.css'],
  template: `
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-success btn-lg" (click)="open()">Create New Tax</button>
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
      this.tax = result;
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
  nameError: string;
  amountError: string;
  tempName: string;
  tempAmount: number;

  constructor(
    public taxFormModal: NgbActiveModal,
    public helperService: HelperService,
  ){}

  ngOnInit() {
    this.decimalPattern = this.helperService.twoDecimalPattern();
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
      this.amountError = 'Tax Amount is Required'
    }
    // throw validation error if a decimal
    else if (!this.helperService.hasTwoDecimals(value)) {
      this.amountError = 'Only 2 decimal places allowed'
    }
    else {
      this.tempAmount = value;
      this.amountError = undefined;
    }
  }

  disableSubmit() {
    return this.nameError || this.amountError || this.tempName === undefined && this.tempAmount === undefined;
  }
}
