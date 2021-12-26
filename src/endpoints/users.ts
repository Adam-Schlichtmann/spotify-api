import { AxiosResponse } from "axios";
import { Artist, BaseReturn, User } from "../types";

export type UsersEndpoints = {
  getCurrentUser: (args: {
    endpoint: "/v1/me";
    method: "GET";
  }) => Promise<AxiosResponse<User>>;
  getUserTopItems: (args: {
    endpoint: "/v1/me/{type}";
    method: "GET";
    params: {
      type: "artists" | "tracks";
      limit?: number;
      offset?: number;
      time_range?: "long_term" | "short_term" | "medium_term";
    };
  }) => Promise<AxiosResponse<BaseReturn<Artist>>>;
  getUserProfile: (args: {
    endpoint: "/v1/users/{user_id}";
    method: "GET";
    params: { user_id: string };
  }) => Promise<AxiosResponse<User>>;
  followPlaylist: (args: {
    endpoint: "/v1/playlist/{playlist_id}/followers";
    method: "PUT";
    params: { playlist_id: string };
    body?: { public?: boolean };
  }) => Promise<AxiosResponse<string>>;
  unFollowPlaylist: (args: {
    endpoint: "/v1/playlist/{playlist{playlist_id}/followers";
    params: { playlist_id: string };
    method: "DELETE";
  }) => Promise<AxiosResponse<string>>;
  getFollowedArtists: (args: {
    endpoint: "/v1/me/following";
    method: "GET";
    params: {
      type: "artist";
      after?: string;
      limit?: number;
    };
  }) => Promise<AxiosResponse<{ artists: BaseReturn<Artist> }>>;
  followArtistsOrUsers: (args: {
    endpoint: "/v1/me/following";
    params: { ids: string[]; type: "artist" | "user" };
    body: { ids: string[] };
    method: "PUT";
  }) => Promise<AxiosResponse<string>>;
  unFollowArtistsOrUsers: (args: {
    endpoint: "/v1/me/following";
    params: { ids: string[]; type: "artist" | "user" };
    body: { ids: string[] };
    method: "DELETE";
  }) => Promise<AxiosResponse<string>>;
  checkIfUserFollowsArtistOrUser: (args: {
    endpoint: "/v1/me/following/contains";
    params: {
      ids: string[];
      type: "artist" | "user";
    };
    method: "GET";
  }) => Promise<AxiosResponse<boolean[]>>;
  checkIfUserFollowsPlaylist: (args: {
    endpoint: "/v1/playlists/{playlist_id}/followers/contains";
    params: { playlist_id: string; ids: string[] };
    method: "GET";
  }) => Promise<AxiosResponse<boolean[]>>;
};
