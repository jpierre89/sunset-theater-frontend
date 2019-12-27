import { Component } from '@angular/core';

// defines logic for app's root component, named AppCompoment
// The view associated with this root component be becomes the
// root of the view hierarchy as you add components and services
// to your application (angular.io).

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Theater';
}
