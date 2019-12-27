import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShowsComponent } from './shows/shows.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

/* defines the root module, named AppModule, that tells Angular
   how to assemble the application. Initially declares only the
   AppComponent. As you add more components to the app, they must
   be declared here.
*/

@NgModule({
  declarations: [
    AppComponent,
    ShowsComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
