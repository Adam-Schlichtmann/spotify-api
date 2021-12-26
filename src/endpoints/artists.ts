import { AxiosResponse } from "axios";
import { Album, Artist, BaseReturn, Track } from "../types";

export type ArtistsEndpoints = {
  getArtist: (args: {
    endpoint: "/v1/artists/{artist_id}";
    method: "GET";
    params: { artist_id: string };
  }) => Promise<AxiosResponse<Artist>>;
  getSeveralArtists: (args: {
    endpoint: "/v1/artist";
    method: "GET";
    params: { ids: string[] };
  }) => Promise<AxiosResponse<{ artists: Artist[] }>>;
  getArtistAlbums: (args: {
    endpoint: "/v1/artists/{artist_id}/albums";
    method: "GET";
    params: {
      artist_id: string;
      include_groups?: ("album" | "single" | "appears_on" | "compilation")[];
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Album>>>;
  getArtistTopTracks: (args: {
    endpoint: "/v1/artists/{artist_id}/top-tracks";
    method: "GET";
    endpointValues: {};
    params: { artist_id: string; market?: string };
  }) => Promise<AxiosResponse<{ tracks: Track[] }>>;
  getArtistRelatedArtist: (args: {
    endpoint: "/v1/artists/{artist_id}/related-artists";
    method: "GET";
    params: { artist_id: string };
  }) => Promise<AxiosResponse<{ artists: Artist[] }>>;
};
