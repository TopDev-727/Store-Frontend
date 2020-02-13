import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { Compare } from '../../../components/Compare'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}));
jest.mock('@vue-storefront/core/modules/compare/mixins/compareMountedMixin', () => ({}))

describe('Compare', () => {
  it('removeFromCompare dispatches addItem action', () => {
    const product = {};

    const storeMock = {
      modules: {
        compare: {
          actions: {
            removeItem: jest.fn()
          },
          namespaced: true
        },
        attribute: {
          actions: {
            list: jest.fn(() => [])
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Compare, storeMock);

    (wrapper.vm as any).removeFromCompare(product);

    expect(storeMock.modules.compare.actions.removeItem).toBeCalledWith(expect.anything(), product, undefined);
  })
});
