import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as components from './components';
import * as services from './services';
import { HttpClientModule } from '@angular/common/http';
import { icons } from './constants/icon.constant'


@NgModule({
  declarations: [
    AppComponent,
    components.TransactionListComponent,
    components.TransactionDetailComponent,
    components.NotFoundComponent,
    components.LoaderComponent,
    components.ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxBootstrapIconsModule.pick(icons)
  ],
  providers: [
    services.HttpService,
    services.TransactionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
