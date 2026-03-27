import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TFoundListItemView } from '../components/FoundListItemView';
import { TMovieCardView } from '../components/MovieCardView';

export interface IMovieState {
  foundMovies: TFetchMovies;
  favoriteMovies: TFoundListItemView[];
  movieCard: TMovieCardView | null;
  isLoading: boolean;
  error: SerializedError | null;
}

export type TFetchMovies = {
  Response: string;
  Search: TFoundListItemView[];
  totalResults: string;
  Error?: string;
};

const initialState: IMovieState = {
  foundMovies: {
    Response: '',
    Search: [],
    totalResults: '',
    Error: ''
  },
  favoriteMovies: [],
  movieCard: null,
  isLoading: false,
  error: null
};

const API_KEY = import.meta.env.VITE_OMDB_API_KEY_PRIMARY || '64405bd2';
const BASE_URL = import.meta.env.VITE_OMDB_API_URL || 'https://www.omdbapi.com';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (title: string) => {
    const url = `${BASE_URL}?apikey=${API_KEY}&type=movie&s=${encodeURIComponent(title)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data as TFetchMovies;
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (imdbID: string) => {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as TMovieCardView;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  
  reducers: {
    addToFavorites: (state, action: PayloadAction<TFoundListItemView>) => {
      state.favoriteMovies = [...state.favoriteMovies, action.payload];
    },
    deleteFromFavorites: (state, action: PayloadAction<string>) => {
      state.favoriteMovies = state.favoriteMovies.filter((el) => el.imdbID !== action.payload);
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.foundMovies = {
          Response: '',
          Search: [],
          totalResults: '',
          Error: ''
        };
        state.movieCard = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<TFetchMovies>) => {
        if (action.payload.Response === 'True') {
          state.foundMovies = action.payload;
        } else {
          state.foundMovies = {
            Search: [],
            Response: action.payload.Response,
            totalResults: '',
            Error: action.payload.Error
          };
        }
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.movieCard = null;
        state.foundMovies = {
          Response: '',
          Search: [],
          totalResults: '',
          Error: ''
        };
      })
      .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<TMovieCardView>) => {
        state.isLoading = false;
        state.movieCard = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.movieCard = null;
      });
  },
});

export const { addToFavorites, deleteFromFavorites } = moviesSlice.actions;
export const selectFoundMovies = (state: RootState) => state.movies.foundMovies;
export const selectFavoritesMovies = (state: RootState) => state.movies.favoriteMovies;
export const selectMovieCard = (state: RootState) => state.movies.movieCard;
export const selectError = (state: RootState) => state.movies.error;
export const selectLoading = (state: RootState) => state.movies.isLoading;
export default moviesSlice.reducer;