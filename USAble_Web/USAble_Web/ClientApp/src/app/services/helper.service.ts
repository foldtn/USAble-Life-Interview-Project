import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() {}

  hasTwoDecimals(value: number) {
    return value.toString().match(this.twoDecimalCheckString());
  }

  twoDecimalCheckString() : string {
    return '^[0-9]+(\.[0-9]{1,2})?$';
  }
}
