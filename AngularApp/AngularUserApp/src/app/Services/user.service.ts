import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../Settings/appSettings';
import { User } from '../Models/User';
import { ResponseAPI } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl:string = appSettings.apiUrl + "User";

  constructor() { }

  getUsers(){
    return this.http.get<User[]>(`${this.apiUrl}/allUsers`)
  }

  getUserById(id: number){
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

  createUser(user: User){
    return this.http.post<ResponseAPI>(this.apiUrl, user)
  }

  updateUser(user: User){
    return this.http.put<ResponseAPI>(this.apiUrl, user)
  }

  deleteUser(id: number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`)
  }
}
