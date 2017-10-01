import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() data;
  @Output() viewClosed: EventEmitter<any> = new EventEmitter();
  @Output() favToggled: EventEmitter<any> = new EventEmitter();

  closeView() {
    this.viewClosed.emit();
  }

  onFavToggle() {
    this.data.isFav = !this.data.isFav;
    this.favToggled.emit(this.data.id);
  }
}
