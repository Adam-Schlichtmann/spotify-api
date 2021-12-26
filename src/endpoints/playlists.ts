import { AxiosResponse } from "axios";
import { Album, BaseReturn, Playlist, Track, Image } from "../types";

export type PlaylistsEndpoints = {
  getPlaylist: (args: {
    endpoint: "/v1/playlists/{playlist_id}";
    method: "GET";
    params: {
      playlist_id: string;
      additional_types?: undefined;
      fields?: undefined;
      market?: string;
    };
  }) => Promise<AxiosResponse<Playlist>>;
  updatePlaylist: (args: {
    endpoint: "/v1/playlists/{playlist_id}";
    method: "PUT";
    params: { playlist_id: string };
    body: {
      name: string;
      public: boolean;
      collaborative: boolean;
      description: string;
    };
  }) => Promise<AxiosResponse<string>>;
  getPlaylistTracks: (args: {
    endpoint: "/v1/playlists/{playlist_id}/tracks";
    method: "GET";
    params: {
      playlist_id: string;
      additional_types?: undefined;
      fields?: undefined;
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Track>>>;
  addTracksToPlaylist: (args: {
    endpoint: "/v1/playlists/{playlist_id}/tracks";
    method: "POST";
    params: { playlist_id: string; position: number; uris: string[] };
  }) => Promise<AxiosResponse<{ snapshot_id: string }>>;
  updatePlaylistItems: (args: {
    endpoint: "/v1/playlists/{playlist_id}/tracks";
    method: "PUT";
    params: { playlist_id: string };
    body: {
      uris?: string[];
      range_start?: number;
      insert_before?: number;
      range_length?: number;
      snapshot_id?: string;
    };
  }) => Promise<AxiosResponse<{ snapshot_id: string }>>;
  removePlaylistItems: (args: {
    endpoint: "/v1/playlists/{playlist_id}/tracks";
    params: { playlist_id: string };
    method: "DELETE";
    body: { tracks: { uri: string }[]; snapshot_id: string };
  }) => Promise<AxiosResponse<{ snapshot_id: string }>>;
  getCurrentUserPlaylist: (args: {
    endpoint: "/v1/me/playlists";
    method: "GET";
    params?: { limit?: number; offset?: number };
  }) => Promise<AxiosResponse<BaseReturn<Playlist>>>;
  getUserPlaylists: (args: {
    endpoint: "/v1/users/{user_id}/playlists";
    method: "GET";
    params: { user_id: string; limit?: number; offset?: number };
  }) => Promise<AxiosResponse<BaseReturn<Playlist>>>;
  createPlaylist: (args: {
    endpoint: "/v1/user/{user_id}/playlists";
    method: "POST";
    params: { user_id: string };
    body: {
      name: string;
      public: boolean;
      collaborative: boolean;
      description: string;
    };
  }) => Promise<AxiosResponse<Playlist>>;
  getFeaturedPlaylists: (args: {
    endpoint: "/v1/browse/featured-playlists";
    method: "GET";
    params?: {
      country?: string;
      limit?: number;
      locale?: string;
      offset?: number;
      timestamp?: string;
    };
  }) => Promise<AxiosResponse<{ albums: BaseReturn<Album>; message: string }>>;
  getCategoriesPlaylists: (args: {
    endpoint: "/v1/browse/categories/{category_id}/playlists";

    method: "GET";
    params: {
      category_id: string;
      country?: string;
      limit?: number;
      offset?: number;
    };
  }) => Promise<AxiosResponse<{ albums: BaseReturn<Album>; message: string }>>;
  getPlaylistCoverImage: (args: {
    endpoint: "/v1/playlists/{playlist_id}/images";
    params: { playlist_id: string };
    method: "GET";
  }) => Promise<AxiosResponse<Image[]>>;
  addCustomPlaylistCoverImage: (args: {
    endpoint: "/v1/playlists/{playlist_id}/images";
    params: { playlist_id: string };
    method: "PUT";
  }) => Promise<AxiosResponse<string>>;
};
