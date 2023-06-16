import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/core/services/register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  MyErrorStateMatcher,
  passwordValidator,
} from 'src/app/features/register/verificacaoSenha';
import { User } from 'src/app/core/models/register.model';



export class RegisterComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  hide = true;
  profileForm!: FormGroup;
  userResponse: any;
  errorMessageUser: string = '';
  showPasswordconfirmedError: boolean = false;



  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}


  
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group(
      {
        nome: [
          null,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(150),
          ],
        ],
        email: [
          null,
          [Validators.required, Validators.email, Validators.maxLength(150)],
        ],
        senha: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(150),
          ],
        ],
        confirmarSenha: [null, Validators.required],
      },
      { validators: [passwordValidator] }
    );
  }

  openSnackBarGreen(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      panelClass: 'green',
    });
  }

  openSnackBarRed(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'red',
      verticalPosition: 'top',
    });
  }

  createUser() {
    this.registerService.createUser(this.profileForm.value).subscribe(
      (userResponse) => {
        this.userResponse = userResponse;
        this.openSnackBarGreen('Cadastro efetuado com sucesso!', 'Fechar');
        this.router.navigate(['/login']);
      },
      (serverError) => {
        this.errorMessageUser = serverError.error.non_field_errors;
        this.openSnackBarRed('Erro ao criar usuário!', 'Fechar');
      }
    );
  }
  cancel() {
    this.router.navigate(['']);
  }
}