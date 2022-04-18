import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    //check if user is authenticated
    if (this.authService.isLoggedIn()) {
      
      // check if route is restricted by role, and check if user has atleast one of the required roles/claims
      if (route.data['roles'] && route.data['roles'].filter((value : any) => this.authService.getUserRoles().includes(value)).length === 0) {
        // role not authorised so redirect to home page
        this.router.navigate(['/auth/log-in']);
        return false;
      }
      return true;
    }

    // User is not authenticated
    this.router.navigate(['/auth/log-in']);
    return false;
  }
}
