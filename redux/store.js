import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlicer";
import movieDetailsReducer from "./movieDetailsSlicer";
import latestMovieReducer from "./latestMoviesSlicer";
import classicMoviesReducer from "./classicMoviesSlicer";
import comedyMovieReducer from "./comedyMoviesSlicer";
import movieByGenreReducer from "./movieByGenreSlicer";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    movieDetails: movieDetailsReducer,
    latestMovies: latestMovieReducer,
    classicMovies: classicMoviesReducer,
    comedyMovies: comedyMovieReducer,
    movieByGenre: movieByGenreReducer,
  },
});
