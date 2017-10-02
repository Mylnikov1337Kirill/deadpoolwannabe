import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent {
  @Input() list;
  @Output() comicsView: EventEmitter<any> = new EventEmitter();
  @Output() favToggled: EventEmitter<any> = new EventEmitter();

  detailsView(id) {
    this.comicsView.emit(id);
  }

  onFavToggle(data) {
    this.favToggled.emit(data);
  }
}
