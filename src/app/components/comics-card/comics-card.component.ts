import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-comics-card',
  templateUrl: './comics-card.component.html',
  styleUrls: ['./comics-card.component.scss']
})
export class ComicsCardComponent {

  @Input() data;

  detailsView() {
    console.log('clicked');
  }
}

