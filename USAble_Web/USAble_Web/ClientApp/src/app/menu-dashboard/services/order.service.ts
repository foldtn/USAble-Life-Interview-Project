import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../models/api-response.interface';
import { OrderRequest } from '../models/order-request.interface';

@Injectable()
export class OrderService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getOrderById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/order/getbyid`, {
      params: new HttpParams().set('id', String(id))
    });
  }

  getOrders(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/order/getall`);
  }

  createOrder(request: OrderRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/order/create`, request)
  }
}
