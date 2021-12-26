import { AxiosResponse } from "axios";

export type MarketsEndpoints = {
  availableMarkets: (args: {
    endpoint: "/v1/markets";
    method: "GET";
  }) => Promise<AxiosResponse<{ markets: string[] }>>;
};
