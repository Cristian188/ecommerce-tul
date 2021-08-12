import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/shop' },
  {
    path: 'shop',
    loadChildren: () => import('@tul/products').then((m) => m.ProductsModule),
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
