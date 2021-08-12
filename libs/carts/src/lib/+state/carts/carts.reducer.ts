import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CartActions from './carts.actions';
import { Cart, CartStatus } from './carts.models';

export const CARTS_FEATURE_KEY = 'cart';

export interface State extends EntityState<Cart> {
  selectedId?: string | number; // which Cart record has been selected
  loaded: boolean; // has the Cart list been loaded
  error?: string | null; // last known error (if any)
}

export interface CartPartialState {
  readonly [CARTS_FEATURE_KEY]: State;
}

export const cartAdapter: EntityAdapter<Cart> = createEntityAdapter<Cart>();

export const initialState: State = cartAdapter.getInitialState({
  selectedId: null,
  loaded: false,
  error: null,
});

const cartReducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CartActions.loadCartSuccess, (state, { cart }) =>
    cartAdapter.setOne(cart, { ...state, loaded: true })
  ),
  on(CartActions.loadCartFailure, (state, { error }) => ({ ...state, error })),
  on(CartActions.checkoutCartSuccess, (state) => initialState)
);

export function reducer(state: State | undefined, action: Action) {
  return cartReducer(state, action);
}
