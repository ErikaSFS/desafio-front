import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})


export class AuthGuard {
    constructor(private router: Router) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      const token = window.sessionStorage.getItem('token');
  
      if (token) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
  }
