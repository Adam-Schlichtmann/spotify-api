import { AxiosResponse } from "axios";
import { BaseReturn, Device, Track } from "../types";

export type PlayerEndpoints = {
  getPlaybackState: (args: {
    endpoint: "/v1/me/player/currently-playing";
    method: "GET";
    params?: {
      additional_types: undefined;
      market?: string;
    };
  }) => Promise<AxiosResponse<string>>;
  transferPlayback: (args: {
    endpoint: "/v1/me/player";
    method: "PUT";
    body: {
      device_ids: string[];
      play?: boolean;
    };
  }) => Promise<AxiosResponse<string>>;
  getAvailableDevices: (args: {
    endpoint: "/v1/me/player/devices";
    method: "GET";
  }) => Promise<AxiosResponse<{ devices: Device[] }>>;
  getCurrentlyPlayingTrack: (args: {
    endpoint: "/v1/me/player/currently-playing";
    method: "GET";
    params?: {
      additional_types: undefined;
      market?: string;
    };
  }) => Promise<AxiosResponse<string>>;
  startResumePlayback: (args: {
    endpoint: "/v1/me/player/play";
    method: "PUT";
    params?: {
      device_id: string;
    };
    body?: {
      context_uri?: string;
      uris?: string[];
      offset?: {};
      position_ms?: number;
    };
  }) => Promise<AxiosResponse<string>>;
  pausePlayback: (args: {
    endpoint: "/v1/me/player/pause";
    method: "PUT";
    params?: {
      device_id: string;
    };
  }) => Promise<AxiosResponse<string>>;
  skipToNext: (args: {
    endpoint: "/v1/me/player/next";
    method: "POST";
    params?: {
      device_id: string;
    };
  }) => Promise<AxiosResponse<string>>;
  skipToPrevious: (args: {
    endpoint: "/v1/me/player/previous";
    method: "POST";
    params?: {
      device_id: string;
    };
  }) => Promise<AxiosResponse<string>>;
  seekToPosition: (args: {
    endpoint: "/v1/me/player/seek";
    method: "PUT";
    params: {
      position_ms: number;
      device_id?: string;
    };
  }) => Promise<AxiosResponse<string>>;
  setRepeatMode: (args: {
    endpoint: "/v1/me/player/repeat";
    method: "PUT";
    params: {
      state: "track" | "context" | "off";
      device_id?: string;
    };
  }) => Promise<AxiosResponse<string>>;
  setPlaybackVolume: (args: {
    endpoint: "/v1/me/player/volume";
    method: "PUT";
    params: {
      volume_percent: number;
      device_id?: string;
    };
  }) => Promise<AxiosResponse<string>>;
  togglePlaybackShuffle: (args: {
    endpoint: "/v1/me/player/shuffle";
    method: "PUT";
    params: {
      state: boolean;
      device_id?: string;
    };
  }) => Promise<AxiosResponse<string>>;
  getRecentlyPlayedTracks: (args: {
    endpoint: "/v1/me/player/recently-played";
    method: "GET";
    params?: {
      after?: string;
      before?: number;
      limit?: number;
    };
  }) => Promise<AxiosResponse<BaseReturn<Track>>>;
  addItemToQueue: (args: {
    endpoint: "/v1/me/player/queue";
    method: "POST";
    params: {
      device_ids?: string;
      uri: string;
    };
  }) => Promise<AxiosResponse<string>>;
};
