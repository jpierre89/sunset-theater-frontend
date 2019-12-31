import { Component, OnInit } from '@angular/core';
import {TheaterApiService} from '../theater-api.service';

import {Show} from '../models/show';
import {ConversionService} from '../conversion.service';
import {MovieOnDate} from '../models/movie-on-date';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.html',
  styleUrls: ['./now-playing.css']
})
/** displays all show times for a specified date, organized by Movie Title. Default current date */
export class NowPlayingComponent implements OnInit {
  /* holds LOCALTIME */
  selectedDate: Date;
  /* shows returned from api for a selected date */
  shows: Show[];
  /* movies returned from api for a selected date */
  movies: MovieOnDate[];

  constructor(
    /* inject shared instance service (singleton). the parameter both defines a property and identifies
       it as a theaterApiService injection site. */
    private theaterApiService: TheaterApiService,
    private conversionService: ConversionService
  ) { }

  ngOnInit(
    // TODO this.selectedDate = default date, updateMovieTimes(this.selectedDate)
  ) {
  }

  updateMovieTimes($event): void {
    /* if the selected date is unchanged, do not update movie times.
       Note: Seems as though two events are emitted on single calendar change, so this
       also protects against double update on a single user date selection */
    // TODO check null

    if ($event === this.selectedDate) {
      return;
    }

    this.selectedDate = $event;

    this.theaterApiService.getMoviesByDate(this.selectedDate)
      .subscribe(res => this.movies = res);

    this.theaterApiService.getShowsByDate(this.selectedDate)
      .subscribe(res => this.shows = res);
  }

}
