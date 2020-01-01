import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

/* services */
import {TheaterApiService} from './theater-api.service';
import { TimePipe } from './time.pipe';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { CartComponent } from './cart/cart.component';

/* ngx-boostrap */
import {BsDatepickerModule} from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

/* defines the root module, named AppModule, that tells Angular
   how to assemble the application. Initially declares only the
   AppComponent. As you add more components to the app, they must
   be declared here */

/* metadata for app */
@NgModule({
  /* declare components that app needs: every component declared in exactly one NgModule */
  declarations: [
    AppComponent,
    NavBarComponent,
    NowPlayingComponent,
    DatePickerComponent,
    TimePipe,
    SeatSelectionComponent,
    CartComponent,
  ],
  /* external modules for app */
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // TODO needed?

    /* ngx-bootstrap  */
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),

  ],
  providers: [TheaterApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
