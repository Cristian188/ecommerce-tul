import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as CartActions from './carts.actions';
import { CartService } from '../../carts.service';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ItemsActions } from '@tul/items';
import { loadItems } from 'libs/items/src/lib/+state/items/items.actions';

@Injectable()
export class CartsEffects {
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      exhaustMap(() =>
        this.cartService.getCart().pipe(
          map((cart) => CartActions.loadCartSuccess({ cart })),
          catchError(() =>
            of(
              CartActions.loadCartFailure({
                error: 'Unable to load cart',
              })
            )
          )
        )
      )
    )
  );

  loadCartSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCartSuccess),
      map((data) => ItemsActions.loadItems({ cartId: data.cart.id }))
    )
  );

  checkoutCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.checkoutCart),
      exhaustMap(() =>
        this.cartService.checkout().pipe(
          map(() => CartActions.checkoutCartSuccess()),
          catchError(() =>
            of(
              CartActions.checkoutCartFailure({
                error: 'Unable to checkout the cart',
              })
            )
          )
        )
      )
    )
  );

  checkoutCartSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.checkoutCartSuccess),
        map(() => this.cartService.removeCart())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private nzNotificationService: NzNotificationService
  ) {}
}
