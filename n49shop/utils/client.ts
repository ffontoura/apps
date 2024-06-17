import { Cart, ProductBaseN49Shop } from "./types.ts";

export interface N49ShopAPI {
  "GET /v1/:storeId/products": {
    response: ProductBaseN49Shop[];
    searchParams: {
      handle?: string;
      q?: string;
      sort_by?: string;
      per_page?: number;
      page?: number;
      price_max?: string | null;
      price_min?: string | null;
    };
  };
  "GET /v1/:storeId/carts/:id": {
    response: Cart;
  };
}
