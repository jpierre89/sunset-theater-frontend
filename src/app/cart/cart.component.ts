import { Component, OnInit } from '@angular/core';
import {TheaterApiService} from '../theater-api.service';
import {ReservationDetailModel} from '../models/reservation-Detail.model';
import {ShowModel} from '../models/show.model';

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

}
