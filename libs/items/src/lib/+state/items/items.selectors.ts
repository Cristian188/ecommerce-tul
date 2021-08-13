import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ITEMS_FEATURE_KEY,
  State,
  ItemPartialState,
  itemAdapter,
} from './items.reducer';

// Lookup the 'Item' feature state managed by NgRx
export const getItemsState = createFeatureSelector<ItemPartialState, State>(
  ITEMS_FEATURE_KEY
);

const { selectAll, selectTotal } = itemAdapter.getSelectors();

export const getItemsLoaded = createSelector(
  getItemsState,
  (state: State) => state.loaded
);

export const getItemsError = createSelector(
  getItemsState,
  (state: State) => state.error
);

export const getAllItems = createSelector(getItemsState, (state: State) =>
  selectAll(state)
);

export const getCountItems = createSelector(getItemsState, (state: State) =>
  selectTotal(state)
);
