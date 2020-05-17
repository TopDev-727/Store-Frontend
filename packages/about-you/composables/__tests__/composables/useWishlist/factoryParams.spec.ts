import {
  getWishlist,
  addItemToWishlist,
  deleteItemFromWishlist
} from '@vue-storefront/about-you-api';
import { params } from '../../../src/composables/useWishlist/factoryParams';
import { BapiProduct } from '@aboutyou/backbone';
import { WishlistItem, WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';

jest.mock('@vue-storefront/about-you-api', () => ({
  getWishlist: jest.fn(async () => {}),
  addItemToWishlist: jest.fn(async () => {}),
  deleteItemFromWishlist: jest.fn(async () => {})
}));

describe('[about-you-composables] useWishlist factoryParams', () => {
  it('loadWishlist returns wishlist with items', async () => {
    const expectedWishlist = {
      basket: {
        items: [
          {id: 123}
        ]
      }
    };

    (getWishlist as jest.Mock).mockReturnValueOnce(expectedWishlist);
    expect(await params.loadWishlist()).toEqual(expectedWishlist.basket);
  });

  describe('addToWishlist', () => {
    it('calls addItemToWishlist endpoint and returns updated wishlist given quantity > 0 when product doesn\'t exists in wishlist', async () => {
      const initialWishlist: WishlistResponseData = {
        items: [],
        key: null
      };
      const expectedWishlist = {
        items: [{
          key: '',
          product: {
            id: 123
          } as any,
          variant: null
        }],
        key: null
      };

      const product: BapiProduct = {
        createdAt: '',
        id: 123,
        images: [],
        isActive: false,
        isNew: false,
        isSoldOut: false,
        updatedAt: '',
        variants: [
          {
            id: 1234567,
            createdAt: null,
            updatedAt: null,
            stock: null,
            price: null
          }
        ]
      };

      (addItemToWishlist as jest.Mock).mockReturnValueOnce({ basket: expectedWishlist });

      expect(await params.addToWishlist({ currentWishlist: initialWishlist, product })).toEqual(expectedWishlist);
    });

    it('calls deleteItemFromWishlist endpoint and returns updated wishlist given quantity = 0', async () => {
      const initialWishlist: WishlistResponseData = {
        items: [{
          key: '',
          product: {
            id: 123
          } as any,
          variant: null
        }],
        key: null
      };
      const expectedWishlist = {
        items: []
      };

      const product: BapiProduct = {
        createdAt: '',
        id: 123,
        images: [],
        isActive: false,
        isNew: false,
        isSoldOut: false,
        updatedAt: ''
      };

      (deleteItemFromWishlist as jest.Mock).mockReturnValueOnce(expectedWishlist);

      expect(await params.addToWishlist({ currentWishlist: initialWishlist, product })).toEqual(expectedWishlist);
    });
  });

  it('removeFromWishlist calls deleteItemFromWishlist endpoint and returns updated wishlist given product', async () => {
    const expectedWishlist = {
      items: [
        {id: 123}
      ]
    };

    const product: WishlistItem = {
      product: null,
      variant: null,
      key: '123'
    };

    (deleteItemFromWishlist as jest.Mock).mockReturnValueOnce(expectedWishlist);

    expect(await params.removeFromWishlist({ currentWishlist: null, product })).toEqual(expectedWishlist);
  });

  it('clearWishlist calls deleteItemFromWishlist endpoint for every product in the wishlist and returns updated wishlist with no items', async () => {
    const initialWishlist: WishlistResponseData = {
      items: [{
        key: '',
        product: {
          id: 123
        } as any
      }],
      key: null
    };

    const expectedWishlist: WishlistResponseData = {
      items: [],
      key: null
    };

    (deleteItemFromWishlist as jest.Mock).mockReturnValueOnce(expectedWishlist);

    expect(await params.clearWishlist({ currentWishlist: initialWishlist })).toEqual(expectedWishlist);
  });

  describe('isOnWishlist', () => {
    it('returns false if product does not exists in wishlist', () => {
      const currentWishlist: WishlistResponseData = {
        items: [],
        key: null
      };

      const product: BapiProduct = {
        createdAt: '',
        id: 123,
        images: [],
        isActive: false,
        isNew: false,
        isSoldOut: false,
        updatedAt: ''
      };

      expect(params.isOnWishlist({ currentWishlist, product })).toEqual(false);
    });

    it('returns true if product exists in wishlist', () => {
      const currentWishlist: WishlistResponseData = {
        items: [{
          key: '',
          product: {
            id: 123
          } as any,
          variant: null
        }],
        key: null
      };

      const product: BapiProduct = {
        createdAt: '',
        id: 123,
        images: [],
        isActive: false,
        isNew: false,
        isSoldOut: false,
        updatedAt: ''
      };

      expect(params.isOnWishlist({ currentWishlist, product })).toEqual(true);
    });
  });
});
