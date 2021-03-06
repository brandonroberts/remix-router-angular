import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,  
  getActionData,
  getLoaderData,
  getRouter,
} from 'remix-router-angular';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');

  if (!name) {
    return {
      name: 'Name is required',
    };
  }

  return redirect(`/?name=${name}`);
};

export const loader: LoaderFunction = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const todos = await res.json();

  return json({ todos });
};

@Component({
  selector: 'about',
  standalone: true,
  imports: [CommonModule],
  template: `
    Remixing Routing in Angular

    <hr />
    Action Data: {{ actionData$ | async | json }}

    <hr />
    Loader Data: {{ loaderData$ | async | json }}

    <hr />

    1. Submit the form without entering a name to see the action data containing the validation message.<br>
    2. Enter a name and submit to be redirected back to home with the name in the query params.

    <form novalidate (submit)="onSubmit($event)">
      <div>Name: <input type="name" name="name" /></div>

      <button type="submit">Submit</button>
    </form>
  `,
})
export class AboutComponent {
  loaderData$ = getLoaderData();
  actionData$ = getActionData();
  router = getRouter();

  onSubmit($event: any) {
    $event.preventDefault();

    this.router.navigate('/about', {
      formMethod: 'post',
      formData: new FormData($event.target),
    });
  }
}
