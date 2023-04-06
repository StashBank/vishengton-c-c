import { Route } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'profile',
    pathMatch: 'full',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('@vcc/webapp/home').then(m => m.HomeComponent)
  },
  {
    path: 'clients',
    loadComponent: () => import('@vcc/webapp/clients').then(m => m.ClientsComponent)
  },
  {
    path: 'debts',
    loadComponent: () => import('@vcc/webapp/debts').then(m => m.DebtsComponent)
  },
  {
    path: 'incomes',
    loadComponent: () => import('@vcc/webapp/incomes').then(m => m.IncomesComponent)
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
];
