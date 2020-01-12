import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TheaterApiService} from '../_services/theater-api.service';
import {SeatModel} from '../_models/seat.model';
import {Row} from '../_models/row';
import {ReservationDetailModel} from '../_models/reservation-Detail.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  // contains selected seats from user before reservation is made
  selectedSeats: SeatModel[];
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
    this.selectedSeats = new Array<SeatModel>();
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

  getSeatAvailability(seat: SeatModel) {
    this.theaterApiService.getSeatAvailability(seat.id, this.showID)
      .subscribe(isReserved => seat.isReserved = isReserved)
  }

  /* transforms sorted list of seats from API into rows for display
  * A1, A2, B1, B2, ...  ->  A1, A2
  *                          B1, B2
  */
  createRows(seats: SeatModel[]): void {
    let lastRowName = '';
    for (const seat of seats) {
      let newRowName = seat.number.slice(0,1);
      if (newRowName != lastRowName) {
        const row = new Row();
        this.rows.push(row);
        lastRowName = newRowName;
      }
      // cannot use -1 to reference last elem
      this.rows[this.rows.length - 1].seats.push(seat);

      // get seat availability
      this.getSeatAvailability(seat);
    }
  }

  reserveSeats() {
    if (this.selectedSeats.length < 1) {
      return;
    }

    // construct list of seat ids for reservation
    let reserveIds = new Array<number>();
    for (let seat of this.selectedSeats) {
      reserveIds.push(seat.id);
    }

    this.theaterApiService.reserveSeats(this.showID, reserveIds)
      .subscribe(res => this.processResponse(res))
  }

  processResponse(reservations: ReservationDetailModel[]) {
    // if reservation went through
    this.router.navigate(['/cart']);
    // TODO: else display selection failed.
  }

  /**
   * @param seatId of seat to add
   * Does not add seat if seat already exists
   */
  addSeat(seat: SeatModel) {
    if (seat.isReserved) {
      return;
    }

    const index = this.selectedSeats.indexOf(seat, 0);
    if (index > -1) {
      return;
    }

    this.selectedSeats.push(seat)
  }

  removeSeat(seat: SeatModel) {
    const index = this.selectedSeats.indexOf(seat, 0);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    }
  }

  clearSeats() {
    this.selectedSeats = new Array<SeatModel>();
  }

  isSelected(seat: SeatModel): boolean {
    const index = this.selectedSeats.indexOf(seat, 0);
    if (index > -1) {
      return true;
    }
    return false;
  }
}
