import { AxiosResponse } from "axios";
import { BaseReturn, Episode, Show } from "../types";

export type ShowsEndpoints = {
  getShow: (args: {
    endpoint: "/v1/shows/{show_id}";
    method: "GET";
    params: {
      show_id: string;
      market?: string;
    };
  }) => Promise<AxiosResponse<Show>>;
  getShows: (args: {
    endpoint: "/v1/shows";
    method: "GET";
    params: {
      ids: string[];
      market?: string;
    };
  }) => Promise<AxiosResponse<{ shows: Show[] }>>;
  getShowEpisode: (args: {
    endpoint: "/v1/shows/{show_id}/episodes";
    method: "GET";
    params: {
      show_id: string;
      market?: string;
      limit?: number;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Episode>>>;
  getUserSavedShows: (args: {
    endpoint: "/v1/shows";
    method: "GET";
    params?: {
      limit?: number;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Show>>>;
  saveShow: (args: {
    endpoint: "/v1/me/shows";
    method: "PUT";
    params: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<string>>;
  removeShow: (args: {
    endpoint: "/v1/me/shows";
    method: "DELETE";
    params: {
      ids: number[];
      market?: string;
    };
  }) => Promise<AxiosResponse<string>>;
  checkSavedShow: (args: {
    endpoint: "/v1/me/shows/contains";
    method: "GET";
    params: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<boolean[]>>;
};
