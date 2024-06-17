import type { Product } from "../../commerce/types.ts";
import { toProduct } from "../utils/transform.ts";
import { N49ShopSort, ProductBaseN49Shop } from "../utils/types.ts";
import { AppContext } from "../mod.ts";

export interface Props {
  /** @description query to use on search. if used will break sort */
  term?: string;

  /** @description total number of items to display */
  limit: number;

  /** @description search sort parameter */
  sort?: N49ShopSort;
}

/**
 * @title N49Shop Integration - Search products
 */
async function loader(
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Product[] | null> {
  const { api, storeId } = ctx;
  const { url } = req;

  let result: ProductBaseN49Shop[] | undefined;

  try {
    const response = await api["GET /v1/:storeId/products"]({
      storeId: storeId,
      q: props.term || "",
      sort_by: props.sort || "user",
      per_page: props.limit || 10,
    });
    result = await response.json();
  } catch {
    result = [];
  }

  console.log(result);

  const products = result?.map((product) => {
    return toProduct(product.variants[0], product, new URL(url), 0);
  }).flat();

  return products || [];
}

export default loader;
