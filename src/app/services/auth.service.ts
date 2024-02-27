import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ILogin } from '../interfaces/login.interface';
import { IAdmin } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = 'http://localhost:3003/auth';

  constructor(private http: HttpClient) {}

  loginUser(newUser: ILogin): Observable<{ token: string; user: IAdmin }> {
    return this.http.post<{ token: string; user: IAdmin }>(
      this.apiUrl + '/login',
      newUser
    );
  }

  registerUser(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/api/User/login', {
      username,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem('@sb/token');
    localStorage.removeItem('@sb/user');
    window.location.reload();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('@sb/token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    
    if (isExpired) {
      localStorage.removeItem('@sb/token');
      localStorage.removeItem('@sb/user');
    }

    return !isExpired;
  }
}
