import { productsApiMock } from "./products.mock";
import { productsApiHttp } from "./products.http";
import type { ProductsApi } from "./products.api";

const USE_API = import.meta.env.VITE_USE_API === "true";

export const productsApi: ProductsApi = USE_API
  ? productsApiHttp
  : productsApiMock;
