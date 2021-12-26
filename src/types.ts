import { AxiosRequestConfig } from "axios";

export type SearchResponse = {
  tracks?: {
    href: string;
    items: Track[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
  artists?: {
    href: string;
    items: Artist[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
};

export type BaseReturn<T> = {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

export type Track = {
  album: Album[];
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Record<string, string>;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
};

export type Image = {
  height: number;
  url: string;
  width: number;
};

export type Artist = {
  external_urls: Record<string, string>;
  followers: { href: string; total: number };
  genres: string[];
  images: Image[];
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
};

export type Album = {
  album_type: "album" | "single" | "compilation";
  artists: Artist[];
  available_markets: string[];
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  type: "album";
  uri: string;
};

export type Playlist = {
  collaborative: boolean;
  description: string;
  external_urls: Record<string, string>;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: "string";
    external_urls: {
      spotify: "string";
    };
    followers: {
      href: "string";
      total: 0;
    };
    href: "string";
    id: "string";
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n";
        height: 300;
        width: 300;
      }
    ];
    type: "user";
    uri: "string";
  };
  public: boolean;
  snapshot_id: string;
  tracks: BaseReturn<Track>;
  type: string;
  uri: string;
};

export type User = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: Record<string, string>;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: "user";
  uri: string;
};

type CopyRight = { text: string; type: string };

export type Show = {
  available_markets: string[];
  copyrights: CopyRight[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  episodes: BaseReturn<Episode>;
};

export type Episode = {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "day" | "month" | "year";
  resume_point: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: "episode";
  uri: string;
  restrictions: Record<string, string>;
  show: Show;
};

export type Category = {
  href: string;
  icons: Image[];
  id: string;
  name: string;
};

export type Device = {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: "show";
  volume_percent: number;
};

export type AudioFeatures = {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: "audio_features";
  uri: string;
  valence: number;
};

export type AnalysisBar = {
  start: number;
  duration: number;
  confidence: number;
};
export type AnalysisBeat = {
  start: number;
  duration: number;
  confidence: number;
};
export type AnalysisSection = {
  start: number;
  duration: number;
  confidence: number;
  loudness: number;
  tempo: number;
  tempo_confidence: number;
  key: 9;
  key_confidence: number;
  mode: number;
  mode_confidence: number;
  time_signature: number;
  time_signature_confidence: number;
};

export type AnalysisTatum = {
  start: number;
  duration: number;
  confidence: number;
};
export type AnalysisSegment = {
  start: number;
  duration: number;
  confidence: number;
  loudness_start: number;
  loudness_max: number;
  loudness_max_time: number;
  loudness_end: number;
  pitches: number[];
  timbre: number[];
};

export type AudioAnalysis = {
  meta: {
    analyzer_version: string;
    platform: string;
    detailed_status: string;
    status_code: number;
    timestamp: number;
    analysis_time: number;
    input_process: string;
  };
  track: {
    num_samples: number;
    duration: number;
    sample_md5: string;
    offset_seconds: number;
    window_seconds: number;
    analysis_sample_rate: number;
    analysis_channels: number;
    end_of_fade_in: number;
    start_of_fade_out: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    codestring: string;
    code_version: number;
    echoprintstring: string;
    echoprint_version: number;
    synchstring: string;
    synch_version: number;
    rhythmstring: string;
    rhythm_version: number;
  };
  bars: AnalysisBar[];
  beats: AnalysisBeat[];
  sections: AnalysisSection[];
  segments: AnalysisSegment[];
  tatums: AnalysisTatum[];
};

export type RecommendationSeed = {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
};
export type Recommendations = {
  seeds: RecommendationSeed[];
  tracks: Track[];
};

export type BaseEndpoint = {
  endpoint: string;
  method: AxiosRequestConfig["method"];
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
};
