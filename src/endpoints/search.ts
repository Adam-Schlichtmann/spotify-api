import { AxiosResponse } from "axios";
import {
  Album,
  Artist,
  Playlist,
  Track,
  Show,
  Episode,
  BaseReturn,
} from "../types";

export type SearchEndpoints = {
  album: (args: {
    endpoint: "/v1/search";
    method: "GET";
    params: {
      q: string;
      type: "album";
      include_external?: "audio";
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Album>>>;
  artist: (args: {
    endpoint: "/v1/search";
    method: "GET";
    params: {
      q: string;
      type: "artist";
      include_external?: "audio";
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Artist>>>;
  playlist: (args: {
    endpoint: "/v1/search";
    method: "GET";
    params: {
      q: string;
      type: "playlist";
      include_external?: "audio";
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Playlist>>>;
  track: (args: {
    endpoint: "/v1/search";
    method: "GET";
    params: {
      q: string;
      type: "track";
      include_external?: "audio";
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Track>>>;
  show: (args: {
    endpoint: "/v1/search";
    method: "GET";
    params: {
      q: string;
      type: "show";
      include_external?: "audio";
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Show>>>;
  episode: (args: {
    endpoint: "/v1/search";
    method: "GET";
    params: {
      q: string;
      type: "episode";
      include_external?: "audio";
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Episode>>>;
};
