import { Component } from '@angular/core';
import { ApiService, StateService } from '../../services';

import R from 'ramda';

class Comics {
  public id: number;
  public title: string;
  public image: string;
}

@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPageComponent {

  constructor(private api: ApiService, private state: StateService) {
    api.comics.list().subscribe((response) => response
      ? this.init(R.path(['data', 'results'], response))
      : this.isLoading = true);
  }

  public isLoading: boolean = true;
  public comicsList: Comics[];
  public comicsDetails: any;

  init(data) {
    this.comicsList = R.map((it) =>
        R.pipe(
          R.pick(['id', 'title', 'thumbnail', 'description']),
          ({id, title, thumbnail, description}) =>
            ({id,
              title,
              isFav: this.state.isFavorite(id),
              description: description ? R.concat(description.substr(0, 150), ' ...') : 'No description',
              thumbnail: `${R.path(['path'], thumbnail)}.${R.path(['extension'], thumbnail)}`})
        )(it),
      data);

    this.isLoading = false;
  }

  detailsView(id) {
    // ADD MEMOIZE
    this.isLoading = true;
    this.api.comics.item(id).subscribe((comics) => {
      if (comics) {
        this.comicsDetails =
          R.pipe(
            R.path(['data', 'results']),
            R.map(
              ({title, thumbnail, description, characters, format, images, pageCount}) =>
                ({
                  title,
                  thumbnail: `${R.path(['path'], thumbnail)}.${R.path(['extension'], thumbnail)}`,
                  description: description ? description : 'No description',
                  characters: R.path(['items'], characters),
                  format,
                  images: R.map((image) => `${R.path(['path'], image)}.${R.path(['extension'], image)}`, images),
                  pageCount
                })
            ),
            R.path(['0']) // Quick solution
          )(comics);
        this.isLoading = false;
      }
    });
  }
}

