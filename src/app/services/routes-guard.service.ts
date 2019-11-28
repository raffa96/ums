import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class RoutesGuardService implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
    if (this.auth.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
