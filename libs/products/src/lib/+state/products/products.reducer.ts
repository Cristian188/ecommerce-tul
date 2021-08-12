import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ProductActions from './products.actions';
import { Product } from './products.models';

export const PRODUCTS_FEATURE_KEY = 'product';

export interface State extends EntityState<Product> {
  selectedId?: string | number; // which Product record has been selected
  loaded: boolean; // has the Product list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProductPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: State = productAdapter.getInitialState({
  selectedId: null,
  loaded: false,
  error: null,
});

const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    productAdapter.setAll(products, { ...state, loaded: true })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
