import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/productos/productos.page').then((m) => m.ProductosPage),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/nosotros/nosotros.page').then((m) => m.NosotrosPage),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto.page').then((m) => m.ContactoPage),
  },
  { path: '**', redirectTo: 'inicio' },
];