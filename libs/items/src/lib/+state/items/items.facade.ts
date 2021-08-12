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
  selectedItems$ = this.store.pipe(select(ItemsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ItemsActions.init());
  }
}
