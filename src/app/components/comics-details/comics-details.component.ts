import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-comics-details',
  templateUrl: './comics-details.component.html',
  styleUrls: ['./comics-details.component.scss']
})
export class ComicsDetailsComponent implements OnChanges {

  @Input() data;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
