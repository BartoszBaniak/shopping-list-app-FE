import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ListsData } from '../models/list-data';
import { environment } from '../environments/enviroment';
import { UserDetails } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  baseUrl = environment.baseURL;
  

  constructor(private http: HttpClient, private authService: AuthService) {}


  createList(
    name: string,
  ): Observable<any> {
    const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const params = new HttpParams().set('name', name);

    return this.http.post(`${this.baseUrl}shoppingLists/create`, null, { headers, params });
  }

  getListsByUserId(
    uuid: string
  ): Observable<any> {
    const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<ListsData[]>(`${this.baseUrl}shoppingLists/user/${uuid}`, { headers })
  }

  getListById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<any>(`${this.baseUrl}shoppingLists/${id}`, { headers });
  }

  getShoppingListItems(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<any>(`${this.baseUrl}shoppingLists/${id}/items`, { headers });
  }

  addProductToList(shoppingListId: number, productName: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const body = { [productName]: 1 };

    return this.http.post<any>(`${this.baseUrl}shoppingLists/${shoppingListId}/products/add`, body, { headers });
  }
}
