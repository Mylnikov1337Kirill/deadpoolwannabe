import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule
} from '@angular/material';

import {
  LayoutComponent,
  HeaderComponent
} from './components';

import {
  MainPageComponent,
  NotFoundPageComponent,
  FavouritesPageComponent
} from './pages';

import {
  AuthService,
  ApiService,
  StateService,
  LocalStorageService
} from './services';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    MainPageComponent,
    FavouritesPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule
  ],
  providers: [
    AuthService,
    ApiService,
    StateService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
