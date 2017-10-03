import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule,
  MdIconModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatExpansionModule
} from '@angular/material';

import {
  LayoutComponent,
  HeaderComponent,
  ComicsCardComponent,
  ComicsListComponent,
  DetailsComponent,
  ComicsDetailsComponent,
  CharacterDetailsComponent,
  FavoriteToggleComponent
} from './components';

import {
  MainPageComponent,
  NotFoundPageComponent,
  FavoritesPageComponent
} from './pages';

import {
  AuthService,
  ApiService,
  StateService,
  LocalStorageService,
  MemoizeService
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
    FavoriteToggleComponent,
    MainPageComponent,
    FavoritesPageComponent,
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
    MatInputModule,
    MdIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ApiService,
    StateService,
    LocalStorageService,
    MemoizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
