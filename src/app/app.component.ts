import { Component, Type, ViewContainerRef } from '@angular/core';
import { Outlet } from './outlet.component';
import { Router } from './router.service';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <button (click)="goHome()">Home</button>
    <button (click)="goAbout()">About</button>
    
    <outlet></outlet>
  `,
  styles: [],
  imports: [Outlet],
  standalone: true
})
export class AppComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate('/');
  }

  goAbout() {
    this.router.navigate('/about');
  }
}
