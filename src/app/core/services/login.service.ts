import { environments } from '../../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Register } from '../models/register/register.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  async login(login: Register) {
    const result = await firstValueFrom(
      this.http.post<any>(environments['api'] + 'users/login/', login)
   );
    if (result) {
      window.sessionStorage.setItem('token', JSON.stringify(result.token));
    }
  }

 public logout() {
    localStorage.removeItem('token');
  }
}