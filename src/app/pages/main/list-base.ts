import { Loader } from './loader';
import { ComicsDetails } from '../../components/comics-details/comics-details';
import { Character } from '../../components/character-details/character';
import { ApiService, StateService, MemoizeService } from '../../services';
import { NO_DATA_PROVIDED } from '../../utility/consts';
import { parseImageURL } from '../../utility/index';

import R from 'ramda';

export class BaseListView {

  constructor(protected api: ApiService, protected state: StateService, protected memoize: MemoizeService) { }

  public loader: Loader = new Loader();
  public comicsDetails: ComicsDetails;
  public characterDetails: Character;

  comicsDetailsView(id) {
    this.comicsDetailsClosed();
    this.characterDetailsClosed();

    const cached = this.memoize.receiveCachedComics(id);

    if (cached) {
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

  comicsDetailsClosed() {
    this.comicsDetails = null;
  }

  characterDetailsClosed() {
    this.characterDetails = null;
  }

  prepareComicsDetails(id) {
    this.loader.show();
    this.api.comics.item(id).subscribe((comics) => {
      if (comics) {
        this.comicsDetails =
          R.pipe(
            R.path(['data', 'results', '0']),
            ({id, title, thumbnail, description, characters, format, images, pageCount}) =>
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
            R.path(['data', 'results', '0']),
            ({id, comics, name, thumbnail, description}) =>
              ({
                id,
                comics: R.path(['items'], comics),
                name,
                thumbnail: parseImageURL(thumbnail),
                description: description ? description : NO_DATA_PROVIDED,
                isFav: this.state.isCharacterFavorite(id)
              })
          )(character);

        this.memoize.cacheCharacter(this.characterDetails);
        this.loader.hide();
      }
    });
  }

  comicsFavToggle(data) {
    this.state.favComics = data;
  }

  characterFavToggle(data) {
    this.state.favCharacters = data;
  }
}
