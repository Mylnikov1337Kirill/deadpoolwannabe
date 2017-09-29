import {Component} from '@angular/core';
import {APP_VERSION} from '../../app.version';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public APP_VERSION = APP_VERSION;
}
