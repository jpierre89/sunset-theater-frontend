import { Component, OnInit } from '@angular/core';
import {TheaterApiService} from '../theater-api.service';
import {Show} from '../show';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.html',
  styleUrls: ['./now-playing.css']
})
/** displays all show times for a specified date, organized by Movie Title.
 *  will default to current date
 */
export class NowPlayingComponent implements OnInit {
  /* user selected date */
  selectedDate: Date;

  /* list of shows on a single selected date */
  shows: Show[];

  constructor(
    /* inject the shared instance of theaterApiService (singleton).
       the parameter both defines a private theaterApiService property and identifies
       it as a theaterApiService injection site. */
    private theaterApiService: TheaterApiService
  ) { }

  ngOnInit(
    // TODO this.selectedDate = default date, updateMovieTimes(this.selectedDate)
  ) {
  }

  updateMovieTimes($event) {
    /* if the selected date is unchanged, do not update movie times.
       Note: Seems as though two events are emitted on single calendar change, so this
       also protects against double update on a single user date selection */
    // TODO check null

    if ($event === this.selectedDate) {
      return;
    }

    this.selectedDate = $event;

    /* service uses asynchronous call to server, component wont wait for the response the
       subscribe method() passes the emitted array to the callback, which sets this.shows */
    this.theaterApiService.getShowsByDate(this.selectedDate)
      .subscribe(shows => this.shows = shows);

    alert(this.selectedDate); // Test: verification of Date received

    // TODO
  }

}
