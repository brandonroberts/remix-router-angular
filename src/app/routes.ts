import { RouteObject } from 'remix-router-angular';

import {
  AboutComponent,
  loader as aboutLoader,
  action as aboutAction,
} from './about.component';
import { HomeComponent } from './home.component';
import { ParentComponent } from './parent.component';
import { ChildComponent } from './child.component';

export const routes: RouteObject[] = [
  { path: '/', element: HomeComponent },
  {
    path: '/parent',
    element: ParentComponent,
    children: [
      {
        path: ':child',
        element: ChildComponent,
      },
    ],
  },
  {
    path: '/about',
    element: AboutComponent,
    action: aboutAction,
    loader: aboutLoader,
  },
];
