import { createAction, props } from '@ngrx/store';
import { CartsEntity } from './carts.models';

export const init = createAction('[Carts Page] Init');

export const loadCartsSuccess = createAction(
  '[Carts/API] Load Carts Success',
  props<{ carts: CartsEntity[] }>()
);

export const loadCartsFailure = createAction(
  '[Carts/API] Load Carts Failure',
  props<{ error: any }>()
);
