import { forwardRef, Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {LS_FAV_COMICS_LIST, LS_FAV_CHARACTERS_LIST, LS_CACHED_COMICS_LIST, LS_CACHED_CHARACTERS_LIST} from '../utility/consts';
import { LocalStorageService } from './storage.service';
import { StateService } from './state.service';

/*
 Service is dealing with initial app state
*/
@Injectable()
export class AuthService implements CanActivate {

  constructor(
    @Inject(forwardRef(() => StateService)) private state: StateService
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
              routerstate: RouterStateSnapshot): boolean {

    this.state.initComicsFavList(LocalStorageService.getItem(LS_FAV_COMICS_LIST));
    this.state.initCharactersFavList(LocalStorageService.getItem(LS_FAV_CHARACTERS_LIST));
    this.state.initComicsCachedList(LocalStorageService.getItem(LS_CACHED_COMICS_LIST));
    this.state.initCharactersCachedList(LocalStorageService.getItem(LS_CACHED_CHARACTERS_LIST));
    return true;
  }
}
