import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { getRouteContext, Router } from './router.service';

@Component({
  selector: 'about',
  standalone: true,
  imports: [CommonModule],
  template: `
    About Remixing Routing in Angular
    
    <hr>
    Action Data: {{ router.actionData && router.actionData[routeId] | json }}
    
    <hr>
    Loader Data: {{ router.loaderData[routeId] | json }}
    
    <hr>
    <form novalidate (submit)="onSubmit($event)">
      <div>
        Name: <input type="name" name="name" />
      </div>

      <button type="submit">Submit</button>
    </form>
  `
})
export class AboutComponent {
  context = getRouteContext();
  routeId = this.context!.id;
  constructor(public router: Router) {}

  onSubmit($event: any) {
    $event.preventDefault();

    this.router.navigate('/about', {
      formMethod: 'post',
      formData: new FormData($event.target)
    });
  }
}
