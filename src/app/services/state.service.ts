import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { LS_FAV_COMICS_LIST, LS_FAV_CHARACTERS_LIST, LS_CACHED_CHARACTERS_LIST, LS_CACHED_COMICS_LIST } from '../utility/consts';

import R from 'ramda';

const prepare_id = (data) => R.toString(R.path(['id'], data));

@Injectable()
export class StateService {

  private state = {
    favComics: {},
    favCharacters: {},
    cachedComics: {},
    cachedCharacters: {}
  };

  private fillStateList(name, list): void {
    if (!R.isNil(list)) {
      R.forEachObjIndexed((it) => this[name] = {[it.id]: it}, list);
    }
  }

  private isFavorite(list, id): boolean {
    return R.has(id, this.state[list]);
  }

  set favComics(data) {
    const id = prepare_id(data);

    this.isComicsFavorite(id)
      ? this.state.favComics = R.omit([id], this.state.favComics)
      : this.state.favComics = { ...this.state.favComics, ...{[id]: data} };
    LocalStorageService.setItem(LS_FAV_COMICS_LIST, this.favComics);
  }

  set favCharacters(data) {
    const id = prepare_id(data);

    this.isCharacterFavorite(id)
      ? this.state.favCharacters = R.omit([id], this.state.favCharacters)
      : this.state.favCharacters = { ...this.state.favCharacters, ...{[id]: data} };
    LocalStorageService.setItem(LS_FAV_CHARACTERS_LIST, this.favCharacters);
  }

  set cachedCharacters(data) {
    this.state.cachedCharacters = { ...this.cachedCharacters, ...data };
    LocalStorageService.setItem(LS_CACHED_CHARACTERS_LIST, this.cachedCharacters);
  }

  set cachedComics(data) {
    this.state.cachedComics = { ...this.cachedComics, ...data };
    LocalStorageService.setItem(LS_CACHED_COMICS_LIST, this.cachedComics);
  }

  get cachedCharacters() {
    return this.state.cachedCharacters;
  }

  get cachedComics() {
    return this.state.cachedComics;
  }

  get favComics() {
    return this.state.favComics;
  }

  get favCharacters() {
    return this.state.favCharacters;
  }

  getCachedCharacter(id) {
    return this.cachedCharacters[id];
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
    this.fillStateList('favComics', list);
  }

  initCharactersFavList(list): void {
    this.fillStateList('favCharacters', list);
  }

  initComicsCachedList(list): void {
    this.fillStateList('cachedComics', list);
  }

  initCharactersCachedList(list): void {
    this.fillStateList('cachedCharacters', list);
  }
}
