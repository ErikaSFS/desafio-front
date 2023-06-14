import { Component, OnInit } from '@angular/core';
import { Especialidade } from 'src/app/core/interfaces/consultasDados';
import { Medico } from 'src/app/core/interfaces/consultasDados';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgendamentoService } from 'src/app/core/services/agendamento.service';
import { ConsultaService } from 'src/app/core/services/consulta.service';





@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.sass']
})
export class ConsultaComponent implements OnInit {

  criarConsultaForm!: FormGroup;


  especialidades!: Especialidade[];
  medicos!: Medico[];
  horarios!: string[];
  agendasDisponiveis!: any[];

  idEspecialidade!: string;
  idMedico!: string;
  idAgenda!: string;

  diaConsulta!: string;
  horaConsulta!: string;

  respostaConsulta!: string[];

  showErrorMedico: boolean = false;
  showErrorDia: boolean = false;
  showErrorHora: boolean = false;

  requiredPostCreateConsulta = {
    agenda_id: 0,
    horario: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalService: AgendamentoService,
    private dialogRef: MatDialogRef<AgendamentoService>,
    private consultaService: ConsultaService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.criarConsultaForm = this.formBuilder.group({
      especialidade: [null, Validators.required],
      medico: [null, Validators.required],
      agenda: [null, Validators.required],
      hora: [null, Validators.required],
    });

    
    this.getEspecialidades();
  }

  openSnackBarRed(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'red',
      verticalPosition: 'top',
    });
  }

  openSnackBarGreen(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      panelClass: 'green',
    });
  }
  getEspecialidades() {
    this.modalService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
    });
  }

  getMedicos() {
    this.showErrorMedico = false;
    this.showErrorDia = false;

    this.idEspecialidade = this.criarConsultaForm.value.especialidade;
    try {
      if (this.idEspecialidade != null) {
        this.modalService.getMedicos(this.idEspecialidade).subscribe((data) => {
          this.medicos = data;
        });
      } else {
        this.showErrorMedico = true;
        this.openSnackBarRed('Selecione primeiro a especialidade!', 'Fechar');
      }
      this.idMedico = this.criarConsultaForm.value.medico;
    } catch (error) {
      this.openSnackBarRed('Erro!', 'Fechar');
    }
  }

    getAgendasDisponiveis() {
    this.showErrorHora = false;

    try {
      if (this.idEspecialidade != null) {
        this.modalService
          .getAgendasDisponiveis(this.idMedico, this.idEspecialidade)
          .subscribe((data) => {
            this.agendasDisponiveis = data;
          });
      } else {
        this.showErrorDia = true;
        this.openSnackBarRed('Selecione primeiro o medico!', 'Fechar');
      }
      this.diaConsulta = this.criarConsultaForm.value.agenda;
    } catch (error) {
      this.openSnackBarRed('Erro!', 'Fechar');
    }
  }


  getHora() {
    try {
      if (this.idEspecialidade != null) {
        this.modalService
          .getAgenda(this.idMedico, this.idEspecialidade, this.diaConsulta)
          .subscribe((data) => {
            this.horarios = data[0].horarios;
            this.requiredPostCreateConsulta.agenda_id = data[0].id;
          });
      } else {
        this.showErrorHora = true;
        this.openSnackBarRed('Selecione primeiro a data!', 'Fechar');
      }
    } catch (error) {
      this.openSnackBarRed('Erro!', 'Fechar');
    }
  }

  submitForm() {
    try {
      this.requiredPostCreateConsulta.horario =
        this.criarConsultaForm.value.hora;
      this.consultaService
        .postCriarConsulta(this.requiredPostCreateConsulta)
        .subscribe({
          next: () => {
            this.openSnackBarGreen('Consulta Marcada!', 'Fechar');
            this.dialogRef.close();
            this.criarConsultaForm.reset();
          },
          error: () => {
            this.openSnackBarRed('Erro!', 'Fechar');
          },
          complete: () => {},
        });
    } catch (error) {
      this.openSnackBarRed('Erro!', 'Fechar');
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
