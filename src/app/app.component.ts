import { Component } from '@angular/core';

import { getRouter, Outlet } from 'remix-router-angular';

@Component({
  selector: 'app-root',
  template: `
    <a (click)="goHome()">Home</a> |
    <a (click)="goAbout()">About</a> |
    <a (click)="goNested()">Nested</a>

    <br /><br />

    <outlet></outlet>
  `,
  imports: [Outlet],
  standalone: true,
  styles: [
    `
      a {
        text-decoration: underline;
      }
    `,
  ],
})
export class AppComponent {
  router = getRouter();

  goHome() {
    this.router.navigate('/');
  }

  goAbout() {
    this.router.navigate('/about');
  }

  goNested() {
    this.router.navigate('/parent/child');
  }
}
