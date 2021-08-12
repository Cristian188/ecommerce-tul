import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CartsActions from './carts.actions';
import { CartsEntity } from './carts.models';

export const CARTS_FEATURE_KEY = 'carts';

export interface State extends EntityState<CartsEntity> {
  selectedId?: string | number; // which Carts record has been selected
  loaded: boolean; // has the Carts list been loaded
  error?: string | null; // last known error (if any)
}

export interface CartsPartialState {
  readonly [CARTS_FEATURE_KEY]: State;
}

export const cartsAdapter: EntityAdapter<CartsEntity> = createEntityAdapter<CartsEntity>();

export const initialState: State = cartsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const cartsReducer = createReducer(
  initialState,
  on(CartsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(CartsActions.loadCartsSuccess, (state, { carts }) =>
    cartsAdapter.setAll(carts, { ...state, loaded: true })
  ),
  on(CartsActions.loadCartsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return cartsReducer(state, action);
}
