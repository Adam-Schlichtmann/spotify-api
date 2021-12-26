import { AxiosResponse } from "axios";

export type GenresEndpoints = {
  availableGenreSeeds: (args: {
    endpoint: "/v1/recommendations/available-genre-seeds";
    method: "GET";
  }) => Promise<AxiosResponse<{ genres: string[] }>>;
};
