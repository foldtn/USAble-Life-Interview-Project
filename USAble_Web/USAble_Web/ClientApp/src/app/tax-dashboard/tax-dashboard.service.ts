import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tax } from './models/tax.interface';

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

  createTax(tax: Tax): Observable<Tax> {
    return this.http.post<Tax>(`${this.baseUrl}api/tax/create`, tax)
  }

  updateTax(tax: Tax): Observable<Tax> {
    return this.http.post<Tax>(`${this.baseUrl}api/tax/update`, tax)
  }

  deleteTax(tax: Tax): Observable<any> {
    return this.http.post(`${this.baseUrl}api/tax/delete`, tax)
  }

  getTaxById(id: number): Observable<Tax> {
    return this.http.get<Tax>(`${this.baseUrl}api/tax/getbyid`, {
      params: new HttpParams().set('id', String(id))
    });
  }
}
