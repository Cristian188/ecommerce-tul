import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ItemsEffects } from './items.effects';
import * as ItemsActions from './items.actions';

describe('ItemsEffects', () => {
  let actions: Observable<any>;
  let effects: ItemsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ItemsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ItemsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ItemsActions.init() });

      const expected = hot('-a-|', {
        a: ItemsActions.loadItemsSuccess({ items: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
