/**
 * The Error Interceptor intercepts http responses from the api to check if there were any errors.
 * If there is a 401 Unauthorized response the user is automatically logged out of the application,
 * all other errors are re-thrown up to the calling service so an alert with the error can be displayed on the screen.
 * custom interceptor to catch all error responses from the server in a single location.
 */
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status == 401) {
        alert("error interceptor logging out");
        this.authenticationService.logout();
        // TODO deprecated
        location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}