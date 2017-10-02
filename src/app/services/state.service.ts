import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { LS_FAV_COMICS_LIST, LS_FAV_CHARACTERS_LIST } from '../utility/consts';

import R from 'ramda';

@Injectable()
export class StateService {

  private state = {
    favComics: {},
    favCharacters: {},
    cachedComics: {},
    cachedCharacters: {}
  };

  private initFavList(name, list): void {
    if (!R.isNil(list)) {
      R.forEachObjIndexed((it) => this[name] = it, list);
    }
  }

  private initCachedList(name, list): void {
    if (!R.isNil(list)) {
      R.forEachObjIndexed((it) => this[name] = it, list);
    }
  }

  private isFavorite(list, id): boolean {
    return R.has(id, this.state[list]);
  }

  set favComics(data) {
      this.isComicsFavorite(R.path(['id'], data))
        ? this.state.favComics = R.omit([R.toString(R.path(['id'], data))], this.state.favComics)
        : this.state.favComics = { ...this.state.favComics, ...{[R.path(['id'], data)]: data} };
      LocalStorageService.setItem(LS_FAV_COMICS_LIST, this.favComics);

  }

  set favCharacters(data) {
    this.isCharacterFavorite(R.path(['id'], data))
      ? this.state.favCharacters = R.omit([R.toString(R.path(['id'], data))], this.state.favCharacters)
      : this.state.favCharacters = { ...this.state.favCharacters, ...{[R.path(['id'], data)]: data} };
    LocalStorageService.setItem(LS_FAV_CHARACTERS_LIST, this.favCharacters);
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
