import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

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
  allCarts$ = this.store.pipe(select(CartsSelectors.getAllCarts));
  selectedCarts$ = this.store.pipe(select(CartsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CartsActions.init());
  }
}
