import { AxiosResponse } from "axios";
import { Album, BaseEndpoint, BaseReturn, Track } from "../types";

export type AlbumsEndpoints = {
  getAlbum: (args: {
    endpoint: "/v1/albums/{id}";
    method: "GET";
    params: { id: string; market?: string };
  }) => Promise<AxiosResponse<Album>>;
  getAlbums: (args: {
    endpoint: "/v1/albums";
    method: "GET";
    params: { ids: string[]; market?: string };
  }) => Promise<AxiosResponse<{ albums: Album[] }>>;
  getTracksForAlbum: (args: {
    endpoint: "/v1/albums/{id}/tracks";
    method: "GET";
    params: { id: string; market?: string; limit?: number; offset?: number };
  }) => Promise<AxiosResponse<BaseReturn<Track>>>;
  getSavedAlbums: (args: {
    endpoint: "/v1/me/albums";
    method: "GET";
    params?: { market?: string; limit?: number; offset: number };
  }) => Promise<AxiosResponse<BaseReturn<Album>>>;
  saveAlbum: (args: {
    endpoint: "/v1/me/albums";
    method: "PUT";
    params: { ids: string[] };
  }) => Promise<AxiosResponse<string>>;
  removeSavedAlbum: (args: {
    endpoint: "/v1/me/albums";
    method: "DELETE";
    params: { ids: string[] };
  }) => Promise<AxiosResponse<string>>;
  checkSavedAlbums: (args: {
    endpoint: "/v1/me/albums/contains";
    method: "GET";
    params: { ids: string[] };
  }) => Promise<AxiosResponse<boolean[]>>;
  getNewlyReleasedAlbums: (args: {
    endpoint: "/v1/browse/new-release";
    method: "GET";
    params: { country?: string; limit?: number; offset?: number };
  }) => Promise<AxiosResponse<{ albums: BaseReturn<Album> }>>;
};
