import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable} from 'rxjs';
import { User} from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient ) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(environments['api'] + 'users', user);
  }

}
