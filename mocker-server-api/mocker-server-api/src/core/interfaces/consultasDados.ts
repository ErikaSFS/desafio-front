
export interface Especialidade {
  id: number;
  nome: string;
}
export interface Cadastro {
  id: number;
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}
export interface Consulta {
  id: number;
  dia: string;
  horario: string;
  data_agendamento: string;
  medico: Medico;
}
export interface Login {
    username: string;
    senha: string;
    password: string;
  }