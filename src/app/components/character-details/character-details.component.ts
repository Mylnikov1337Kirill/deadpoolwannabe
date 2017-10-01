import {Component, EventEmitter, Input, Output} from '@angular/core';
import { isObject, zoomImage } from '../../utility';
import { Character } from './character';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {

  @Input() character: Character;
  @Output() comicsPicked: EventEmitter<any> = new EventEmitter();
  @Output() viewClosed: EventEmitter<any> = new EventEmitter();

  public isObject = isObject;
  public zoomImage = zoomImage;

  closeView() {
    this.viewClosed.emit();
  }

}
