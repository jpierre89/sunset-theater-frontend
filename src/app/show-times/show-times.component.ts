import { Component, OnInit } from '@angular/core';

/* displays movie show times for a user specified date.
   Default show times based on current date  */

@Component({
  selector: 'app-show-times',
  templateUrl: './show-times.component.html',
  styleUrls: ['./show-times.component.css']
})
export class ShowTimesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
