import { Directive, Injector, Type, ViewContainerRef } from '@angular/core';
import { RouterState } from '@remix-run/router';
import { getRouteContext, Router, ROUTE_CONTEXT } from './router.service';

@Directive({
  selector: 'outlet',
  standalone: true,
})
export class Outlet {
  private cmp!: Type<any>;
  private context? = getRouteContext();

  constructor(private router: Router, private vcr: ViewContainerRef) {}

  ngOnInit() {
    const match = this.getMatch(this.router.state);
    const cmp = match.route.element;
    this.vcr.createComponent(cmp);

    this.router.subscribe((rs) => {
      const matchesToRender = this.getMatch(rs);
      const currentCmp = matchesToRender.route.element;
      
      if (this.cmp !== currentCmp) {
        const injector = Injector.create({
          providers: [
            {
              provide: ROUTE_CONTEXT,
              useValue: {
                id: matchesToRender.route.id,
                index: matchesToRender.route.index === true,
              },
            },
          ],
          parent: this.vcr.injector,
        });

        this.vcr.clear();
        this.vcr.createComponent(currentCmp, { injector });
        this.cmp = currentCmp;
      }
    });
  }

  getMatch(routerState: RouterState) {
    const { matches } = routerState;
    const idx = matches.findIndex(
      (match) => match.route.id === this.context?.id
    );
    const matchesToRender = matches[idx + 1];
    return matchesToRender;
  }
}
