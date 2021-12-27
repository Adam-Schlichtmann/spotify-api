import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import {
  AlbumsEndpoints,
  ArtistsEndpoints,
  CategoriesEndpoints,
  EpisodesEndpoints,
  GenresEndpoints,
  MarketsEndpoints,
  PlayerEndpoints,
  PlaylistsEndpoints,
  SearchEndpoints,
  ShowsEndpoints,
  TracksEndpoints,
  UsersEndpoints,
} from "./endpoints";
import { cleanParams, fillInEndpoint } from "./helpers/endpointUtils";
import {
  Album,
  Artist,
  AuthTypes,
  BaseReturn,
  Category,
  LoginResponse,
  Options,
  Scope,
  Track,
} from "./types";

const TOKEN_URI = "https://accounts.spotify.com/api/token";
const BASE_URI = "https://api.spotify.com";

class Spotify {
  token?: LoginResponse & {
    expiresAt: number;
  };
  /**
   * ID of the app
   */
  clientID: string;
  /**
   * Secret of the app
   */
  clientSecret: string;
  /**
   * Redirect URI when using Authorization Code Flow
   *
   * @default undefined
   */
  redirectURI?: string;
  /**
   * Permission scopes to allow when using Authorization Flow
   *
   * @default only publicly available data is available
   */
  scopes?: Scope[];
  /**
   * Require the User to re-approve the app on every login
   *
   * @default false
   */
  requireDialog: boolean;
  /**
   * Authorization method to use
   */
  authorization: AuthTypes;

  constructor({
    authorization,
    clientID,
    clientSecret,
    redirectURI,
    scopes,
    requireDialog,
  }: Options) {
    this.authorization = authorization;
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.redirectURI = redirectURI;
    this.requireDialog = !!requireDialog;
    this.scopes = scopes;
    if (this.authorization === "client") this.auth.loginClientCredentials();
    if (this.authorization === "auth_flow") this.auth.loginAuthorizationCode();
    if (this.authorization === "implicit") this.auth.loginImplicitGrant();
  }

  auth = {
    loginClientCredentials: () =>
      axios
        .post<LoginResponse>(
          TOKEN_URI,
          qs.stringify({ grant_type: "client_credentials" }),
          {
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  this.clientID + ":" + this.clientSecret,
                  "ascii"
                ).toString("base64"),
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((resp) => {
          if (resp.status === 200) {
            this.token = {
              ...resp.data,
              expiresAt: new Date().getTime() + resp.data.expires_in,
            };
            console.log(this.token);
          }
        })
        .catch((e) => {
          throw e;
        }),
    /**
     * Incomplete
     * @
     */
    loginAuthorizationCode: async () => {
      try {
        const requestResponse = await axios.get(
          `${BASE_URI}/authorize${qs.stringify({
            client_id: this.clientID,
            response_type: "code",
            redirect_uri: this.redirectURI,
            state: undefined,
            scope: this.scopes,
            show_dialog: this.requireDialog,
          })}`
        );
        console.log(requestResponse);
      } catch (e) {
        console.log(e);
        // @ts-ignore
        console.log(e.response.data);
      }
    },
    /**
     * TODO: Create
     */
    loginImplicitGrant: () => {},
  };
  /**
   * Check if authentication is still valid
   *
   * @returns a boolean if auth is valid
   */
  private isAuthenticationValid = () =>
    this.token && Date.now() / 1000 < this.token.expiresAt - 300;

  /**
   * Helper function to get the generic headers for a request
   *
   * @returns some generic headers that all requests require
   */
  private getRequiredHeaders = () =>
    this.token
      ? {
          Authorization: `${this.token.token_type} ${this.token.access_token}`,
          "Content-Type": "application/json",
        }
      : undefined;

  /**
   * Generic request function to make a request to spotify
   *
   * @param endpoint endpoint to hit
   * @param method HTTP method
   * @param params query params
   * @param body body of the request
   * @returns a promise
   */
  request = async <T>(
    endpoint: string,
    method: AxiosRequestConfig["method"],
    params?: Record<string, unknown>,
    body?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> => {
    // Should be checking if auth is valid

    const queryString = qs.stringify(cleanParams(endpoint, params ?? {}));
    const fullEndpoint = `${BASE_URI}${fillInEndpoint(endpoint, params)}${
      queryString ? "?" : ""
    }${queryString}`;
    if (method === "GET")
      return axios.get(fullEndpoint, {
        headers: this.getRequiredHeaders(),
      });
    if (method === "POST")
      return axios.post(fullEndpoint, body, {
        headers: this.getRequiredHeaders(),
      });
    if (method === "DELETE")
      return axios.delete(fullEndpoint, {
        headers: this.getRequiredHeaders(),
      });
    if (method === "PUT")
      return axios.put(fullEndpoint, body, {
        headers: this.getRequiredHeaders(),
      });
    return new Promise((r, reject) => reject(new Error("Invalid Method")));
  };

  /**
   * Albums
   */
  albums: AlbumsEndpoints = {
    getAlbum: (args) =>
      this.request<Album>(args.endpoint, args.method, args.params),
    getAlbums: (args) =>
      this.request<{ albums: Album[] }>(
        args.endpoint,
        args.method,
        args.params
      ),
    getTracksForAlbum: (args) =>
      this.request<BaseReturn<Track>>(args.endpoint, args.method, args.params),
    getSavedAlbums: (args) =>
      this.request<BaseReturn<Album>>(args.endpoint, args.method, args.params),
    saveAlbum: (args) =>
      this.request<string>(args.endpoint, args.method, args.params),
    removeSavedAlbum: (args) =>
      this.request<string>(args.endpoint, args.method, args.params),
    checkSavedAlbums: (args) =>
      this.request<boolean[]>(args.endpoint, args.method, args.params),
    getNewlyReleasedAlbums: (args) =>
      this.request<{ albums: BaseReturn<Album> }>(
        args.endpoint,
        args.method,
        args.params
      ),
  };

  /**
   * Artists
   */
  artists: ArtistsEndpoints = {
    getArtist: (args) => this.request<Artist>(args.endpoint, args.method),
    getSeveralArtists: (args) =>
      this.request<{ artists: Artist[] }>(
        args.endpoint,
        args.method,
        args.params
      ),
    getArtistAlbums: (args) =>
      this.request<BaseReturn<Album>>(args.endpoint, args.method, args.params),
    getArtistRelatedArtist: (args) =>
      this.request<{ artists: Artist[] }>(args.endpoint, args.method),
    getArtistTopTracks: (args) =>
      this.request<{ tracks: Track[] }>(
        args.endpoint,
        args.method,
        args.params
      ),
  };

  /**
   * Categories
   */
  categories: CategoriesEndpoints = {
    getBrowseCategories: (args) =>
      this.request<BaseReturn<Category>>(
        args.endpoint,
        args.method,
        args.params
      ),
    getBrowseCategory: (args) =>
      this.request<Category>(args.endpoint, args.method, args.params),
  };

  /**
   * Episodes
   */
  episodes: EpisodesEndpoints = {
    checkSavedEpisodes: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getEpisode: (args) => this.request(args.endpoint, args.method, args.params),
    getEpisodes: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getUserSavedEpisodes: (args) =>
      this.request(args.endpoint, args.method, args.params),
    removeEpisode: (args) =>
      this.request(args.endpoint, args.method, args.params),
    saveEpisode: (args) =>
      this.request(args.endpoint, args.method, args.params),
  };

  /**
   * Genres
   */
  genre: GenresEndpoints = {
    availableGenreSeeds: (args) => this.request(args.endpoint, args.method),
  };

  /**
   * Markets
   */
  markets: MarketsEndpoints = {
    availableMarkets: (args) => this.request(args.endpoint, args.method),
  };

  /**
   * Player
   */
  player: PlayerEndpoints = {
    addItemToQueue: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getAvailableDevices: (args) => this.request(args.endpoint, args.method),
    getCurrentlyPlayingTrack: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getPlaybackState: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getRecentlyPlayedTracks: (args) =>
      this.request(args.endpoint, args.method, args.params),
    pausePlayback: (args) =>
      this.request(args.endpoint, args.method, args.params),
    seekToPosition: (args) =>
      this.request(args.endpoint, args.method, args.params),
    setPlaybackVolume: (args) =>
      this.request(args.endpoint, args.method, args.params),
    setRepeatMode: (args) =>
      this.request(args.endpoint, args.method, args.params),
    skipToNext: (args) => this.request(args.endpoint, args.method, args.params),
    skipToPrevious: (args) =>
      this.request(args.endpoint, args.method, args.params),
    startResumePlayback: (args) =>
      this.request(args.endpoint, args.method, args.params, args.body),
    togglePlaybackShuffle: (args) =>
      this.request(args.endpoint, args.method, args.params),
    transferPlayback: (args) =>
      this.request(args.endpoint, args.method, undefined, args.body),
  };

  /**
   * Playlists
   */
  playlists: PlaylistsEndpoints = {
    getPlaylist: (args) =>
      this.request(args.endpoint, args.method, args.params),
    updatePlaylist: (args) =>
      this.request(args.endpoint, args.method, undefined, args.body),
    getPlaylistTracks: (args) =>
      this.request(args.endpoint, args.method, args.params),
    addTracksToPlaylist: (args) =>
      this.request(args.endpoint, args.method, args.params),
    updatePlaylistItems: (args) =>
      this.request(args.endpoint, args.method, undefined, args.body),
    removePlaylistItems: (args) =>
      this.request(args.endpoint, args.method, undefined, args.body),
    getCurrentUserPlaylist: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getUserPlaylists: (args) =>
      this.request(args.endpoint, args.method, args.params),
    createPlaylist: (args) =>
      this.request(args.endpoint, args.method, undefined, args.body),
    getFeaturedPlaylists: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getCategoriesPlaylists: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getPlaylistCoverImage: (args) => this.request(args.endpoint, args.method),
    addCustomPlaylistCoverImage: (args) =>
      this.request(args.endpoint, args.method),
  };

  /**
   * Search
   */
  search: SearchEndpoints = {
    album: (args) => this.request(args.endpoint, args.method, args.params),
    artist: (args) => this.request(args.endpoint, args.method, args.params),
    playlist: (args) => this.request(args.endpoint, args.method, args.params),
    track: (args) => this.request(args.endpoint, args.method, args.params),
    show: (args) => this.request(args.endpoint, args.method, args.params),
    episode: (args) => this.request(args.endpoint, args.method, args.params),
  };

  /**
   * Shows
   */
  shows: ShowsEndpoints = {
    checkSavedShow: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getShow: (args) => this.request(args.endpoint, args.method, args.params),
    getShowEpisode: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getShows: (args) => this.request(args.endpoint, args.method, args.params),
    getUserSavedShows: (args) =>
      this.request(args.endpoint, args.method, args.params),
    removeShow: (args) => this.request(args.endpoint, args.method, args.params),
    saveShow: (args) => this.request(args.endpoint, args.method, args.params),
  };

  /**
   * Tracks
   */
  tracks: TracksEndpoints = {
    checkSavedTracks: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getRecommendations: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getTrack: (args) => this.request(args.endpoint, args.method, args.params),
    getTrackAudioAnalysis: (args) => this.request(args.endpoint, args.method),
    getTrackAudioFeatures: (args) => this.request(args.endpoint, args.method),
    getTracks: (args) => this.request(args.endpoint, args.method, args.params),
    getTracksAudioFeatures: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getUserTracks: (args) =>
      this.request(args.endpoint, args.method, args.params),
    removeTrack: (args) =>
      this.request(args.endpoint, args.method, args.params),
    saveTrack: (args) => this.request(args.endpoint, args.method, args.params),
  };

  /**
   * User
   */
  user: UsersEndpoints = {
    getCurrentUser: (args) => this.request(args.endpoint, args.method),
    getUserTopItems: (args) =>
      this.request(args.endpoint, args.method, args.params),
    getUserProfile: (args) => this.request(args.endpoint, args.method),
    followPlaylist: (args) =>
      this.request(args.endpoint, args.method, undefined, args.body),
    unFollowPlaylist: (args) => this.request(args.endpoint, args.method),
    getFollowedArtists: (args) =>
      this.request(args.endpoint, args.method, args.params),
    followArtistsOrUsers: (args) =>
      this.request(args.endpoint, args.method, args.params, args.body),
    unFollowArtistsOrUsers: (args) =>
      this.request(args.endpoint, args.method, args.params, args.body),
    checkIfUserFollowsArtistOrUser: (args) =>
      this.request(args.endpoint, args.method, args.params),
    checkIfUserFollowsPlaylist: (args) =>
      this.request(args.endpoint, args.method, args.params),
  };
}

export default Spotify;
