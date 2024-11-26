import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  private apiUrl = 'http://localhost:3000/api/auth';  // Backend API URL

  constructor(private http: HttpClient) {}

  // Method for signup
  signupUser(otp: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, {otp}, {
      withCredentials: true, // Include credentials (cookies) with the request
    });
  }

  sendOtp(signupData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/otp`, signupData, {
      withCredentials: true, // Include credentials (cookies) with the request
    });
  }

  // Method for login
  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData, {
      withCredentials: true, // Include credentials (cookies) with the request
    });
  }
}
