import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';
//import { ConsultaComponent } from './shared/consulta/consulta.component';
import { RegisterComponent } from './shared/register/register.component';
import { AuthGuard } from './core/auth/auth.guard';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'home', component: HomeComponent}],
    canActivate: [AuthGuard],
  },


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
