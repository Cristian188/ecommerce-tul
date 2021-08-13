import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/shop' },
  {
    path: 'shop',
    loadChildren: () => import('@tul/products').then((m) => m.ProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('@tul/carts').then((m) => m.CartsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('@tul/auth').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
