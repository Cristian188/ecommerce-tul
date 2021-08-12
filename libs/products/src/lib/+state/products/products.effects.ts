import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ProductsService } from '../../products.service';
import * as ProductActions from './products.actions';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError(() =>
            of(
              ProductActions.loadProductsFailure({
                error: 'Unable to load products',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}
}
