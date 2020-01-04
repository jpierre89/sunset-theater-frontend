import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Movie} from './models/movie';
import {Show} from './models/show';
import {Params} from '@angular/router';
import {MovieOnDate} from './models/movie-on-date';
import {Seat} from './models/seat';
import {Reservation} from './models/reservation';

/* When you provide the service at the root level, angular creates a single, shared instance of
   this service and injects it into any class that asks for it. Registering the provider in the
   @Injectable metadata also allows angular to optimize an app by removing service if its not used
   HttpClient.get() returns the body of the response as an untyped JSON object by default.
   Applying optional type specifier, <ClassName[]>, gives typed result object (Angular.io) */

@Injectable({
  providedIn: 'root'
})
export class TheaterApiService {
  private baseUrl = 'http://127.0.0.1:5000';
  private movieUrl = `${ this.baseUrl }/movie`;
  private showUrl = `${ this.baseUrl }/show`;
  private showSeatingUrl = `${ this.baseUrl }/show/seating`;
  private showsByDateUrl = `${ this.baseUrl }/shows/date`;
  private moviesByDateUrl = `${ this.baseUrl }/movies/date`;
  private allMoviesUrl = `${ this.baseUrl }/movies/all`;
  private reservationUrl = `${ this.baseUrl }/reservation`;

  /* api expects special header, GET req doesnt seem to require */
  httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
  ) { }

  /* format date to accepted API format. Does not convert date to UTC as user would
     expect date selected to not change */
  private constructDateParam(date: Date): HttpParams {

    // api requires range 1-12, datepicker month range is 0-11,
    let month: string = (date.getMonth() + 1).toString();
    let day: string = (date.getDate().toString());

    // api requires 2 digit month; datepicker omits 0 prefix
    if (month.length === 1) {
      month = '0' + month;
    }

    // api requires 2 digit date; datepicker omits 0 prefix
    if (day.length === 1) {
      day = '0' + day;
    }

    const dateParam = date.getFullYear() + '-' + month + '-' + day;
    let param = new HttpParams();
    param = param.append('date', dateParam);
    return param;
  }

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


  /** GET Show
   * @param id - id number of show
   */
  getShow(id: number): Observable<Show> {
    /* construct request url with id */
    const url = `${this.showUrl}`;

    let params = new HttpParams();
    params = params.append('show_id', String(id));

    /* expects single show response from server */
    return this.http.get<Show>(url, {params})
      .pipe(catchError(this.handleError<Show>(`getShow id=${id}`)));
  }


  /** GET show times for a specified Date
   *  @param date - Date for request
   */
  getShowsByDate(date: Date): Observable<Show[]> {
      const params = this.constructDateParam(date);

      return this.http.get<Show[]>(this.showsByDateUrl, {params})
        .pipe(catchError(this.handleError<Show[]>('getShowsByDate')));
  }

  /** GET movies for a specified Date
   *  @param date - Date for request
   */
  getMoviesByDate(date: Date): Observable<MovieOnDate[]> {
      const params = this.constructDateParam(date);

      return this.http.get<MovieOnDate[]>(this.moviesByDateUrl, {params})
        .pipe(catchError(this.handleError<MovieOnDate[]>('getMoviesOnDate')));
  }

  /** GET all movies */
  getAllMovies(): Observable<any> {
    const url = `${ this.allMoviesUrl }`;

    return this.http.get(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('getAllMovies')));
  }

  /** GET Movie
   * @param id - id number of movie
   */
  getMovie(id: number): Observable<any> {
    const url = `${ this.movieUrl }`;

    let params = new HttpParams();
    params = params.append('movie_id', String(id));

    /* expects single movie response from server */
    return this.http.get(url, {params})
      .pipe(catchError(this.handleError<Movie>(`getMovie id=${ id }`)));
  }

  /** GET Show Seating
   * @param id - id number of show
   */
  getShowSeating(id: number): Observable<Seat[]> {
    const url = `${ this.showSeatingUrl }`;

    let params = new HttpParams();
    params = params.append('show_id', String(id));

    return this.http.get<Seat[]>(url, {params})
      .pipe(catchError(this.handleError<Seat[]>(`getShowSeating id=${ id }`)));
  }

    /** POST reservation
   * @param showID = id of selected show
     @param seatIDs - list of ids for selected seats
   */
  reserveSeats(showID: number, seatIDs: number[]): Observable<Reservation[]> {
    const url = `${ this.reservationUrl }`;

    let params = new HttpParams();
    params = params.append('show_id', String(showID));
    for (let id of seatIDs) {
      params = params.append('seatID', String(id));
    }

    return this.http.get<Reservation[]>(url, {params})
      .pipe(catchError(this.handleError<Reservation[]>(`reserveSeat, show id=${ showID }, seat ids=${ seatIDs.toString() }`)));
  }

}
