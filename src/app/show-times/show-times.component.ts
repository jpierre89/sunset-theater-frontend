import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-times',
  templateUrl: './show-times.component.html',
  styleUrls: ['./show-times.component.css']
})
/** displays movie show times for a user specified date.
 *  Default show times based on current date
 */
export class ShowTimesComponent implements OnInit {
  selectedDate = Date;

  constructor() { }

  ngOnInit() {
  }

  updateShowTimes($event) {
    /* if the selected date is unchanged, do not update show times.
    *  Note: Seems as though two events are emitted on single calendar change, so this
    *  also protects against double update on a single user date selection */
    if ($event === this.selectedDate) {
      return;
    }

    this.selectedDate = $event;

    alert($event); // Test: verification of Date received

    // TODO
  }

}
