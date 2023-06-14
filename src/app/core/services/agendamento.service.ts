import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidade, Medico } from '../interfaces/consultasDados';
import { environments } from 'src/environments/environments';
import { EspecialidadesResponse } from 'src/app/core/models/especialidades-response.model';



@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) {}

  public getEspecialidades(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(
      environments['api'] + 'especialidades/'
    );
  }

  public getMedicos(idEspecialidade: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(
      environments['api'] + 'medicos/' + '?especialidade=' + idEspecialidade
    );
  }

  getAgendasDisponiveis(
    idMedico: string,
    idEspecialidade: string
  ): Observable<any> {
    return this.http.get<EspecialidadesResponse>(
      environments['api'] +
        'agendas/' +
        '?medico=' +
        idMedico +
        '&especialidade=' +
        idEspecialidade
    );
  }

  getAgenda(
    idMedico: string,
    idEspecialidade: string,
    data: string
  ): Observable<any> {
    return this.http.get<EspecialidadesResponse>(
      environments['api'] +
        `agendas/?medico=${idMedico}&especialidade=${idEspecialidade}&data_inicio=${data}&data_final=${data}`
    );
  }
}

