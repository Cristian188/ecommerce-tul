import { createAction, props } from '@ngrx/store';
import { ItemsEntity } from './items.models';

export const init = createAction('[Items Page] Init');

export const loadItemsSuccess = createAction(
  '[Items/API] Load Items Success',
  props<{ items: ItemsEntity[] }>()
);

export const loadItemsFailure = createAction(
  '[Items/API] Load Items Failure',
  props<{ error: any }>()
);
