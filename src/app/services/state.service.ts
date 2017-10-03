import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { LS_FAV_COMICS_LIST, LS_FAV_CHARACTERS_LIST, LS_CACHED_CHARACTERS_LIST, LS_CACHED_COMICS_LIST } from '../utility/consts';

import R from 'ramda';
import {BehaviorSubject} from "rxjs";

const prepare_id = (data) => R.toString(R.path(['id'], data));
const prepare_data = (data) => {
  const id = prepare_id(data);
  return [id, {[id]: data}];
};

@Injectable()
export class StateService {

  private state = {
    favComics$: new BehaviorSubject(false),
    favCharacters$: new BehaviorSubject(false),
    cachedComics$: new BehaviorSubject(false),
    cachedCharacters$: new BehaviorSubject(false)
  };

  get favComics$() {
    return this.state.favComics$;
  }

  get favCharacters$() {
    return this.state.favCharacters$;
  }

  private fillStateList(name, list): void {
    if (!R.isNil(list)) {
      R.forEachObjIndexed((it) => this[name] = it, list);
    }
  }

  private isFavorite(list, id): boolean {
    return R.has(id, this[list]);
  }

  set favComics(data) {
    const [id, prepared] = prepare_data(data);
    this.isComicsFavorite(id)
      ? this.state.favComics$.next(R.omit([id], this.state.favComics$.getValue()))
      : this.state.favComics$.next({ ...this.favComics, ...prepared});
    LocalStorageService.setItem(LS_FAV_COMICS_LIST, this.favComics);
  }

  set favCharacters(data) {
    const [id, prepared] = prepare_data(data);
    this.isCharacterFavorite(id)
      ? this.state.favCharacters$.next(R.omit([id], this.state.favCharacters$.getValue()))
      : this.state.favCharacters$.next({ ...this.favCharacters, ...prepared });
    LocalStorageService.setItem(LS_FAV_CHARACTERS_LIST, this.favCharacters);
  }

  set cachedCharacters(data) {
    const [, prepared] = prepare_data(data);
    this.state.cachedCharacters$.next({ ...this.cachedCharacters, ...prepared });
    LocalStorageService.setItem(LS_CACHED_CHARACTERS_LIST, this.cachedCharacters);
  }

  set cachedComics(data) {
    const [, prepared] = prepare_data(data);
    this.state.cachedComics$.next({ ...this.cachedComics, ...prepared });
    LocalStorageService.setItem(LS_CACHED_COMICS_LIST, this.cachedComics);
  }

  get cachedCharacters(): Object {
    return this.state.cachedCharacters$.getValue();
  }

  get cachedComics(): Object {
    return this.state.cachedComics$.getValue();
  }

  get favComics(): Object {
    return this.state.favComics$.getValue();
  }

  get favCharacters(): Object {
    return this.state.favCharacters$.getValue();
  }

  getCachedCharacter(id) {
    return this.cachedCharacters[id];
  }

  getCachedComics(id) {
    return this.cachedComics[id];
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
