import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

const PUBLIC_KEY = '9efd108f61c628af9273f7e6611a7777',
  API_BASE = 'https://gateway.marvel.com:443/v1/public',

  prepare = response => ({
    ...response,
    body: JSON.parse(response._body)
  }),
  prepareSuccess = response =>
    prepare(response).body,
  prepareError = response => {
    const error = prepare(response);
    return Observable.throw(error);
  };

class HttpRequest {

  constructor(protected http: Http) { }

  get(url: string, params?: {}): Observable<any> {
    return this.http
      .get(url, { params: { ...params, apikey: PUBLIC_KEY }})
      .map(prepareSuccess)
      .catch(prepareError)
      .share();
  }
}

/*
  It's pointless to describe requests responses in this case
  (unable to get specific list of entity fields) so methods returns Observable<any>
 */
@Injectable()
export class ApiService {

  public characters;
  public comics;

  constructor(http: Http) {
    this.characters = new CharactersApi(http);
    this.comics = new ComicsApi(http);
  }
}

class ComicsApi extends HttpRequest {

  constructor(http: Http) {
    super(http);
  }

  list(filter?): Observable<any> {
    return this.get(`${API_BASE}/comics`, { limit: 20, ...filter });
  }

  item(id: number): Observable<any> {
    return this.get(`${API_BASE}/comics/${id}`);
  }
}

class CharactersApi extends HttpRequest {

  constructor(http: Http) {
    super(http);
  }

  item(id: number): Observable<any> {
    return this.get(`${API_BASE}/characters/${id}`);
  }
}
