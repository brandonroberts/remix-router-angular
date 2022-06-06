import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { getRouteParams } from 'remix-router-angular';

@Component({
  selector: 'child',
  standalone: true,
  imports: [CommonModule],
  template: ` Child {{ (params$ | async)?.child }}`,
})
export class ChildComponent {
  params$ = getRouteParams<{ child: string }>();
}
