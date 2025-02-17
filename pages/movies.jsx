"use client"
import { useSelector } from "react-redux";

import Footer from "../app/components/footer/page";
import MovieList from "../app/components/movieList/page.jsx";
import NavBar from "../app/components/navBar/page.jsx";
import LatestMovies from "@/app/components/latestMovies/page";
import ComedyMovies from "@/app/components/comedyMovies/page";

export default function Movies() {
  const { hasMoreData } = useSelector((state) => state.movie);
  
  return (
    <div className="bg-gradient-to-r from-white  to-[#f0ce97] ...">
      <NavBar />
      <div className="sm:px-10 md:px-20 lg:px-20">
        <MovieList />
        {!hasMoreData && (
          <>
            <div>
              <ComedyMovies />
            </div>
            <div>
              <LatestMovies />
            </div>
          </>
        )}
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
