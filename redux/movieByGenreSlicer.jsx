import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovieByGenre = createAsyncThunk(
  "fetchMovieByGenre",
  async ({ genre, page }) => {
    const genreId = genre.toString();
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=e13ceb01cda9475783d91f5f870080fe&with_genres=${genreId}&certification=PG-13&page=${page}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch movies");
    }

    return response.json();
  }
);

export const movieByGenreSlice = createSlice({
  name: "movieByGenreSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
    currentPage: 1,
    hasMoreData: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieByGenre.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovieByGenre.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMovieByGenre.rejected, (state, action) => {
      state.error = true;
    });
  },
  reducers: {
    setHasMoreData: (state, action) => {
      state.hasMoreData = action.payload;
    },
  },
});

export const { setHasMoreData } = movieByGenreSlice.actions;
export default movieByGenreSlice.reducer;
