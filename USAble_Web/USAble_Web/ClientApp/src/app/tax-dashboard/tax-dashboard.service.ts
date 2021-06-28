import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { Tax } from './models/tax.interface';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class TaxDashboardService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getTaxes(): Observable<Tax[]> {
    return this.http.get<Tax[]>(`${this.baseUrl}api/tax/getall`);
  }

  getTaxById(id: number) {
    return this.http.get(`${this.baseUrl}api/tax/getbyid`, {
      params: new HttpParams().set('id', String(id))
    })
      .pipe(
        map((data: Tax) => {
          return data;
        }), catchError( error => {
          return throwError('Something went wrong!');
        })
      );
  }
}
