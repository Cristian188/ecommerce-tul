import { createAction, props } from '@ngrx/store';
import { Item } from './items.models';

export const loadItems = createAction(
  '[Cart Page] Load Items',
  props<{ cartId: string }>()
);

export const loadItemsSuccess = createAction(
  '[Cart/API] Load Items Success',
  props<{ items: Item[] }>()
);

export const loadItemsFailure = createAction(
  '[Cart/API] Load Items Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Cart/API] Add to Cart',
  props<{ productId: string; quantity: number; cartId: string }>()
);

export const addToCartSuccess = createAction(
  '[Cart/API] Add to Cart Success',
  props<{ itemId: string }>()
);

export const addToCartFailure = createAction(
  '[Cart/API] Add to Cart Failure',
  props<{ error: any }>()
);

export const removeFromCart = createAction(
  '[Cart/API] Remove from Cart',
  props<{ itemId: string }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart/API] Remove from Cart Success'
);

export const removeFromCartFailure = createAction(
  '[Cart/API] Remove from Cart Failure',
  props<{ error: any }>()
);

export const updateFromCart = createAction(
  '[Cart/API] Update from Cart',
  props<{ itemId: string; quantity: number }>()
);

export const updateFromCartSuccess = createAction(
  '[Cart/API] Update from Cart Success'
);

export const updateFromCartFailure = createAction(
  '[Cart/API] Update from Cart Failure',
  props<{ error: any }>()
);
