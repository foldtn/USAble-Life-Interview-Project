import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Discount } from '../../models/discount.interface';

import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-discount-form',
  styleUrls: ['discount-form.component.css'],
  template: `
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-success btn-lg" (click)="open()">Create New Discount</button>
    </div>
  `
})
export class DiscountFormComponent {
  @Output()
  create: EventEmitter<Discount> = new EventEmitter<Discount>();

  discount: Discount;

  constructor(
    private modalService: NgbModal,
  ) {}

  open() {
    const modalRef = this.modalService.open(DiscountFormModalContent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.result.then((result: any) => {
      this.discount = <Discount> {
        Name: result.name,
        Amount: result.amount,
        DiscountType: parseInt((result.discountType))
      };
      this.create.emit(this.discount);
    },(reason) => {
      console.log(reason);
    });

  }
}

@Component({
  selector:'app-discount-form-modal',
  styleUrls: ['discount-form.component.css'],
  templateUrl: 'discount-form-modal.component.html'
})
export class DiscountFormModalContent implements OnInit {
  decimalPattern: string;
  nameError: string;
  amountError: string;
  discountTypeError: string;
  tempName: string;
  tempAmount: number;
  tempDiscountType: number;

  constructor(
    public discountFormModal: NgbActiveModal,
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

  onDiscountTypeChange(event: any) {
    this.tempDiscountType = parseInt(event.target.value);
  }

  disableSubmit() {
    return this.nameError
        || this.amountError
        || this.tempName === undefined
        || this.tempAmount === undefined
        || this.tempDiscountType === undefined
  }
}
