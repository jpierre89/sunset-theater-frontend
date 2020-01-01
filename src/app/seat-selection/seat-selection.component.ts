import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  showID: number;

  constructor(
     // ActivatedRoute holds information about the route to this instance, such as parameters extracted from the URL.
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    /* gets showID from route parammap
     * route.snapshot is a static image of the route information shortly after the component is created.
     * paramMap is a dictionary of route parameters extracted from the URL */
    this.showID = +this.route.snapshot.paramMap.get('id');
  }

}
