import { ModalAppointmentService } from '../../core/services/modal-appointment.service';
import { FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Consulta } from '../../core/interfaces/consultasDados';
import { ModalAppointmentComponent } from '../modal-appointment/modal-appointment.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],

})
export class HomeComponent implements OnInit {
  homeForm!: FormGroup;

  user: any;

  responseConsultas!: Consulta[];

  displayedColumns: string[] = [];

    userResponse: any;
    errorMessageUser: string = '';
    showPasswordconfirmedError: boolean = false;


    constructor(
      private formBuilder: FormBuilder,
      private registerService: RegisterService,
      private router: Router,
      