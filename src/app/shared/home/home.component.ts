import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/core/services/consultas.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Consulta } from '../../core/interfaces/consultasDados';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultaComponent } from '../consulta/consulta.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  homeForm!: FormGroup;

  user: any;

  responseConsultas!: Consulta[];

  displayedColumns: string[] = [
    'especialidade',
    'medico',
    'data',
    'hora',
    'delete',
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private consultasService: ConsultasService
  ) {}

  ngOnInit(): void {
    this.AllConsultas();
    this.getUsername();
  }

  openSnackBarGreen(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      panelClass: 'green',
    });
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConsultaComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.AllConsultas();
    });
  }

  AllConsultas() {
    this.consultasService.getConsulta().subscribe((consultas) => {
      this.responseConsultas = consultas;
    });
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  deleteConsulta(id: any) {
    this.consultasService.deleteConsulta(id).subscribe(() => {
      this.openSnackBarGreen('Consulta deletada!', 'Fechar');
      this.AllConsultas();
    });
  }
}
