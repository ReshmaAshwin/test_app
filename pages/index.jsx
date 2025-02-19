"use client";
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import LatestMovies from "@/components/latestMovies/page";
import Classic from "@/components/classicMovie/page";

export default function Home() {
  const { hasMoreData } = useSelector((state) => state.movie);

  return (
    <div>
      <NavBar />
      <div className="px-20 ">
        <MovieList />
        {!hasMoreData && (
          <>
            <div>
              <LatestMovies />
            </div>
            <div>
              <Classic />
            </div>
            <div>
              <Footer />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
