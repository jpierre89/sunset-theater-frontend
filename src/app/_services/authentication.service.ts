import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {jwtToken} from '../_models/jwtToken';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

/**
 * - The authentication service is used to login & logout of the Angular app,
 * it notifies other components when the user logs in & out, and allows
 * access the currently logged in user.
 * - RxJS Subjects and Observables are used to store the current user object
 * and notify other components when the user logs in and out of the app.
 * Angular components can subscribe() to the public currentUser: Observable
 * property to be notified of changes, and notifications
 * are sent when the this.currentUserSubject.next() method is called in the
 * login() and logout() methods, passing the argument to each subscriber.
 * - The RxJS BehaviorSubject is a special type of Subject that keeps hold of the
 * current value and emits it to any new subscribers as soon as they subscribe,
 * while regular Subjects don't store the current value and only emit values
 * that are published after a subscription is created.
 * credit to jasonwatmore.com
 */

class RefreshResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessUrl = `${ environment.apiUrl }/access`;
  private registrationUrl = `${ environment.apiUrl }/registration`;
  private refreshUrl = `${ environment.apiUrl }/refresh`;

  private currentUserSubject: BehaviorSubject<jwtToken>;
  public currentUser: Observable<jwtToken>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<jwtToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): jwtToken {
    return this.currentUserSubject.value;
  }

  register(email: string, password: string, firstName: string, lastName: string) {
    let params = new HttpParams();
    params = params.append('email', String(email));
    params = params.append('password', String(password));
    params = params.append('first_name', String(firstName));
    params = params.append('last_name', String(lastName));
    return this.http.post<any>(this.registrationUrl, params);
  }

  /* if response is 401, ErrorInterceptor handles */
  login(email: string, password: string) {
    let params = new HttpParams();
    params = params.append('username', String(email));
    params = params.append('password', String(password));
    return this.http.post<any>(this.accessUrl, params)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    // notify all subscribers that user has logged out
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
