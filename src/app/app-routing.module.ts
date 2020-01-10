import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NowPlayingComponent} from './now-playing/now-playing.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';
import {CartComponent} from './cart/cart.component';
import {LogInComponent} from './log-in/log-in.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthGuard} from './_common/auth.guard';

/* best practice to load and configure the router in a separate, top level
 module that is dedicated to routing and imported from the root AppModule.
 By convention, the module class name is AppRoutingModule and it belongs in the
 app-routing.module.ts in the src/app folder */

/*  routes tell router which view to display when user goes to url.
    path: a string that matches the url in the browser address bar
    component: the component that the router should create when navigating to this route  */
const routes: Routes = [
  { path: 'now-playing', component: NowPlayingComponent, canActivate: [AuthGuard] },
  { path: '', component: NowPlayingComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LogInComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'seat-selection/:show-id', component: SeatSelectionComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},

  /* else redirect to root */
  { path: '**', redirectTo: ''},

  /* this path redirects a URL that fully matches the empty path
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'now-playing', component: NowPlayingComponent }, */
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
