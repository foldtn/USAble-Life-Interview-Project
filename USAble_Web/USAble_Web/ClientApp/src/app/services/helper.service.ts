import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class HelperService {

  constructor() {}

  hasTwoDecimals(value: number) {
    return value.toString().match(this.twoDecimalPattern());
  }

  twoDecimalPattern() : string {
    return '^[0-9]+(\.[0-9]{1,2})?$';
  }

  wholeNumberPattern() : string {
    return '[0–9]*';
  }

  getNumber(value: string) : number {
    return (value !== undefined) ? parseInt(value) : undefined;
  }
}
