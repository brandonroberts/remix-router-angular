import {
  Directive,
  inject,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { RouterState } from '@remix-run/router';
import { Subject, takeUntil, tap } from 'rxjs';

import {
  DataRouteMatch,
  getRouteContext,
  getRouter,
  ROUTE_CONTEXT,
} from './router.service';

@Directive({
  selector: 'outlet',
  standalone: true,
})
export class Outlet {
  private destroy$ = new Subject();
  private cmp!: Type<any>;
  private context? = getRouteContext();
  private router = getRouter();
  private vcr = inject(ViewContainerRef);

  ngOnInit() {
    this.setUpListener();
  }

  setUpListener() {
    this.router.routerState$
      .pipe(
        tap((rs) => {
          const matchesToRender = this.getMatch(rs);
          const currentCmp = matchesToRender.route.element;

          if (this.cmp !== currentCmp) {
            this.vcr.clear();
            this.vcr.createComponent(currentCmp, {
              injector: this.getInjector(matchesToRender),
            });
            this.cmp = currentCmp;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getInjector(matchesToRender: DataRouteMatch) {
    const injector = Injector.create({
      providers: [
        {
          provide: ROUTE_CONTEXT,
          useValue: {
            id: matchesToRender.route.id,
            index: matchesToRender.route.index === true,
            params: matchesToRender.params,
          },
        },
      ],
      parent: this.vcr.injector,
    });

    return injector;
  }

  getMatch(routerState: RouterState): DataRouteMatch {
    const { matches } = routerState;
    const idx = matches.findIndex(
      (match) => match.route.id === this.context?.id
    );
    const matchesToRender = matches[idx + 1];

    return matchesToRender as DataRouteMatch;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
