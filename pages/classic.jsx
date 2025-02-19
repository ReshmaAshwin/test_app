'use client'
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import TopRatedMovies from "@/components/topRatedMovies/page";

export default function ClassicMovie() {
  const { hasMoreData } = useSelector((state) => state.movie);

   return (
    <div className="">
      <NavBar />
      <div className="px-20">
        <MovieList />
        {!hasMoreData && (
          <>
            
            <div>
              <TopRatedMovies />
            </div>
          </>
        )}
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
