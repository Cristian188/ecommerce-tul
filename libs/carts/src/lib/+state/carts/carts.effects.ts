import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CartsFeature from './carts.reducer';
import * as CartsActions from './carts.actions';

@Injectable()
export class CartsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CartsActions.loadCartsSuccess({ carts: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CartsActions.loadCartsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
