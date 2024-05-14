import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterData } from '../models/register-data';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient)

  constructor() { }

  postRegisterData(data: RegisterData) {
    return this.http.post<RegisterData>('http://localhost:3000/register', data);
  }
}
