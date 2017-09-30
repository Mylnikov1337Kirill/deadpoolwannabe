import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { isObject, zoomImage } from '../../utility';

@Component({
  selector: 'app-comics-details',
  templateUrl: './comics-details.component.html',
  styleUrls: ['./comics-details.component.scss']
})
export class ComicsDetailsComponent implements OnChanges {

  @Input() data;
  @Output() characterDetails: EventEmitter<any> = new EventEmitter();

  public isObject = isObject;
  public zoomImage = zoomImage;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  closeView() {
    this.data = null;
  }

  characterView(character) {
    this.characterDetails.emit(character.resourceURI);
  }
}
