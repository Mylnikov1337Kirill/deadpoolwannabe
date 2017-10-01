import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { LS_FAV_COMICS_LIST, LS_FAV_CHARACTERS_LIST } from '../utility/consts';

import R from 'ramda';

@Injectable()
export class StateService {

  private state = {
    favComics: new Set(),
    favCharacters: new Set()
  };

  set favComics(id) {
      this.isComicsFavorite(id)
        ? this.state.favComics.delete(id)
        : this.state.favComics.add(id);
      LocalStorageService.setItem(LS_FAV_COMICS_LIST, Array.from(this.favComics));
  }

  get favComics() {
    return this.state.favComics;
  }

  set favCharacters(id) {
    this.isCharacterFavorite(id)
      ? this.state.favCharacters.delete(id)
      : this.state.favCharacters.add(id);
    LocalStorageService.setItem(LS_FAV_CHARACTERS_LIST, Array.from(this.favCharacters));
  }

  get favCharacters() {
    return this.state.favCharacters;
  }

  isCharacterFavorite(id) {
    return this.isFavorite('favCharacters', id);
  }

  isComicsFavorite(id) {
    return this.isFavorite('favComics', id);
  }

  isFavorite(list, id): boolean {
    return this.state[list].has(id);
  }

  initComicsFavList(list): void {
    this.initFavList('favComics', list);
  }

  initCharactersFavList(list): void {
    this.initFavList('favCharacters', list);
  }

  initFavList(name, list): void {
    if (!R.isNil(list)) {
      R.forEach((it) => this[name] = it, list);
    }
  }
}
