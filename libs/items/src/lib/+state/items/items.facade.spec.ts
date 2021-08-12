import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ItemsEntity } from './items.models';
import { ItemsEffects } from './items.effects';
import { ItemsFacade } from './items.facade';

import * as ItemsSelectors from './items.selectors';
import * as ItemsActions from './items.actions';
import {
  ITEMS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './items.reducer';

interface TestSchema {
  items: State;
}

describe('ItemsFacade', () => {
  let facade: ItemsFacade;
  let store: Store<TestSchema>;
  const createItemsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ItemsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ITEMS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ItemsEffects]),
        ],
        providers: [ItemsFacade],
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
      facade = TestBed.inject(ItemsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allItems$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allItems$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadItemsSuccess` to manually update list
     */
    it('allItems$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allItems$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          ItemsActions.loadItemsSuccess({
            items: [createItemsEntity('AAA'), createItemsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allItems$);
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
