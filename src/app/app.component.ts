import { Component, OnInit } from '@angular/core';

/* defines logic for app's root component, named AppCompoment
  The view associated with this root component becomes the
  root of the view hierarchy as you add components and services
  to your application */

@Component({
  /* CSS element selector; matches the name of the HTML element that identifies
     this component whithin a parent component's template */
  selector: 'app-root',
  /* relative location of component's template file */
  templateUrl: './app.component.html',
  /* relative location of the component's private CSS styles */
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Theater';

  ngOnInit(): void {
  }
}
