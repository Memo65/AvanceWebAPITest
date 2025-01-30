import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../Settings/appSettings';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { AccessResponse } from '../Models/AccessResponse';
import { Login } from '../Models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl: string = appSettings.apiUrl;

  constructor() { }

  signin(user: User): Observable<AccessResponse>{
    return this.http.post<AccessResponse>(`${this.baseUrl}Auth/signin`, user)
  }

  login(user: Login): Observable<AccessResponse>{
    return this.http.post<AccessResponse>(`${this.baseUrl}Auth/login`, user)
  }

  TokenValidation(token: string): Observable<AccessResponse>{
    return this.http.get<AccessResponse>(`${this.baseUrl}Auth/TokenValidation?token=${token}`)
  }

}
