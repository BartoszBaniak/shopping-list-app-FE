import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginData } from '../models/login-data';

@Injectable({
  providedIn: 'root'
})


export class LoginService {
  private loginUrl = "http://localhost:3000";

  private http = inject(HttpClient);
  
  constructor() {}

  login(data: LoginData) {
    return this.http.post<LoginData>('http://localhost:3000/login', data);
    }
  }

