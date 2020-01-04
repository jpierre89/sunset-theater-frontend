import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TheaterApiService} from '../theater-api.service';
import {Seat} from '../models/seat';
import {Row} from '../models/row';
import {Reservation} from '../models/reservation';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  // holds currently selected seats from user
  selectedSeats: number[];
  showID;
  /* rows in auditorium for show */
  rows: Row[];


  constructor(
    // ActivatedRoute holds information about the route to this instance, such as parameters extracted from the URL.
    private route: ActivatedRoute,
    private theaterApiService: TheaterApiService,
    public router: Router
  ) {
    this.rows = new Array<Row>();
    this.selectedSeats = new Array<number>();
  }



  ngOnInit() {
    /* gets showID from route parammap
     * route.snapshot is a static image of the route information shortly after the component is created.
     * paramMap is a dictionary of route parameters extracted from the URL
     */
    this.showID = +this.route.snapshot.paramMap.get('show-id');
    this.getSeating();
  }

  getSeating() {
    this.theaterApiService.getShowSeating(this.showID)
      .subscribe(seats => this.createRows(seats));
  }

  /* transforms sorted list of seats from API into rows for display
  * A1, A2, B1, B2, ...  ->  A1, A2
  *                          B1, B2
  */
  createRows(seats: Seat[]): void {
    let lastRowName = '';
    for (const seat of seats) {
      let newRowName = seat.number.slice(0,1);
      if (newRowName != lastRowName) {
        const row = new Row();
        this.rows.push(row);
        lastRowName = newRowName;
      }
      // note - cannot use -1 to reference last elem
      this.rows[this.rows.length - 1].seats.push(seat);
    }
  }

  reserveSeats() {
    this.theaterApiService.reserveSeats(this.showID, this.selectedSeats)
      .subscribe(res => this.processResponse(res))
  }

  processResponse(reservations: Reservation[]) {
    // if reservation went through
    this.router.navigate(['/cart']);
    // TODO: else display selection failed.
  }

  /**
   * @param seatId of seat to add
   * Does not add seat if seat already exists
   */
  addSeat(seatId: number) {
    const index = this.selectedSeats.indexOf(seatId, 0);
    if (index > -1) {
      return;
    }
    this.selectedSeats.push(seatId)
  }

  removeSeat(seatId: number) {
    const index = this.selectedSeats.indexOf(seatId, 0);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    }
  }

  clearSeats() {
    this.selectedSeats = new Array<number>();
  }
}
