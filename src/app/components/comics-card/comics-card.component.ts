import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StateService} from '../../services';
import { Comics } from './comics';

@Component({
  selector: 'app-comics-card',
  templateUrl: './comics-card.component.html',
  styleUrls: ['./comics-card.component.scss']
})
export class ComicsCardComponent {

  constructor(private state: StateService) { }

  @Input() data: Comics;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() favToggled: EventEmitter<any> = new EventEmitter();

  cardClicked() {
    this.onClick.emit(this.data.id);
  }

  onFavToggle() {
    this.data.isFav = !this.data.isFav;
    this.favToggled.emit({id: this.data.id, name: this.data.title});
  }
}
