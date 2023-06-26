import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuradService implements CanActivate {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.localStorage.get('Obj')) {
      this.router.navigate(['./auth/login']);
      return false;
    }
    else if (route.data['hasRole'] &&
      route.data['hasRole'] !== this.localStorage.get('Obj').role) {
      this.router.navigate(['./accessdenied']);
      return false;
    }
    return true;
  }
}
