import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShowTimesComponent } from './show-times/show-times.component';

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
  ],
  /* external modules for app */
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
