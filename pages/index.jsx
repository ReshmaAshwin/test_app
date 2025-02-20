"use client";
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import AnimatedMovies from "@/components/animatedMovies/page";
import Classic from "@/components/dramaMovies/page";

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
              <AnimatedMovies />
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
