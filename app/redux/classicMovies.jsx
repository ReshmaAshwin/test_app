import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchClassicMovies = createAsyncThunk(
  "fetchClassicMovies",
  async (search) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${search}?api_key=e13ceb01cda9475783d91f5f870080fe&language=en-US&page=1`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch movies");
    }

    return response.json();
  }
);

export const classicMovieSlice = createSlice({
  name: "classicMovieSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClassicMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClassicMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchClassicMovies.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default classicMovieSlice.reducer;
