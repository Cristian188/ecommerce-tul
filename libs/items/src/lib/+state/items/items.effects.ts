import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as ItemActions from './items.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ItemsService } from '../../items.service';

@Injectable()
export class ItemsEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      exhaustMap(({ cartId }) =>
        this.itemsService.getItemsFromCartById(cartId).pipe(
          map((items) => ItemActions.loadItemsSuccess({ items })),
          catchError(() =>
            of(
              ItemActions.loadItemsFailure({
                error: 'Unable to load the items',
              })
            )
          )
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.addToCart),
      exhaustMap(({ productId, quantity, cartId }) =>
        this.itemsService
          .addProductToCartById(productId, quantity, cartId)
          .pipe(
            map((itemId) => ItemActions.addToCartSuccess({ itemId })),
            catchError(() =>
              of(
                ItemActions.addToCartFailure({
                  error: 'Unable to add the item',
                })
              )
            )
          )
      )
    )
  );

  addToCartSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ItemActions.addToCartSuccess),
        map(() =>
          this.nzNotificationService.success('Product', 'Product was added', {
            nzPlacement: 'topRight',
          })
        )
      ),
    { dispatch: false }
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.removeFromCart),
      exhaustMap(({ itemId }) =>
        this.itemsService.removeItemById(itemId).pipe(
          map(() => ItemActions.removeFromCartSuccess()),
          catchError(() =>
            of(
              ItemActions.removeFromCartFailure({
                error: 'Unable to remove the item',
              })
            )
          )
        )
      )
    )
  );

  updateFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.updateFromCart),
      exhaustMap(({ itemId, quantity }) =>
        this.itemsService.updateItemById(itemId, quantity).pipe(
          map(() => ItemActions.updateFromCartSuccess()),
          catchError(() =>
            of(
              ItemActions.updateFromCartFailure({
                error: 'Unable to update the item',
              })
            )
          )
        )
      )
    )
  );

  updateFromCartSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ItemActions.updateFromCartSuccess),
        map(() =>
          this.nzNotificationService.success('Product', 'Product was updated', {
            nzPlacement: 'topRight',
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService,
    private nzNotificationService: NzNotificationService
  ) {}
}
