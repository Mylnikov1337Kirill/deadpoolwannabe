import { Component } from '@angular/core';

@Component({
  template: `<h1>Soz but not found</h1>
             <img src="http://images6.fanpop.com/image/photos/38000000/Comix-Zone-comix-zone-38083362-1920-1080.jpg"/>`,
  styles: [`
    :host {
      display: flex;
      height: 100%;
      justify-content: center;
      flex-direction: column;
    }
    h1 {
      text-align: center;
      font-family: Saucer BB Font;
      font-size: 40px;
      font-weight: normal;
    }
    
    img {
      margin: 0 auto;
      max-width: 600px;
      border-radius: 30%;
    }
  `]
})
export class NotFoundPageComponent {}
