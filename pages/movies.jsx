"use client"
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import LatestMovies from "@/components/latestMovies/page";
import ComedyMovies from "@/components/comedyMovies/page";

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
