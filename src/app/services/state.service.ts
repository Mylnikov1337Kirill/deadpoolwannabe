import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { LS_FAV_COMICS_LIST, LS_FAV_CHARACTERS_LIST, LS_CACHED_CHARACTERS_LIST, LS_CACHED_COMICS_LIST } from '../utility/consts';

import R from 'ramda';

const prepare_id = (data) => R.toString(R.path(['id'], data));
const prepare_data = (data) => {
  const id = prepare_id(data);
  return [id, {[id]: data}];
};
const obj_to_array = R.forEach((item) => item);

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
      R.forEachObjIndexed((it) => this[name] = it, list);
    }
  }

  private isFavorite(list, id): boolean {
    return R.has(id, this.state[list]);
  }

  set favComics(data) {
    const [id, prepared] = prepare_data(data);
    this.isComicsFavorite(id)
      ? this.state.favComics = R.omit([id], this.state.favComics)
      : this.state.favComics = { ...this.state.favComics, ...prepared };
    LocalStorageService.setItem(LS_FAV_COMICS_LIST, this.favComics);
  }

  set favCharacters(data) {
    const [id, prepared] = prepare_data(data);
    this.isCharacterFavorite(id)
      ? this.state.favCharacters = R.omit([id], this.state.favCharacters)
      : this.state.favCharacters = { ...this.state.favCharacters, ...prepared };
    LocalStorageService.setItem(LS_FAV_CHARACTERS_LIST, this.favCharacters);
  }

  set cachedCharacters(data) {
    const [, prepared] = prepare_data(data);
    this.state.cachedCharacters = { ...this.cachedCharacters, ...prepared };
    LocalStorageService.setItem(LS_CACHED_CHARACTERS_LIST, this.cachedCharacters);
  }

  set cachedComics(data) {
    const [, prepared] = prepare_data(data);
    this.state.cachedComics = { ...this.cachedComics, ...prepared };
    LocalStorageService.setItem(LS_CACHED_COMICS_LIST, this.cachedComics);
  }

  get cachedCharacters() {
    return obj_to_array(this.state.cachedCharacters);
  }

  get cachedComics() {
    return obj_to_array(this.state.cachedComics);
  }

  get favComics() {
    return obj_to_array(this.state.favComics);
  }

  get favCharacters() {
    return obj_to_array(this.state.favCharacters);
  }

  getCachedCharacter(id) {
    /*
      May be replaced with .find method of getter call
     */
    return this.state.cachedCharacters[id];
  }

  getCachedComics(id) {
    /*
     May be replaced with .find method of getter call
     */
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
