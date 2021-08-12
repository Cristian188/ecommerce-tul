import { createAction, props } from '@ngrx/store';
import { Cart } from './carts.models';

export const loadCart = createAction('[Cart Page] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart/API] Load Cart Success',
  props<{ cart: Cart }>()
);

export const loadCartFailure = createAction(
  '[Cart/API] Load Cart Failure',
  props<{ error: any }>()
);

export const checkoutCart = createAction('[Cart/API] Checkout');

export const checkoutCartSuccess = createAction('[Cart Page] Checkout Success');

export const checkoutCartFailure = createAction(
  '[Cart Page] Checkout Failure',
  props<{ error: any }>()
);
