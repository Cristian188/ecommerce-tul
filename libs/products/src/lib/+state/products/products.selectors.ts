import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from './products.models';
import {
  PRODUCTS_FEATURE_KEY,
  State,
  ProductPartialState,
  productAdapter,
} from './products.reducer';

// Lookup the 'Product' feature state managed by NgRx
export const getProductsState = createFeatureSelector<
  ProductPartialState,
  State
>(PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const getProductsLoaded = createSelector(
  getProductsState,
  (state: State) => state.loaded
);

export const getProductsError = createSelector(
  getProductsState,
  (state: State) => state.error
);

export const getAllProducts = createSelector(getProductsState, (state: State) =>
  selectAll(state)
);

export const getProductsEntities = createSelector(
  getProductsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProductsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getProductsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const selectEntity = (props: { id: string }) =>
  createSelector(getProductsEntities, (entities) => {
    return entities[props.id];
  });
