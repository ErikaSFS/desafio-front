import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cadastro, Login } from '../interfaces/consultasDados';
import { LoginComponent } from '../../features/login/login.component';
import { first, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { User } from '../models/register.model';


@Injectable({
  providedIn: 'root',
})

export class LoginService {
  constructor(private http: HttpClient) {}


  async login(login: User) {
    const result = await firstValueFrom(
      this.http.post<any>(environment['api'] + 'users/login/', login)
    );
    if (result) {
      window.sessionStorage.setItem('token', JSON.stringify(result.token));
    }
    console.log(result);
  }


  public logout() {
    localStorage.removeItem('token');
  }
}