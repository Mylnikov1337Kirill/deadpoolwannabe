import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { isObject, zoomImage } from '../../utility';
import { ComicsDetails } from './comics-details';

@Component({
  selector: 'app-comics-details',
  templateUrl: './comics-details.component.html',
  styleUrls: ['./comics-details.component.scss']
})
export class ComicsDetailsComponent implements OnChanges {

  @Input() comics: ComicsDetails;
  @Input() character;
  @Output() characterPicked: EventEmitter<any> = new EventEmitter();

  public isObject = isObject;
  public zoomImage = zoomImage;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  closeComicsView() {
    this.comics = null;
  }

  closeCharacterView() {
    this.character = null;
  }

  characterView(character) {
    const id = character.resourceURI.split(/[/]+/).pop();
    this.characterPicked.emit(id);
  }
}
