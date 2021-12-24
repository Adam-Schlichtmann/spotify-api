import { AxiosResponse } from "axios";
import { BaseReturn, Episode } from "../types";

export type EpisodesEndpoints = {
  getEpisode: (args: {
    endpoint: "/v1/episodes/{episode_id}";
    method: "GET";
    params: {
      episode_id: string;
      market?: string;
    };
  }) => Promise<AxiosResponse<Episode>>;
  getEpisodes: (args: {
    endpoint: "/v1/episodes";
    method: "GET";
    params: {
      ids: string[];
      market?: string;
    };
  }) => Promise<AxiosResponse<{ episodes: Episode[] }>>;
  getUserSavedEpisodes: (args: {
    endpoint: "/v1/me/episodes";
    method: "GET";
    params?: {
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Episode>>>;
  saveEpisode: (args: {
    endpoint: "/v1/me/episodes";
    method: "PUT";
    params: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<string>>;
  removeEpisode: (args: {
    endpoint: "/v1/me/episodes";
    method: "DELETE";
    params: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<string>>;
  checkSavedEpisodes: (args: {
    endpoint: "/v1/me/episodes/contains";
    method: "GET";
    params: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<boolean[]>>;
};
