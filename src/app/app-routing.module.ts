import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ShowTimesComponent} from './show-times/show-times.component';

/* best practice to load and configure the router in separate, top level
 module that is dedicated to routing and imported from the root AppModule.
 By convention, the module class name is AppRoutingModule and it belongs in the
 app-routing.module.ts in the src/app folder */

/*  routes tell router which view to display when user goes to url.
    path: a string that matches the url in the browser address bar
    component: the component that the router should create when navigating to this route  */
const routes: Routes = [
  /* parameterized route example { path: 'detail/:id', component: SomeComponent} */
  /* this path redirects a URL that fully matches the empty path */
  { path: '', redirectTo: '/show-times', pathMatch: 'full'},
  { path: 'show-times', component: ShowTimesComponent },
];

/* metadata initializes router and starts it listening for browser location changes */
@NgModule({
  declarations: [],
  imports: [
    /* this line adds RouterModule to the AppRoutingModule imports array and configures it
       with the routes in one stop by calling RouterModule.forRoot()  */
    RouterModule.forRoot(routes),
    // CommonModule
  ],
  exports: [
    /* exports the RouterModule so it will be available throughout the app */
    RouterModule
  ]
})
export class AppRoutingModule { }
