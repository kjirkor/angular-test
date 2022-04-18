import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService, private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.access_token;    
    if(isLoggedIn) {
      req = this.addToken(req, currentUser.access_token)
    }
    return next.handle(req).pipe(catchError(error => {

      // We don't want to refresh token for some requests like login or refresh token itself
      // So we verify url and we throw an error if it's the case
      if (
        req.url.endsWith("[backend refresh token url]") ||  //refresh
        req.url.endsWith("[backend login url]")           //login 
      ) {
        // We do another check to see if refresh token failed
        // In this case we want to logout user and to redirect it to login page
        if (req.url.endsWith("[backend refresh token url]")) {
          this.authService.logout();
          this.router.navigateByUrl("");
        }
        return throwError(() => error);
      }

      if (error.status === 401) { //if token expired (or other 401), try again
        return this.handle401Error(req, next); 
      } else {
        return throwError(() => error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      return this.authService.refreshToken().pipe(
        switchMap((res: User) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(res.access_token);
          return next.handle(this.addToken(request, res.access_token));
        }));
  
    } else {
      return this.refreshTokenSubject.pipe(
        filter(access_token => access_token != null),
        take(1),
        switchMap(access_token => {
          return next.handle(this.addToken(request, access_token));
        }));
    }
  }
}
