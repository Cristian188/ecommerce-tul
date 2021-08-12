import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCarts from './+state/carts/carts.reducer';
import { CartsEffects } from './+state/carts/carts.effects';
import { CartsFacade } from './+state/carts/carts.facade';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ListComponent } from './list/list.component';

const routes = RouterModule.forChild([
  {
    path: '',
    component: ListComponent,
  },
]);

const NZ_MODULES = [
  NzTableModule,
  NzSelectModule,
  NzTypographyModule,
  NzButtonModule,
  NzNotificationModule,
];
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCarts.CARTS_FEATURE_KEY, fromCarts.reducer),
    EffectsModule.forFeature([CartsEffects]),
    ...NZ_MODULES,
  ],
  providers: [CartsFacade],
  declarations: [ListComponent],
})
export class CartsModule {}
