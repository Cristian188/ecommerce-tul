import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CartsEffects } from './carts.effects';
import * as CartsActions from './carts.actions';

describe('CartsEffects', () => {
  let actions: Observable<any>;
  let effects: CartsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CartsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CartsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CartsActions.init() });

      const expected = hot('-a-|', {
        a: CartsActions.loadCartsSuccess({ carts: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
