import { Component } from '@angular/core';

import { Outlet, Router } from 'remix-router-angular';

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
  constructor(private router: Router) {}

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
