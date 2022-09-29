import {
  inject,
  Injectable,
  InjectFlags,
  InjectionToken,
  Type,
} from '@angular/core';
import {
  Params,
  AgnosticRouteObject as RemixRouteObject,
  AgnosticDataRouteMatch as RemixDataRouteMatch,
  RouterState,
  Router as RemixRouter,
  createBrowserHistory,
  createRouter,
  RouterNavigateOptions,
} from '@remix-run/router';
import { BehaviorSubject, filter, map } from 'rxjs';

export type RouteObject = RemixRouteObject & {
  element: Type<any>;
  children?: RouteObject[];
};

export type DataRouteMatch = RemixDataRouteMatch & {
  route: { element: Type<any> };
};

export const ROUTES = new InjectionToken<RouteObject[]>('ROUTES');

export const REMIX_ROUTER = new InjectionToken<RemixRouter>('Remix Router', {
  providedIn: 'root',
  factory() {
    const routes = inject(ROUTES);
    const history = createBrowserHistory();
    const router = createRouter({
      routes,
      history,
    });
    router.initialize();
    return router;
  },
});

export const ROUTE_CONTEXT = new InjectionToken<{
  id: string;
  index: boolean;
  params: Params;
}>('Route Context');

export function getRouter() {
  return inject(Router);
}

export function getRouteContext() {
  return inject(ROUTE_CONTEXT, InjectFlags.Optional | InjectFlags.SkipSelf);
}

export function getActionData() {
  const router = inject(Router);
  const context = getRouteContext();

  return router.routerState$.pipe(
    filter((rs) => !!rs.actionData),
    map((rs) => rs.actionData![context!.id])
  );
}

export function getLoaderData() {
  const router = inject(Router);
  const context = getRouteContext();

  return router.routerState$.pipe(map((rs) => rs.loaderData[context!.id]));
}

export function getRouteParams<T extends object = object>() {
  const router = inject(Router);
  const context = getRouteContext();

  return router.routerState$.pipe(
    map((rs) => {
      const route = rs.matches.find((match) => {
        console.log(match.route, context);
        return match.route.id === context!.id;
      });

      return ((route && route.params) || {}) as T;
    })
  );
}

@Injectable({
  providedIn: 'root',
})
export class Router {
  private _remixRouter = inject(REMIX_ROUTER);
  routerState$ = new BehaviorSubject<RouterState>(this._remixRouter.state);

  constructor() {
    this._remixRouter.subscribe((rs) => this.routerState$.next(rs));
  }

  get state() {
    return this._remixRouter.state;
  }

  navigate(path: string, opts?: RouterNavigateOptions) {
    this._remixRouter.navigate(path, opts);
  }
}

export function provideRoutes(routes: RouteObject[]) {
  return [{ provide: ROUTES, useValue: routes }];
}
