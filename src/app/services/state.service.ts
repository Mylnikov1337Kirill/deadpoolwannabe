import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { LS_FAV_COMICS_LIST, LS_FAV_CHARACTERS_LIST } from '../utility/consts';

import R from 'ramda';

@Injectable()
export class StateService {

  private state = {
    favComics: new Set(),
    favCharacters: new Set(),
    cachedComics: {},
    cachedCharacters: {}
  };

  private initFavList(name, list): void {
    if (!R.isNil(list)) {
      R.forEach((it) => this[name] = it, list);
    }
  }

  private isFavorite(list, id): boolean {
    return this.state[list].has(id);
  }

  set favComics(id) {
      this.isComicsFavorite(id)
        ? this.state.favComics.delete(id)
        : this.state.favComics.add(id);
      LocalStorageService.setItem(LS_FAV_COMICS_LIST, Array.from(this.favComics));
  }

  set favCharacters(id) {
    this.isCharacterFavorite(id)
      ? this.state.favCharacters.delete(id)
      : this.state.favCharacters.add(id);
    LocalStorageService.setItem(LS_FAV_CHARACTERS_LIST, Array.from(this.favCharacters));
  }

  get favComics() {
    return this.state.favComics;
  }

  get favCharacters() {
    return this.state.favCharacters;
  }

  setCachedCharacter(cache) {
    this.state.cachedCharacters = { ...this.state.cachedCharacters, ...cache };
  }

  getCachedCharacter(id) {
    return this.state.cachedCharacters[id];
  }

  setCachedComics(cache) {
    this.state.cachedComics = { ...this.state.cachedComics, ...cache };
  }

  getCachedComics(id) {
    return this.state.cachedComics[id];
  }

  isCharacterFavorite(id): boolean {
    return this.isFavorite('favCharacters', +id);
  }

  isComicsFavorite(id): boolean {
    return this.isFavorite('favComics', +id);
  }

  initComicsFavList(list): void {
    this.initFavList('favComics', list);
  }

  initCharactersFavList(list): void {
    this.initFavList('favCharacters', list);
  }

}
