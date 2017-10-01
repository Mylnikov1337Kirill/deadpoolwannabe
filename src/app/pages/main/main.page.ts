import { Component } from '@angular/core';
import { ApiService, StateService } from '../../services';
import { NO_DATA_PROVIDED } from '../../utility/consts';
import { parseImageURL } from '../../utility';
import { Comics } from '../../components/comics-card/comics';
import { ComicsDetails } from '../../components/comics-details/comics-details';
import { Character } from '../../components/character-details/character';

import R from 'ramda';

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

  /*
    Loader should be moved to some global state
   */
  public isLoading: boolean = true;
  public comicsList: Comics[];
  public comicsDetails: ComicsDetails;
  public characterDetails: Character;

  init(data) {
    this.comicsList = R.map((it) =>
        R.pipe(
          R.pick(['id', 'title', 'thumbnail', 'description']),
          ({id, title, thumbnail, description}): Comics =>
            ({id,
              title,
              isFav: this.state.isFavorite(id),
              description: description ? R.concat(description.substr(0, 150), ' ...') : NO_DATA_PROVIDED,
              thumbnail: parseImageURL(thumbnail)
            })
        )(it),
      data);

    this.isLoading = false;
  }

  comicsDetailsView(id) {
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
                  thumbnail: parseImageURL(thumbnail),
                  description: description
                    ? description
                    : NO_DATA_PROVIDED,
                  characters: R.isEmpty(R.path(['items'], characters))
                    ? NO_DATA_PROVIDED
                    : characters.items,
                  format: format
                    ? format
                    : NO_DATA_PROVIDED,
                  /*
                    Should i omit image which is copying thumbnail :thinking-face:
                   */
                  images: R.isEmpty(images)
                    ? NO_DATA_PROVIDED
                    : R.map((image) => parseImageURL(image), images),
                  pageCount: pageCount
                    ? pageCount
                    : NO_DATA_PROVIDED
                })
            ),
            R.path(['0']) // Quick solution
          )(comics);
        this.isLoading = false;
      }
    });
  }

  characterDetailsView(id) {
    this.api.characters.item(id).subscribe((character) => {
      if (character) {
        this.characterDetails =
          R.pipe(
            R.path(['data', 'results']),
            R.map(
              ({ comics, name, thumbnail }) =>
                ({
                  comics: R.path(['items'], comics),
                  name,
                  thumbnail: parseImageURL(thumbnail)
              })
            ),
            R.path(['0'])
          )(character);
      }
    });
  }

  comicsDetailsClosed() {
    this.comicsDetails = null;
  }

  characterDetailsClosed() {
    this.characterDetails = null;
  }
}

