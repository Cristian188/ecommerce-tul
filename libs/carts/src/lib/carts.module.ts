import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCarts from './+state/carts/carts.reducer';
import { CartsEffects } from './+state/carts/carts.effects';
import { CartsFacade } from './+state/carts/carts.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCarts.CARTS_FEATURE_KEY, fromCarts.reducer),
    EffectsModule.forFeature([CartsEffects]),
  ],
  providers: [CartsFacade],
})
export class CartsModule {}
