import { StateService } from './state.service';
import { CACHE_EXPIRATION } from '../utility/consts';
import { forwardRef, Inject } from '@angular/core';

import R from 'ramda';

export class MemoizeService {

  constructor(@Inject(forwardRef(() => StateService)) private state: StateService) {}

  private prepareValue(cache) {
    // TODO: remove from cache if isn't actual
    const decision = !R.isNil(cache) && this.isCacheActual(R.path(['ts'], cache));
    return decision ? cache : undefined;
  }

  private isCacheActual(ts) {
    return new Date().getTime() - ts < CACHE_EXPIRATION;
  }

  public cacheCharacter(character) {
    const prepared = R.omit(['isFav'], {...character, ts: new Date().getTime()});
    this.state.cachedCharacters = prepared;
  }

  public receiveCachedCharacter(id) {
    const cache = this.state.getCachedCharacter(id);
    return this.prepareValue(cache);
  }

  public cacheComics(comics) {
    const prepared = R.omit(['isFav'], {...comics, ts: new Date().getTime()});
    this.state.cachedComics = prepared;
  }

  public receiveCachedComics(id) {
    const cache = this.state.getCachedComics(id);
    return this.prepareValue(cache);
  }

}
