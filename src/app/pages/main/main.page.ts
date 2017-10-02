import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, StateService, MemoizeService } from '../../services';
import { NO_DATA_PROVIDED, DATE_DESCRIPTOR_DICT, COMICS_FORMAT_DICT } from '../../utility/consts';
import { parseImageURL } from '../../utility';
import { Comics } from '../../components/comics-card/comics';
import { ComicsDetails } from '../../components/comics-details/comics-details';
import { Character } from '../../components/character-details/character';

import R from 'ramda';


@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private api: ApiService, private state: StateService, private memoize: MemoizeService) {
    this.getComicsList({});
  }

  /*
    Loader should be moved to some global state
   */
  public isLoading: boolean = true;
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

  getComicsList(filter) {
    this.isLoading = true;
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

        this.isLoading = false;
      }
    });
  }

  prepareComicsDetails(id) {
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
        this.isLoading = false;
      }
    });
  }

  prepareCharacterDetails(id) {
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
      }
    });
  }



  comicsDetailsView(id) {
    this.characterDetails = null;
    this.comicsDetails = null;
    this.isLoading = true;

    const cached = this.memoize.receiveCachedComics(id);

    if (cached) {
      this.comicsDetails = { ...cached, isFav: this.state.isComicsFavorite(id) };
      this.isLoading = false;
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
      Quick solution for list rerender when comics fav was toggled
     */
    this.comicsList = R.map((comics) => ({ ...comics, isFav: this.state.isComicsFavorite(comics.id)}), this.comicsList);
  }

  characterFavToggle(data) {
    this.state.favCharacters = data;
  }

  comicsDetailsClosed() {
    this.comicsDetails = null;
  }

  characterDetailsClosed() {
    this.characterDetails = null;
  }

  ngOnInit() {
    this.filter.value.valueChanges.subscribe((value) => {
      this.getComicsList(R.reject(R.isEmpty, value));
    });
  }
}

