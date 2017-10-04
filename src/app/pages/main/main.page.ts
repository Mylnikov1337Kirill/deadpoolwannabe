import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, StateService, MemoizeService } from '../../services';
import { BaseListView } from './list-base';
import { NO_DATA_PROVIDED, DATE_DESCRIPTOR_DICT, COMICS_FORMAT_DICT } from '../../utility/consts';
import { parseImageURL } from '../../utility';
import { Comics } from '../../components/comics-card/comics';

import R from 'ramda';

@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPageComponent extends BaseListView implements OnInit {

  constructor(protected api: ApiService, protected state: StateService, protected memoize: MemoizeService) {
    super(api, state, memoize);
    this.prepareComicsList({});
  }

  public comicsList: Comics[];
  public filter: any = {
    value: new FormGroup({
      dateDescriptor: new FormControl(''),
      format: new FormControl(''),
      offset: new FormControl(20)
    }),
    config: {
      dateDescriptor: DATE_DESCRIPTOR_DICT,
      format: COMICS_FORMAT_DICT
    }
  };

  comicsFavToggle(data) {
    super.comicsFavToggle(data);
  }

  nextPage() {
    this.filter.value.patchValue({ offset: this.filter.value.value.offset + 20 });
  }

  prepareComicsList(filter) {
    this.loader.show();
    this.api.comics.list({...filter}).subscribe((list) => {
      if (list) {
        this.comicsList = R.map((it) =>
            R.pipe(
              R.pick(['id', 'title', 'thumbnail', 'description']),
              ({id, title, thumbnail, description}): Comics =>
                ({
                  id,
                  title,
                  isFav: this.state.isComicsFavorite(id),
                  description: description ? R.concat(description.substr(0, 150), ' ...') : NO_DATA_PROVIDED,
                  thumbnail: parseImageURL(thumbnail)
                })
            )(it),
          R.path(['data', 'results'], list));
        this.state.favComics$.subscribe((list) => {
          if (list) {
            this.comicsList = R.map((comics) =>
              ({...comics, isFav: this.state.isComicsFavorite(comics.id)}), this.comicsList)
          }
        });
        this.loader.hide();
      }
    });
  }

  ngOnInit() {
    this.filter.value.valueChanges.subscribe((value) => {
      this.prepareComicsList(R.reject(R.isEmpty, value));
    });
  }
}

