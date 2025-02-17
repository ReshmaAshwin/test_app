"use client"
import { useSelector } from "react-redux";

import Footer from "../app/components/footer/page";
import MovieList from "../app/components/movieList/page.jsx";
import NavBar from "../app/components/navBar/page.jsx";
import UpComingMovies from "@/app/components/upcomingMovies/page";

export default function Upcoming() {
  const { hasMoreData } = useSelector((state) => state.movie);

   return (
    <div className="bg-gradient-to-r from-white  to-[#f0ce97] ...">
      <NavBar />
      <div className="sm:px-10 md:px-20 lg:px-20">
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
