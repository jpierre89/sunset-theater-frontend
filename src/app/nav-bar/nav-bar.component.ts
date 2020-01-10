import { Component, OnInit } from '@angular/core';
import {UserModel} from '../_models/user.model';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'Sunset Theater';
  currentUser: UserModel;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(res => this.currentUser = res);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

}
