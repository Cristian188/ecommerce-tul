import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { CartService } from '../../carts.service';

import * as CartsActions from './carts.actions';
import * as CartsFeature from './carts.reducer';
import * as CartsSelectors from './carts.selectors';

@Injectable()
export class CartsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CartsSelectors.getCartsLoaded));
  cart$ = this.store.pipe(select(CartsSelectors.getCartsState));

  constructor(private store: Store, private cartService: CartService) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  loadCart() {
    this.store.dispatch(CartsActions.loadCart());
  }

  checkoutCart() {
    this.store.dispatch(CartsActions.checkoutCart());
  }

  getCurrentCart() {
    return this.cartService.getOrCreateCartId();
  }
}
