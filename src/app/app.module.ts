/* angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* components */
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { CartComponent } from './cart/cart.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogInErrorDialogComponent } from './log-in-error-dialog/log-in-error-dialog.component';

/* services */
import { TheaterApiService } from './_services/theater-api.service';

/* pipes */
import { TimePipe } from './pipes/time.pipe';

/* ngx-boostrap */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReactiveFormsModule } from '@angular/forms';

/* interceptors */
import { JwtInterceptor } from './_common/jwt-interceptor';
import { ErrorInterceptor } from './_common/error-interceptor';

import { MatDialogModule } from '@angular/material/dialog';

/* defines the root module, named AppModule, that tells Angular
   how to assemble the application. */

/* metadata for app */
@NgModule({
  /* declare components that app moduele uses: every component is declared in exactly one NgModule */
  declarations: [
    AppComponent,
    NavBarComponent,
    NowPlayingComponent,
    DatePickerComponent,
    TimePipe,
    SeatSelectionComponent,
    CartComponent,
    LogInComponent,
    RegistrationComponent,
    LogInErrorDialogComponent,
  ],
  /* external modules used by app module */
  imports: [
      /* ngx-bootstrap  */
      BsDatepickerModule.forRoot(),
      ButtonsModule.forRoot(),
      CollapseModule.forRoot(),

      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,

      MatDialogModule,
    ],
  /* injectables */
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TheaterApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
