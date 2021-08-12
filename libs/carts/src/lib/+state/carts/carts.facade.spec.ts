import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CartsEntity } from './carts.models';
import { CartsEffects } from './carts.effects';
import { CartsFacade } from './carts.facade';

import * as CartsSelectors from './carts.selectors';
import * as CartsActions from './carts.actions';
import {
  CARTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './carts.reducer';

interface TestSchema {
  carts: State;
}

describe('CartsFacade', () => {
  let facade: CartsFacade;
  let store: Store<TestSchema>;
  const createCartsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CartsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CARTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CartsEffects]),
        ],
        providers: [CartsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CartsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCarts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allCarts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCartsSuccess` to manually update list
     */
    it('allCarts$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCarts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          CartsActions.loadCartsSuccess({
            carts: [createCartsEntity('AAA'), createCartsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allCarts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
