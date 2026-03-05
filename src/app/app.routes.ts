import { Routes } from '@angular/router';
import { authGuard, unauthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        canActivate: [unauthGuard],
        loadComponent: () => import('./features/auth/login/login.component')
    },
    {
        path: 'register',
        canActivate: [unauthGuard],
        loadComponent: () => import('./features/auth/register/register.component')
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/dashboard.component')
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
