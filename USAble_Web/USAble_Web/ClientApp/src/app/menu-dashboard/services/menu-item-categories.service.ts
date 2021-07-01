import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MenuItemCategories } from '../models/menu-item-categories.interface';
import { ApiResponse } from '../../models/api-response.interface';

@Injectable()
export class MenuItemCategoriesService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getCategories(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/menuitemcategory/getall`);
  }

  createCategory(category: MenuItemCategories): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/menuitemcategory/create`, category)
  }

  updateCategory(category: MenuItemCategories): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/menuitemcategory/update`, category)
  }

  deleteCategory(category: MenuItemCategories): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/menuitemcategory/delete`, category)
  }

  getCategoryById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/menuitemcategory/getbyid`, {
      params: new HttpParams().set('id', String(id))
    });
  }
}
