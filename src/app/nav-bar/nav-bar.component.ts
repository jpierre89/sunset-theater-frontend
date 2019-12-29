import { Component, OnInit } from '@angular/core';

// nav bar always present at top of application

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'Sunset Theater';

  constructor() { }

  ngOnInit() {
  }

}
