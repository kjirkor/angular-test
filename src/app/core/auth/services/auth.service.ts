import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = 
      new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') as string)); //set from local/session storage
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logIn(username: string, password: string) {
    // return this.http.post<User>('[url]', { 
    //   //data 
    // }, { observe: 'response' })
    // .pipe(map(resp => {
    //   var user = resp.body
    //   this.storeTokens(user)
    //   return user;
    // }))

    return of(true)
  }

  forgotPassword(username: string, phoneNumber: string) {
    return of(true)
  }

  changePassword(password: string){
    // return this.http.post<any>('[url]', { 
    //   //data
    //  }, { observe: 'response' })
    // .pipe(map(resp => {
    //   var user = resp.body
    //   this.storeTokens(user)
    //   return resp;
    // }))

    return of(true)
  }

  isLoggedIn(){
    return true
  }

  getUserRoles(){
    return ['example_role'];
  }

  refreshToken() {
    return this.http.post<any>('[url]', {
      //data
    }).pipe(
      tap(resp => { 
        this.storeTokens(resp)
      })
    )
  }

  storeTokens(user: User) {
    if (user && user.access_token) {
      //store in local/session storage
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  logout(){
    //revoke access token    
    this.http.get('[url]').subscribe()

    //clear local/session storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as any);
  }
}
