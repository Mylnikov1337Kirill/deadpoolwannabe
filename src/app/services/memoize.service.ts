import { StateService } from './state.service';
import { CACHE_EXPIRATION } from '../utility/consts';
import { forwardRef, Inject } from '@angular/core';

import R from 'ramda';

export class MemoizeService {

  constructor(@Inject(forwardRef(() => StateService)) private state: StateService) {}

  private prepareValue(cache, id) {
    return !R.isNil(cache) && this.isCacheActual(R.path([id, 'ts'], cache))
      ? cache
      : cache;
  }

  private isCacheActual(ts) {
    return new Date().getTime() - ts < CACHE_EXPIRATION;
  }

  public cacheCharacter(character) {
    const prepared = R.omit(['isFav'], {[character.id]: {...character, ts: new Date().getTime()}});
    this.state.setCachedCharacter(prepared);
  }

  public receiveCachedCharacter(id) {
    const cache = this.state.getCachedCharacter(id);
    return this.prepareValue(cache, id);
  }

  public cacheComics(comics) {
    const prepared = R.omit(['isFav'], {[comics.id]: {...comics, ts: new Date().getTime()}});
    this.state.setCachedComics(prepared);
  }

  public receiveCachedComics(id) {
    const cache = this.state.getCachedComics(id);
    return this.prepareValue(cache, id);
  }

}
