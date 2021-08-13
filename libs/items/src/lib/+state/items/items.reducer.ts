import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ItemActions from './items.actions';
import { Item } from './items.models';
import { CartActions } from '@tul/carts';
export const ITEMS_FEATURE_KEY = 'item';

export interface State extends EntityState<Item> {
  selectedId?: string | number; // which Cart record has been selected
  loaded: boolean; // has the Cart list been loaded
  error?: string | null; // last known error (if any)
}

export interface ItemPartialState {
  readonly [ITEMS_FEATURE_KEY]: State;
}

export const itemAdapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialState: State = itemAdapter.getInitialState({
  selectedId: null,
  loaded: false,
  error: null,
});

const itemReducer = createReducer(
  initialState,
  on(ItemActions.loadItems, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ItemActions.loadItemsSuccess, (state, { items }) =>
    itemAdapter.setAll(items, { ...state, loaded: true })
  ),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({ ...state, error })),
  on(CartActions.checkoutCartSuccess, () => initialState)
);

export function reducer(state: State | undefined, action: Action) {
  return itemReducer(state, action);
}
