import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../models/auth/login';
import { AuthModel } from '../models/auth/AuthModel';
import { Register } from '../models/auth/Register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5050/api/auth'

  login(data: Login) {
    return this.http.post<AuthModel>(`${this.baseUrl}/login`, data);
  }

  register(data: Register) {
    return this.http.post<AuthModel>(`${this.baseUrl}/register`, data)
  }
}
