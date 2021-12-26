import { AxiosResponse } from "axios";
import {
  AnalysisTatum,
  AudioAnalysis,
  AudioFeatures,
  BaseReturn,
  Recommendations,
  Track,
} from "../types";

export type TracksEndpoints = {
  getTrack: (args: {
    endpoint: "/v1/tracks/{track_id}";
    method: "GET";
    params: {
      track_id: string;
      market: string;
    };
  }) => Promise<AxiosResponse<Track>>;
  getTracks: (args: {
    endpoint: "/v1/tracks";
    method: "GET";
    params: {
      ids: string[];
      market?: string;
    };
  }) => Promise<AxiosResponse<{ tracks: Track[] }>>;
  getUserTracks: (args: {
    endpoint: "/v1/me/tracks";
    method: "GET";
    params?: {
      limit?: number;
      market?: string;
      offset?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Track>>>;
  saveTrack: (args: {
    endpoint: "/v1/me/tracks/";
    method: "PUT";
    params: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<string>>;
  removeTrack: (args: {
    endpoint: "/v1/me/tracks";
    method: "DELETE";
    params?: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<string>>;
  checkSavedTracks: (args: {
    endpoint: "/v1/me/tracks/contains";
    method: "GET";
    params: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<boolean[]>>;
  getTracksAudioFeatures: (args: {
    endpoint: "/v1/audio-features";
    method: "GET";
    params: {
      ids: string[];
    };
  }) => Promise<AxiosResponse<{ audio_features: AudioFeatures[] }>>;
  getTrackAudioFeatures: (args: {
    endpoint: "/v1/audio-features/{track_id}";
    method: "GET";
    params: { track_id: string };
  }) => Promise<AxiosResponse<AudioFeatures>>;
  getTrackAudioAnalysis: (args: {
    endpoint: "/v1/audio-analysis/{track_id}";
    method: "GET";
    params: { track_id: string };
  }) => Promise<AxiosResponse<AudioAnalysis>>;
  getRecommendations: (args: {
    endpoint: "/v1/recommendations";
    method: "GET";
    params?: {
      seed_artists: string[];
      seed_genres: string[];
      seed_tracks: string[];
      limit?: number;
      marker?: string;
      max_acousticness?: number;
      max_danceability?: number;
      max_duration_ms?: number;
      max_energy?: number;
      max_instrumentalness?: number;
      max_key?: number;
      max_liveness?: number;
      max_loudness?: number;
      max_mode?: number;
      max_popularity?: number;
      max_speechiness?: number;
      max_tempo?: number;
      max_time_signature?: number;
      max_valence?: number;
      min_acousticness?: number;
      min_danceability?: number;
      min_duration_ms?: number;
      min_energy?: number;
      min_instrumentalness?: number;
      min_key?: number;
      min_liveness?: number;
      min_loudness?: number;
      min_mode?: number;
      min_popularity?: number;
      min_speechiness?: number;
      min_tempo?: number;
      min_time_signature?: number;
      min_valence?: number;
      target_acousticness?: number;
      target_danceability?: number;
      target_duration_ms?: number;
      target_energy?: number;
      target_instrumentalness?: number;
      target_key?: number;
      target_liveness?: number;
      target_loudness?: number;
      target_mode?: number;
      target_popularity?: number;
      target_speechiness?: number;
      target_tempo?: number;
      target_time_signature?: number;
      target_valence?: number;
    };
  }) => Promise<AxiosResponse<Recommendations>>;
};
