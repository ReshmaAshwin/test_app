"use client";
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import GenreMovies from "@/components/genreMovies/page";

export default function ClassicMovie() {
  const { hasMoreData } = useSelector((state) => state.movie);

  return (
    <div className="">
      <NavBar />
      <div>
        <MovieList />
        {!hasMoreData && (
          <>
            <div>
              <GenreMovies title={"action"} genreId={28} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
