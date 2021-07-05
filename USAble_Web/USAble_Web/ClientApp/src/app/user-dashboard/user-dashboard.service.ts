import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserDto } from './models/user-dto.interface';
import { UserRequest } from './models/user-request.interface';
import { ApiResponse } from '../models/api-response.interface';

@Injectable()
export class UserDashboardService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/user/GetById`, {
      params: new HttpParams().set('id', String(id))
    });
  }

  getUsers(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/user/GetAll`, {
      params: new HttpParams().set('currentUserId', String(id))
    });
  }

  createUser(user: UserDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/user/Create`, user)
  }

  updateUser(user: UserDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/user/Update`, user)
  }

  deleteUser(user: UserDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/user/Delete`, user)
  }

  getUserRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/user/GetRoles`);
  }

  getAllUsernames(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}api/user/GetAllUsernames`);
  }

  resetPassword(request: UserRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/user/ResetPassword`, request);
  }

  generateNewPassword(user: UserDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}api/user/GenerateRandomPassword`, user);
  }
}
