import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLatestMovie = createAsyncThunk(
  "fetchLatestMovie",
  async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=e13ceb01cda9475783d91f5f870080fe&with_genres=16&language=en-US&page=1`
      

    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch movies");
    }

    return response.json();
  }
);

export const latestMovieSlice = createSlice({
  name: "latestMovieSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatestMovie.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLatestMovie.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchLatestMovie.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default latestMovieSlice.reducer;
