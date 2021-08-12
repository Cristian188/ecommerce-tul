import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CARTS_FEATURE_KEY,
  State,
  CartsPartialState,
  cartsAdapter,
} from './carts.reducer';

// Lookup the 'Carts' feature state managed by NgRx
export const getCartsState = createFeatureSelector<CartsPartialState, State>(
  CARTS_FEATURE_KEY
);

const { selectAll, selectEntities } = cartsAdapter.getSelectors();

export const getCartsLoaded = createSelector(
  getCartsState,
  (state: State) => state.loaded
);

export const getCartsError = createSelector(
  getCartsState,
  (state: State) => state.error
);

export const getAllCarts = createSelector(getCartsState, (state: State) =>
  selectAll(state)
);

export const getCartsEntities = createSelector(getCartsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getCartsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCartsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
