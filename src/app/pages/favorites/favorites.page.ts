import { Component } from '@angular/core';
import { BaseListView } from '../main/list-base';
import { ApiService, StateService, MemoizeService } from '../../services';
import R from 'ramda';

@Component({
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPageComponent extends BaseListView {

  constructor(protected api: ApiService, protected state: StateService, protected memoize: MemoizeService) {
    super(api, state, memoize);
    this.state.favComics$.subscribe((list) => { if (list) this.comicsList = R.values(list); });
    this.state.favCharacters$.subscribe((list) => { if (list) this.charactersList = R.values(list); });
  }

  public comicsList;
  public charactersList;

  comicsFavToggle(data) {
    super.comicsFavToggle(data);
  }

  characterFavToggle(data) {
    super.characterFavToggle(data);
  }
}
