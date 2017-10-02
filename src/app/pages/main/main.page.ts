import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, StateService, MemoizeService } from '../../services';
import { NO_DATA_PROVIDED, DATE_DESCRIPTOR_DICT, COMICS_FORMAT_DICT } from '../../utility/consts';
import { parseImageURL } from '../../utility';
import { Comics } from '../../components/comics-card/comics';
import { ComicsDetails } from '../../components/comics-details/comics-details';
import { Character } from '../../components/character-details/character';

import R from 'ramda';

//move to layout class
class Loader {
  public isLoading: boolean;

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }
}

@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private api: ApiService, private state: StateService, private memoize: MemoizeService) {
    this.prepareComicsList({});
  }

  public loader: Loader = new Loader();
  public comicsList: Comics[];
  public comicsDetails: ComicsDetails;
  public characterDetails: Character;
  public filter: any = {
    value: new FormGroup({
      dateDescriptor: new FormControl(''),
      format: new FormControl('')
    }),
    config: {
      dateDescriptor: DATE_DESCRIPTOR_DICT,
      format: COMICS_FORMAT_DICT
    }
  };

  comicsDetailsView(id) {
    this.comicsDetailsClosed();
    this.characterDetailsClosed();

    const cached = this.memoize.receiveCachedComics(id);

    if (cached) {
      /*
         Dont forget to hide  
       */
      this.comicsDetails = { ...cached, isFav: this.state.isComicsFavorite(id) };
    } else {
       this.prepareComicsDetails(id);
    }
  }

  characterDetailsView(id) {
    const cached = this.memoize.receiveCachedCharacter(id);

    if (cached) {
      this.characterDetails = { ...cached, isFav: this.state.isCharacterFavorite(id) };
    } else {
      this.prepareCharacterDetails(id);
    }
  }

  comicsFavToggle(data) {
    this.state.favComics = data;
    /*
      Observable's Subscribe low-cost edition ;P
     */
    this.comicsList = R.map((comics) => ({ ...comics, isFav: this.state.isComicsFavorite(comics.id)}), this.comicsList);
  }

  characterFavToggle(data) {
    this.state.favCharacters = data;
  }

  prepareComicsList(filter) {
    this.loader.show();
    this.api.comics.list({...filter}).subscribe((list) => {
      if (list) {
        this.comicsList = R.map((it) =>
            R.pipe(
              R.pick(['id', 'title', 'thumbnail', 'description']),
              ({id, title, thumbnail, description}): Comics =>
                ({id,
                  title,
                  isFav: this.state.isComicsFavorite(id),
                  description: description ? R.concat(description.substr(0, 150), ' ...') : NO_DATA_PROVIDED,
                  thumbnail: parseImageURL(thumbnail)
                })
            )(it),
          R.path(['data', 'results'], list));

        this.loader.hide();
      }
    });
  }

  prepareComicsDetails(id) {
    this.loader.show();
    this.api.comics.item(id).subscribe((comics) => {
      if (comics) {
        this.comicsDetails =
          R.pipe(
            R.path(['data', 'results']),
            R.map(
              ({ id, title, thumbnail, description, characters, format, images, pageCount }) =>
                ({
                  id,
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
                    : NO_DATA_PROVIDED,
                  isFav: this.state.isComicsFavorite(id)
                })
            ),
            R.path(['0'])
          )(comics);

        this.memoize.cacheComics(this.comicsDetails);
        this.loader.hide();
      }
    });
  }

  prepareCharacterDetails(id) {
    this.loader.show();
    this.api.characters.item(id).subscribe((character) => {
      if (character) {
        this.characterDetails =
          R.pipe(
            R.path(['data', 'results']),
            R.map(
              ({id, comics, name, thumbnail, description}) =>
                ({
                  id,
                  comics: R.path(['items'], comics),
                  name,
                  thumbnail: parseImageURL(thumbnail),
                  description: description ? description : NO_DATA_PROVIDED,
                  isFav: this.state.isCharacterFavorite(id)
                })
            ),
            R.path(['0'])
          )(character);

        this.memoize.cacheCharacter(this.characterDetails);
        this.loader.hide();
      }
    });
  }

  comicsDetailsClosed() {
    this.comicsDetails = null;
  }

  characterDetailsClosed() {
    this.characterDetails = null;
  }

  ngOnInit() {
    this.filter.value.valueChanges.subscribe((value) => {
      this.prepareComicsList(R.reject(R.isEmpty, value));
    });
  }
}

