import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StateService} from '../../services';

@Component({
  selector: 'app-comics-card',
  templateUrl: './comics-card.component.html',
  styleUrls: ['./comics-card.component.scss']
})
export class ComicsCardComponent {

  constructor(private state: StateService) { }

  @Input() data;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  cardClicked() {
    this.onClick.emit(this.data.id);
  }

  toggleFav() {
    this.state.favComics = this.data.id;
    this.data.isFav = !this.data.isFav;
  }
}

