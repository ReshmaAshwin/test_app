'use client'
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import LatestMovies from "@/components/latestMovies/page";
import Classic from "@/components/classicMovie/page";

export default function Home() {
  const { hasMoreData } = useSelector((state) => state.movie);

  return (
    <div className="bg-gradient-to-r from-white  to-[#f0ce97] ...">
      <NavBar />
      <div className="sm:px-10 md:px-20 lg:px-20">
        <MovieList />
        {!hasMoreData && (
          <>
            <div>
              <LatestMovies />
            </div>
            <div>
              <Classic />
            </div>
          </>
        )}
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
