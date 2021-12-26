import { AxiosResponse } from "axios";
import { BaseReturn, Category } from "../types";

export type CategoriesEndpoints = {
  getBrowseCategories: (args: {
    endpoint: "/v1/browse/categories";
    method: "GET";
    params?: {
      country?: string;
      limit?: number;
      locale?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Category>>>;
  getBrowseCategory: (args: {
    endpoint: "/v1/browse/categories/{category_id}";
    method: "GET";
    params: {
      category_id: string;
      country?: string;
      locale?: string;
    };
  }) => Promise<AxiosResponse<Category>>;
};
