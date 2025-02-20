'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { getYear } from "@/utils/utils";
import LoadingSpinner from "../spinner/page";
import { fetchMovieByGenre } from "@/redux/movieByGenreSlicer";

const GenreMovies = ({title, genreId}) => {
  const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const data  = useSelector((state) => state.movieByGenre.data || []);

  useEffect(()=>{
    setHasMore(true);
  },[])

  useEffect(()=>{
    setPage(1)
    setMovies([])
  },[genreId])

  // Handle when new movies are fetched and update the list
  useEffect(() => {
    if (data?.results) {
      setMovies((prevMovies) => [...prevMovies, ...data?.results]);
    }
  }, [data?.results]);

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight  -  10;

    if (bottom && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

   useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(true);
        dispatch(fetchMovieByGenre({genre:genreId, page:page})).then(() =>
          setLoading(false)
        );
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [ page, genreId]);

    // Check if there are more movies to load
      useEffect(() => {
        if (data?.results?.length < 20) {
          setHasMore(false);
        }
      }, [data?.results]);
    
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [loading, hasMore, page]);


  return (
    <div className="flex flex-col justify-center align-middle mt-6 mb-4">
      <h3 className="text-[#fd5c63] ps-4 text-[16px] md:text-[18px] lg:text-[20px]  ">{title} Movies</h3>
      {movies?.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-5">
          {movies?.map((movie) => (
            <li
              className="mb-2 md:w-[300px] lg:w-[200px] w-[250px] p-2 gap-6 shadow-md transform transition-all hover:scale-105"
              key={movie.id}
            >
              <Link href={`/movie/${movie.id}`}>
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
                      ({getYear(movie.release_date)|| "unknown"} )
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
       {hasMore && !data?.error && (
          <div className="mt-4 mb-4">
            <LoadingSpinner />
          </div>
        )}
    </div>
  );
};

export default GenreMovies;
