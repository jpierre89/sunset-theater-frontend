import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Movie} from './movie';

/* When you provide the service at the root level, angular creates a single, shared instance of
   this service and injects it into any class that asks for it. Registering the provider in the
   @Injectable metadata also allows angular to optimize an app by removing service if its not used */

@Injectable({
  providedIn: 'root'
})
export class TheaterApiService {
  private baseUrl = '127.0.0.1:4201';
  private movieUrl = `${ this.baseUrl }/movie`;
  private showsByDateUrl = `${ this.baseUrl }/shows/date`;

  /* api expects special header TODO get exluded? */
  httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      /* it takes a type parameter of the type the get request was supposed to receive
         so it can return the safe value as the type that the app expects */

      console.error(error);
      // alert('request failed'); // Test: verification

      /* Let the app keep running by returning an empty result */
      return of(result as T);
    };
  }
  /** GET movie times for a specified Date
   *  @param date - Date for request
   */
  getShowsByDate(date: Date): Observable<any> {
    /* HttpClient.get() returns the body of the response as an untyped JSON object by default.
       Applying the optional type specifier, ex. <ClassName[]>, gives you a typed result object.
       to catch error, you pipe the observable value received through RxJS catchError() operator.
       this operator intercepts an Observable that FAILED. it passes the error an error handler
       that can do what it wants with the error.
       The RxJS tap() operator looks at observable values, does something with them, and passes
       them along untouched. */

    /* construct request url with date */
    const url = `${ this.showsByDateUrl }/${date}`;

    return this.http.get<any>(url).pipe(
        catchError(this.handleError<any>('getShowsByDate'))
      );
  }

  /** GET Movie
   * @param id - id number of movie
   */
  getMovie(id: number): Observable<Movie> {
    /* construct request url with id */
    const url = `${ this.movieUrl }/${id}`;

    /* expects single movie response from server */
    return this.http.get<Movie>(url).pipe(
      catchError(this.handleError<Movie>(`getMovie id=${ id }`))
    );
  }
}
