import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MenuItems } from '../models/menu-items.interface';
import { ApiResponse } from '../../models/api-response.interface';

@Injectable()
export class MenuItemsService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getMenuItems(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/menuitem/getall`);
  }

  createMenuItem(menuItems: MenuItems): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/menuitem/create`, menuItems)
  }

  updateMenuItem(menuItems: MenuItems): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/menuitem/update`, menuItems)
  }

  deleteMenuItem(menuItems: MenuItems): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/menuitem/delete`, menuItems)
  }

  getMenuItemById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/menuitem/getbyid`, {
      params: new HttpParams().set('id', String(id))
    });
  }
}
