"use client"
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import AnimatedMovies from "@/components/animatedMovies/page";

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
              <AnimatedMovies />
            </div>
          </>
        )}
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
