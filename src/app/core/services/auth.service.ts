import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../../features/auth/models/login';
import { AuthModel } from '../../features/auth/models/AuthModel';
import { Register } from '../../features/auth/models/Register';

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
