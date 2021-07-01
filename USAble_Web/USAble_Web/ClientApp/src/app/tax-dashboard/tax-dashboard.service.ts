import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tax } from './models/tax.interface';
import { ApiResponse } from '../models/api-response.interface';

@Injectable()
export class TaxDashboardService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getTaxes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/tax/getall`);
  }

  createTax(tax: Tax): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/tax/create`, tax)
  }

  updateTax(tax: Tax): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/tax/update`, tax)
  }

  deleteTax(tax: Tax): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/tax/delete`, tax)
  }

  getTaxById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/tax/getbyid`, {
      params: new HttpParams().set('id', String(id))
    });
  }
}
