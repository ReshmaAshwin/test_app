"use client";
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import UpComingMovies from "@/components/upcomingMovies/page";

export default function Upcoming() {
  const { hasMoreData } = useSelector((state) => state.movie);

  return (
    <div className="">
      <NavBar />
      <div className="px-20">
        <MovieList />
        {!hasMoreData && (
          <>
            <div>
              <UpComingMovies />
            </div>
          </>
        )}
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
