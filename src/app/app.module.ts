import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule,
  MdIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatListModule
} from '@angular/material';

import {
  LayoutComponent,
  HeaderComponent,
  ComicsCardComponent,
  ComicsListComponent,
  DetailsComponent,
  ComicsDetailsComponent,
  CharacterDetailsComponent
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
    ComicsCardComponent,
    DetailsComponent,
    ComicsDetailsComponent,
    CharacterDetailsComponent,
    ComicsListComponent,
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
    MdSelectModule,
    MdIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule
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
