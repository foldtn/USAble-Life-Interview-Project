import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable()
export class UserDashboardService {
  constructor(
    private http: HttpClient,
  ) {}
}
