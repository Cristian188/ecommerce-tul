import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProducts from './+state/products/products.reducer';
import { ProductsEffects } from './+state/products/products.effects';
import { ProductsFacade } from './+state/products/products.facade';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterModule } from '@angular/router';

const routes = RouterModule.forChild([
  {
    path: '',
    component: ProductsListComponent,
  },
]);

const NZ_MODULES = [
  NzGridModule,
  NzCardModule,
  NzButtonModule,
  NzDividerModule,
];
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
    routes,
    ...NZ_MODULES,
  ],
  providers: [ProductsFacade],
  declarations: [ProductsListComponent, ProductComponent],
})
export class ProductsModule {}
