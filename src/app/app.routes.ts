import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_VERSION } from './app.version';

import { AuthService } from './services';
import {
  NotFoundPageComponent,
  MainPageComponent,
  FavoritesPageComponent
} from './pages';

const ROUTES: Routes = [
  {
    path: `${APP_VERSION}`,
    canActivate: [AuthService],
    children: [
      /*
        TODO: LazyLoad
       */
      {
        path: '',
        data: { title: 'Comics' },
        component: MainPageComponent
      },
      {
        path: 'fav',
        data: { title: 'Favorites' },
        component: FavoritesPageComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${APP_VERSION}`
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: {title: 'Not Found'}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
