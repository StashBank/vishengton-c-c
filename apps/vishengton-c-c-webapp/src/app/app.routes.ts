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
    path: 'contragents',
    loadComponent: () => import('@vcc/webapp/contragents').then(m => m.ContragentsComponent)
  },
  {
    path: 'contragents/new',
    loadComponent: () => import('@vcc/webapp/contragents').then(m => m.ContragentComponent)
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
    path: 'outcomes',
    loadComponent: () => import('@vcc/webapp/outcomes').then(m => m.OutcomesComponent)
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
