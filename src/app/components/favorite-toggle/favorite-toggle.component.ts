import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-favorite-toggle',
  templateUrl: './favorite-toggle.component.html',
  styleUrls: ['./favorite-toggle.component.scss']
})
export class FavoriteToggleComponent {

  @Input() value: boolean;
  @Output() toggled: EventEmitter<any> = new EventEmitter();

  toggleFav() {
    this.toggled.emit();
  }
}
