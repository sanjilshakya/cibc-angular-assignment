import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as components from './components';
import * as services from './services';

@NgModule({
  declarations: [
    AppComponent,
    components.TransactionListComponent,
    components.TransactionDetailComponent,
    components.NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    services.TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
