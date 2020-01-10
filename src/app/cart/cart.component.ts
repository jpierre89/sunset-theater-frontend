import { Component, OnInit } from '@angular/core';
import {TheaterApiService} from '../_services/theater-api.service';
import {ReservationDetailModel} from '../_models/reservation-Detail.model';
import {ShowModel} from '../_models/show.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  /* all reservations by the user.
  *  initialized for template if/else statement */
  reservations: ReservationDetailModel[] = new Array<ReservationDetailModel>();

  constructor(
    private theaterApiService: TheaterApiService
  ) {}

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.theaterApiService.getReservations()
      .subscribe(res => this.reservations = res);
  }

  removeReservation(reservationID: number) {
    this.theaterApiService.removeReservation(reservationID)
      .subscribe(res => this.getReservations())
  }
}
