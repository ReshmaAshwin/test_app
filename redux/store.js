import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlicer";
import movieDetailsReducer from "./movieDetailsSlicer";
import latestMovieReducer from "./latestMoviesSlicer";
import classicMoviesReducer from "./classicMovies";
import comedyMovieReducer from "./comedyMovies";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    movieDetails: movieDetailsReducer,
    latestMovies: latestMovieReducer,
    classicMovies: classicMoviesReducer,
    comedyMovies: comedyMovieReducer,
  },
});
