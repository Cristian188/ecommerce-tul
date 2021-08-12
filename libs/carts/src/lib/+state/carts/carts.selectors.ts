import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CARTS_FEATURE_KEY as CARTS_FEATURE_KEY,
  State,
  CartPartialState,
} from './carts.reducer';

// Lookup the 'Cart' feature state managed by NgRx
export const getCartsState = createFeatureSelector<CartPartialState, State>(
  CARTS_FEATURE_KEY
);

export const getCartsLoaded = createSelector(
  getCartsState,
  (state: State) => state.loaded
);

export const getCurrentCart = createSelector(
  getCartsState,
  (state: State) => state.loaded
);

export const getCartsError = createSelector(
  getCartsState,
  (state: State) => state.error
);
