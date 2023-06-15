import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class mockServerApi {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.baseUrl}/users/login`, loginData);
  
  }
}

