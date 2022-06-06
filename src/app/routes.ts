import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';
import { json, redirect, RouteObject } from '@remix-run/router';

export const routes: RouteObject[] = [
  { path: '/', element: HomeComponent },
  {
    path: '/about',
    element: AboutComponent,
    action: async({ request }) => {
      const formData = await request.formData();
      const name = formData.get('name');

      if (!name) {
        return {
          name: 'Name is required'
        }
      }
      
      return redirect(`/?name=${name}`);
    },
    loader: async() => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const todos = await res.json();

      return json({ todos });
    }
  }
];