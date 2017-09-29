import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

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

  constructor(private api: ApiService) {
    api.comics.list().subscribe((response) => response
      ? this.init(R.path(['data', 'results'], response))
      : this.isLoading = true);
    // api.comics.item(5).subscribe((response) => console.log(response));
  }

  public isLoading: boolean = true;
  public comicsList: Comics[];

  init(data) {
    this.comicsList = R.map((it) =>
        R.pipe(
          R.pick(['id', 'title', 'thumbnail', 'description']),
          ({id, title, thumbnail: {path, extension}, description}) =>
            ({id,
              title,
              description: description ? R.concat(description.substr(0, 100), ' ...') : 'No description',
              image: `${path}.${extension}`})
        )(it),
      data);

    this.isLoading = false;
  }
}

