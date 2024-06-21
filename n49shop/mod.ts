import type {
  App as A,
  AppContext as AC,
  AppMiddlewareContext as AMC,
  ManifestOf,
} from "deco/mod.ts";
import { createHttpClient } from "../utils/http.ts";
import workflow from "../workflows/mod.ts";
import { N49ShopAPI } from "./utils/client.ts";
import { fetchSafe } from "../utils/fetch.ts";
import manifest, { Manifest } from "./manifest.gen.ts";

import { ClientOf } from "../utils/http.ts";
import PreviewN49shop from "./preview/index.tsx";

export type App = ReturnType<typeof N49shop>;
export type AppContext = AC<App>;
export type AppManifest = ManifestOf<App>;
export type AppMiddlewareContext = AMC<App>;

interface State {
  api: ClientOf<N49ShopAPI>;
  publicUrl: string;
  storeId: string;
  apiKey: string;
}

export let state: null | State = null;

/** @title N49shop */
export interface Props {
  /**
   * @title Public URL
   * @description Your N49shop url, example: https://yourstore.api.n49shop.com.br/api
   */

  publicUrl: string;

  /**
   * @description STORE ID
   */
  storeId: string;

  /**
   * @title API KEY
   */
  apiKey: string;

  /**
   * @description Use N49shop as backend platform
   */
  platform: "n49shop";
}

export const color = 0x272D4B;

/**
 * @title N49shop
 * @description Loaders, actions and workflows for adding N49shop Commerce Platform to your website.
 * @category Ecommmerce
 * @logo https://suporte.n49.com.br/assets/images/logo/logo.png
 */
export default function N49shop(
  { storeId, apiKey, publicUrl }: Props,
) {
  const stringApiKey = typeof apiKey === "string" ? apiKey : "";

  const headers = new Headers();
  headers.set("accept", "application/json");
  headers.set("X-API-KEY", `${stringApiKey}`);
  headers.set("content-type", "application/json");

  const api = createHttpClient<N49ShopAPI>({
    base: `${publicUrl}`,
    fetcher: fetchSafe,
    headers: headers,
  });

  state = {
    api,
    publicUrl: publicUrl,
    storeId: storeId,
    apiKey: stringApiKey,
  };

  const app: A<Manifest, State, [ReturnType<typeof workflow>]> = {
    state,
    manifest,
    dependencies: [workflow({})],
  };

  return app;
}

export const Preview = PreviewN49shop;
