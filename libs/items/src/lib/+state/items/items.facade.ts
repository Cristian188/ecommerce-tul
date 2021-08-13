import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as ItemsActions from './items.actions';
import * as ItemsFeature from './items.reducer';
import * as ItemsSelectors from './items.selectors';

@Injectable()
export class ItemsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ItemsSelectors.getItemsLoaded));
  allItems$ = this.store.pipe(select(ItemsSelectors.getAllItems));
  countItems$ = this.store.pipe(select(ItemsSelectors.getCountItems));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  loadItems(cartId: string) {
    this.store.dispatch(ItemsActions.loadItems({ cartId }));
  }

  addItem(productId: string, cartId: string, quantity: number = 1) {
    this.store.dispatch(
      ItemsActions.addToCart({ productId, quantity, cartId })
    );
  }

  updateItem(itemId: string, quantity: number) {
    this.store.dispatch(ItemsActions.updateFromCart({ itemId, quantity }));
  }

  removeItem(itemId: string) {
    this.store.dispatch(ItemsActions.removeFromCart({ itemId }));
  }
}
