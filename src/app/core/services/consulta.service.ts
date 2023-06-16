import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient ) { }

  
  public postCriarConsulta(consulta: any): Observable<any> {
    return this.http.post(environments['api'] + 'consultas/', consulta);
  }

  public getConsulta(): Observable<any> {
    return this.http.get<any>(environments['api'] + 'consultas/');
  }

  public deleteConsulta(id: any): Observable<any> {
    return this.http.delete<any>(environments['api'] + 'consultas/' + id, id);
  }
}
