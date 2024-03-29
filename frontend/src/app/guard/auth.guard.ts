import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isUserLoggedIn();
  }

  public isUserLoggedIn(): boolean {
    if (this.authService.isUserLoggedIn()) {
      console.log("User logged in");
      return true;
    }

    this.router.navigateByUrl('/login');
    console.log("User NOT logged in");
    return false;
  }
}
