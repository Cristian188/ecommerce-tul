import { CartsEntity } from './carts.models';
import { State, cartsAdapter, initialState } from './carts.reducer';
import * as CartsSelectors from './carts.selectors';

describe('Carts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCartsId = (it) => it['id'];
  const createCartsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CartsEntity);

  let state;

  beforeEach(() => {
    state = {
      carts: cartsAdapter.setAll(
        [
          createCartsEntity('PRODUCT-AAA'),
          createCartsEntity('PRODUCT-BBB'),
          createCartsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Carts Selectors', () => {
    it('getAllCarts() should return the list of Carts', () => {
      const results = CartsSelectors.getAllCarts(state);
      const selId = getCartsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CartsSelectors.getSelected(state);
      const selId = getCartsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCartsLoaded() should return the current 'loaded' status", () => {
      const result = CartsSelectors.getCartsLoaded(state);

      expect(result).toBe(true);
    });

    it("getCartsError() should return the current 'error' state", () => {
      const result = CartsSelectors.getCartsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
