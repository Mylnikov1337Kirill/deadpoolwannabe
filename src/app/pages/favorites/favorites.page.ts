import { Component } from '@angular/core';
import { BaseListView } from '../main/list-base';
import { ApiService, StateService, MemoizeService } from '../../services';
import { FavoritesListItem } from './favorites-list-item';

@Component({
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPageComponent extends BaseListView {

  constructor(protected api: ApiService, protected state: StateService, protected memoize: MemoizeService) {
    super(api, state, memoize);
    this.comicsList = this.state.favComics;
    this.charactersList = this.state.favCharacters;
  }

  public comicsList: FavoritesListItem[];
  public charactersList: FavoritesListItem[];
}
