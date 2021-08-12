import { CartsEntity } from './carts.models';
import * as CartsActions from './carts.actions';
import { State, initialState, reducer } from './carts.reducer';

describe('Carts Reducer', () => {
  const createCartsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CartsEntity);

  beforeEach(() => {});

  describe('valid Carts actions', () => {
    it('loadCartsSuccess should return set the list of known Carts', () => {
      const carts = [
        createCartsEntity('PRODUCT-AAA'),
        createCartsEntity('PRODUCT-zzz'),
      ];
      const action = CartsActions.loadCartsSuccess({ carts });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
