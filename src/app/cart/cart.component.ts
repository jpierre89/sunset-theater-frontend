import { Component, OnInit } from '@angular/core';
import {TheaterApiService} from '../theater-api.service';
import {Reservation} from '../models/reservation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  reservation;

  constructor(
    private theaterApiService: TheaterApiService
  ) {

  }

  ngOnInit() {
    this.getReservations()
  }

  // TODO request all reservations from api for current user and display
  getReservations() {

  }

}
