import { StateService } from './state.service';
import { CACHE_EXPIRATION } from '../utility/consts';
import { forwardRef, Inject } from '@angular/core';

import R from 'ramda';

export class MemoizeService {

  constructor(@Inject(forwardRef(() => StateService)) private state: StateService) {}

  private prepareValue(cache, id) {
    //add remove from cache
    const decision = !R.isNil(cache) && this.isCacheActual(R.path([id, 'ts'], cache));
    return decision ? undefined : cache;
  }

  private isCacheActual(ts) {
    return new Date().getTime() - ts < CACHE_EXPIRATION;
  }

  public cacheCharacter(character) {
    const prepared = R.omit(['isFav'], {[character.id]: {...character, ts: new Date().getTime()}});
    this.state.cachedCharacters = prepared;
  }

  public receiveCachedCharacter(id) {
    const cache = this.state.getCachedCharacter(id);
    return this.prepareValue(cache, id);
  }

  public cacheComics(comics) {
    const prepared = R.omit(['isFav'], {[comics.id]: {...comics, ts: new Date().getTime()}});
    console.log('Caching...', prepared);
    this.state.cachedComics = prepared;
  }

  public receiveCachedComics(id) {
    const cache = this.state.getCachedComics(id);
    console.log('Uncached...', cache);
    return this.prepareValue(cache, id);
  }

}
