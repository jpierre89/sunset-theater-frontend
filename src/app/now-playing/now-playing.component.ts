import { Component, OnInit } from '@angular/core';
import {TheaterApiService} from '../_services/theater-api.service';

import {ShowModel} from '../_models/show.model';
import {MovieOnDate} from '../_models/movie-on-date';
import {FormControl} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {jwtToken} from '../_models/jwtToken';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.html',
  styleUrls: ['./now-playing.css']
})
/** displays all show times for a specified date, organized by MovieModel Title. Default current date */
export class NowPlayingComponent implements OnInit {
  /* local time */
  selectedDate: Date;
  /* shows returned from api for a selected date */
  shows: ShowModel[];
  /* movies returned from api for a selected date */
  movies: MovieOnDate[];
  /* by default movie info hidden */
  movieInfoCollapsed = true;

  constructor(
    /* inject shared instance service (singleton). the parameter both defines a property and identifies
       it as a theaterApiService injection site. */
    private theaterApiService: TheaterApiService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {}

  displayMovieTimes($event): void {
    this.selectedDate = $event;

    this.theaterApiService.getMoviesByDate(this.selectedDate)
      .subscribe(res => this.movies = res);

    this.theaterApiService.getShowsByDate(this.selectedDate)
      .subscribe(res => this.shows = res);
  }

}
