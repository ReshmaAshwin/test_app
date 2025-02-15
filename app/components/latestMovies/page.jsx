'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { fetchLatestMovie } from "../../redux/latestMoviesSlicer";
import { getYear } from "@/app/utils/utils";
import LoadingSpinner from "../spinner/page";

const LatestMovies = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.latestMovies );
  const latestMoviesData = data?.results?.slice(0, 5) || [];

  useEffect(() => {
    dispatch(fetchLatestMovie());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center align-middle mt-6 mb-4">
      <h3 className="text-[#fd5c63] md:ps-4 text-center lg:text-start md:text-center text-[20px] ">Popular Movies</h3>
      {latestMoviesData?.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-5">
          {latestMoviesData?.map((movie) => (
            <li
              className="mb-2 md:w-[300px] lg:w-[200px] w-[250px] p-2 gap-6 shadow-md transform transition-all hover:scale-105"
              key={movie.id}
            >
              <Link href={`movie/${movie.id}`}>
                <div className="relative h-[300px] w-full">
                  <img
                    className={`w-full h-full object-cover`}
                    src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`: "/images/unknown.jpg"}
                    alt={movie.title}
                    width={100}
                  />
                  {/* Overlay */}
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col  text-white p-4 justify-end">
                    <h3 className="text-[16px] font-bold mt-2 truncate hover:underline">
                      {movie.title}
                    </h3>
                    <p className="text-[12px] ">
                      ({getYear(movie.release_date) || "unknown"})
                    </p>
                    {
                        movie.overview ?(
                            <p className="text-[10px] line-clamp-3 ">{movie.overview}</p>
                        ): (
                            
                            <p  className="text-[12px] mb-6">{"No description available"}</p>
                        )
                    }
                   
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default LatestMovies;
