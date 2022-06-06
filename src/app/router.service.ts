import { inject, Injectable, InjectFlags, InjectionToken } from '@angular/core';
import { 
  createBrowserRouter, 
  NavigateOptions,
  RouteObject,
  RouterState
} from '@remix-run/router';

export const ROUTES = new InjectionToken<RouteObject[]>('ROUTES');

export const REMIX_ROUTER = new InjectionToken('Remix Router', {
  providedIn: 'root',
  factory() {
    const routes = inject(ROUTES);
    const router = createBrowserRouter({
      routes
    });
    router.initialize();
    return router;
  }
});

export const ROUTE_CONTEXT = new InjectionToken<{ id: string, index: boolean }>('Route Context');

export function getRouteContext() {
  return inject(ROUTE_CONTEXT, InjectFlags.Optional | InjectFlags.SkipSelf);;
}

@Injectable({
  providedIn: 'root'
})
export class Router {
  private _remixRouter = inject(REMIX_ROUTER);

  get actionData() {
    return this._remixRouter.state.actionData;
  }

  get loaderData() {
    return this._remixRouter.state.loaderData;
  }

  get state() {
    return this._remixRouter.state;
  }

  subscribe(fn: (routerState: RouterState) => void) {
    this._remixRouter.subscribe(fn);
  }

  navigate(path: string, opts?: NavigateOptions) {
    this._remixRouter.navigate(path, opts);
  }
}

export function provideRoutes(routes: RouteObject[]) {
  return [
    { provide: ROUTES, useValue: routes }
  ];
}
