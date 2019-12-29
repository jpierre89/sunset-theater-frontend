import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShowTimesComponent } from './show-times/show-times.component';
import { DatePickerComponent } from './date-picker/date-picker.component';


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
    ShowTimesComponent,
    DatePickerComponent,
  ],
  /* external modules for app */
  imports: [
    BrowserModule,
    AppRoutingModule,

    /* Angular Material */
    BrowserAnimationsModule,
    AngularMaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
