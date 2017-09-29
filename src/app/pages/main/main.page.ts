import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPageComponent {

  constructor(private api: ApiService) {
    api.comics.list().subscribe((response) => console.log(response));
    api.comics.item(5).subscribe((response) => console.log(response));
  }
}

