import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {MovieModel} from '../_models/movie.model';
import {ShowModel} from '../_models/show.model';
import {Params} from '@angular/router';
import {MovieOnDate} from '../_models/movie-on-date';
import {SeatModel} from '../_models/seat.model';
import {ReservationDetailModel} from '../_models/reservation-Detail.model';
import {AuditoriumModel} from '../_models/auditorium.model';
import {environment} from '../../environments/environment';

/* When you provide the service at the root level, angular creates a single, shared instance of
   this service and injects it into any class that asks for it. Registering the provider in the
   @Injectable metadata also allows angular to optimize an app by removing service if its not used
   HttpClient.get() returns the body of the response as an untyped JSON object by default.
   Applying optional type specifier, <ClassName[]>, gives typed result object (Angular.io) */

@Injectable({
  providedIn: 'root'
})
export class TheaterApiService {
  private movieUrl = `${ environment.apiUrl }/movie`;
  private showUrl = `${ environment.apiUrl }/show`;
  private auditoriumUrl = `${ environment.apiUrl }/auditorium`;
  private showSeatingUrl = `${ environment.apiUrl }/show/seating`;
  private seatAvailabilityUrl = `${ environment.apiUrl }/seat/reserved`;
  private showsByDateUrl = `${ environment.apiUrl }/shows/date`;
  private moviesByDateUrl = `${ environment.apiUrl }/movies/date`;
  private allMoviesUrl = `${ environment.apiUrl }/movies/all`;
  private reservationUrl = `${ environment.apiUrl }/reservations`;
  private showsByUserUrl = `${ environment.apiUrl }/reservations/user/shows`;

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

  /**
   * GET auditoriumModel
   * @param id - id of auditorium
   */
  getAuditorium(id: number): Observable<AuditoriumModel> {
    const url = `${this.auditoriumUrl}`;
    let params = new HttpParams();
    params = params.append('auditorium_id', String(id));

    return this.http.get<AuditoriumModel>(url, {params})
      .pipe(catchError(this.handleError<AuditoriumModel>(`getAuditorium id=${id}`)));
  }

  /** GET ShowModel
   * @param id - id number of show
   */
  getShow(id: number): Observable<ShowModel> {
    /* construct request url with id */
    const url = `${this.showUrl}`;
    let params = new HttpParams();
    params = params.append('show_id', String(id));

    return this.http.get<ShowModel>(url, {params})
      .pipe(catchError(this.handleError<ShowModel>(`getShow id=${id}`)));
  }

  /** GET all movies */
  getAllMovies(): Observable<any> {
    const url = `${ this.allMoviesUrl }`;

    return this.http.get(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('getAllMovies')));
  }

  /** GET MovieModel
   * @param id - id number of movie
   */
  getMovie(id: number): Observable<any> {
    const url = `${ this.movieUrl }`;
    let params = new HttpParams();
    params = params.append('movie_id', String(id));

    /* expects single movie response from server */
    return this.http.get(url, {params})
      .pipe(catchError(this.handleError<MovieModel>(`getMovie id=${ id }`)));
  }

  /** GET SeatModel given show id
   * @param id - id number of show
   */
  getShowSeating(id: number): Observable<SeatModel[]> {
    const url = `${ this.showSeatingUrl }`;
    let params = new HttpParams();
    params = params.append('show_id', String(id));

    return this.http.get<SeatModel[]>(url, {params})
      .pipe(catchError(this.handleError<SeatModel[]>(`getShowSeating id=${ id }`)));
  }

  /** GET seat availability for a show
   * @param seatId - id of seat
   * @param showId = id of show
   */
  getSeatAvailability(seatId: number, showId: number): Observable<boolean> {
    const url = `${ this.seatAvailabilityUrl }`;
    let params = new HttpParams();
    params = params.append('seat_id', String(seatId));
    params = params.append('show_id', String(showId));

    return this.http.get<boolean>(url, {params})
      .pipe(catchError(this.handleError<boolean>(`getSeatAvailability seat_id=${ seatId }, show_id=${ showId }`)));
  }

  /**
   *  GET all shows a user has reservations for
   */
  getShowsByUser(): Observable<ShowModel[]> {
    const url = `${ this.showsByUserUrl }`;
    return this.http.get<ShowModel[]>(url)
      .pipe(catchError(this.handleError<ShowModel[]>(`Unable to get shows from server`)));

  }

  /**
   * GET current user reservations
   */
  getReservations(): Observable<ReservationDetailModel[]> {
    const url = `${ this.reservationUrl }`;
    return this.http.get<ReservationDetailModel[]>(url)
      .pipe(catchError(this.handleError<ReservationDetailModel[]>(`Unable to get reservations from server`)));
  }

    /** GET show times for a specified Date
   *  @param date - Date for request
   */
  getShowsByDate(date: Date): Observable<ShowModel[]> {
      const params = this.constructDateParam(date);

      return this.http.get<ShowModel[]>(this.showsByDateUrl, {params})
        .pipe(catchError(this.handleError<ShowModel[]>('getShowsByDate')));
  }

  /** GET movies for a specified Date
   *  @param date - Date for request
   */
  getMoviesByDate(date: Date): Observable<MovieOnDate[]> {
      const params = this.constructDateParam(date);

      return this.http.get<MovieOnDate[]>(this.moviesByDateUrl, {params})
        .pipe(catchError(this.handleError<MovieOnDate[]>('getMoviesOnDate')));
  }

  /** POST reservation
   * @param showID = id of selected show
     @param seatIDs - list of ids for selected seats
   */
  reserveSeats(showID: number, seatIDs: number[]): Observable<any> {
    const url = `${ this.reservationUrl }`;

    let params = new HttpParams();
    params = params.append('show_id', String(showID));
    for (let id of seatIDs) {
      params = params.append('seat_id', String(id));
    }

    return this.http.post(url, this.httpOptions, {params})
      .pipe(catchError(this.handleError(`reserveSeat, show id=${ showID }, seat ids=${ seatIDs.toString() }`)));
  }

  /** DELETE reservation
   * @param reservationId
   */
    removeReservation(reservationId: number): Observable<any> {
      const url = `${ this.reservationUrl }`;
      let params = new HttpParams();
      params = params.append('reservation_id', String(reservationId));

      return this.http.delete(url, {params})
        .pipe(catchError(this.handleError(`removeReservation, reservation id=${ reservationId }`)));
  }

}
