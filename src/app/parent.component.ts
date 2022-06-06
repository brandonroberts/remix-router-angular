import { Component } from '@angular/core';
import { getRouter, Outlet } from 'remix-router-angular';

@Component({
  selector: 'home',
  standalone: true,
  imports: [Outlet],
  template: `
    Parent -
    <a (click)="child('child')">Child</a> |
    <a (click)="child('1')">Child 1</a> |
    <a (click)="child('2')">Child 2</a>
    <hr />

    <outlet></outlet>
  `,
  styles: [
    `
      a {
        text-decoration: underline;
      }
    `,
  ],
})
export class ParentComponent {
  router = getRouter();

  child(num: string) {
    this.router.navigate(`/parent/${num}`);
  }
}
