import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Tax } from '../../models/tax.interface';

@Component({
  selector: 'app-tax-details',
  styleUrls: ['tax-detail.component.css'],
  template: `
    <div>
      {{ detail.Name }} test
    </div>
  `
})
export class TaxDetailComponent implements OnChanges {
  @Input()
  detail: Tax;

  constructor() {}

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }
}
