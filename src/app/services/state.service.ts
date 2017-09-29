import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { LS_FAV_COMICS_LIST } from '../utility/consts';

import R from 'ramda';

@Injectable()
export class StateService {

  private state = {
    favComics: []
  };

  set favComics(id) {
    if (!R.isNil(id)) {
      R.contains(id, this.state.favComics)
        ? this.state.favComics.splice(this.state.favComics.indexOf(id), 1)
        : this.state.favComics.push(id);
      LocalStorageService.setItem(LS_FAV_COMICS_LIST, this.state.favComics);
    }
  }

  get favComics() {
    return this.state.favComics;
  }
}
