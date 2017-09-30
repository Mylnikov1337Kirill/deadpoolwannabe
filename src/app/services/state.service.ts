import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { LS_FAV_COMICS_LIST } from '../utility/consts';

import R from 'ramda';

@Injectable()
export class StateService {

  private state = {
    favComics: new Set()
  };

  set favComics(id) {
      this.isFavorite(id)
        ? this.state.favComics.delete(id)
        : this.state.favComics.add(id);
      LocalStorageService.setItem(LS_FAV_COMICS_LIST, Array.from(this.state.favComics));
  }

  get favComics() {
    return this.state.favComics;
  }

  isFavorite(id): boolean {
    return this.state.favComics.has(id);
  }

  initFavList(list): void {
    if (!R.isNil(list)) {
      R.forEach((it) => this.favComics = it, list);
    }
  }
}
