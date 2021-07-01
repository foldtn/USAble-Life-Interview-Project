import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Discount } from './models/discount.interface';
import { ApiResponse } from '../models/api-response.interface';

@Injectable()
export class DiscountDashboardService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getDiscounts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/discount/getall`);
  }

  createDiscount(discount: Discount): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/discount/create`, discount)
  }

  updateDiscount(discount: Discount): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/discount/update`, discount)
  }

  deleteDiscount(discount: Discount): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/discount/delete`, discount)
  }

  getDiscountById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/discount/getbyid`, {
      params: new HttpParams().set('id', String(id))
    });
  }
}
