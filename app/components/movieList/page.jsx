import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { fetchMovie } from "../../redux/movieSlicer";
import { getYear } from "../../utils/utils";
import LoadingSpinner from "../spinner/page";
import { setHasMoreData } from "../../redux/movieSlicer";

const MovieList = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movie);

  useEffect(() => {
    setMovies([]);
    setPage(1);

    if (!query.trim()) {
      setHasMore(false);
      dispatch(setHasMoreData(false))
    } else {
      setHasMore(true);
      dispatch(setHasMoreData(true))

    }
  }, [query]);

  // Handle when new movies are fetched and update the list
  useEffect(() => {
    if (movieData.data?.results) {
      setMovies((prevMovies) => [...prevMovies, ...movieData.data.results]);
    }
  }, [movieData.data?.results]);

  const handleScroll = () => {
    const footerHeight = 1000;
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - footerHeight - 10;
  
    if (bottom && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };
  

  // Debounce the search input and trigger API call after 1 second of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) return;
      setLoading(true);
      dispatch(fetchMovie({ query: query, page: page })).then(() =>
        setLoading(false)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, page]);

  // Check if there are more movies to load
  useEffect(() => {
    if (movieData.data?.results?.length < 20) {
      setHasMore(false);
      dispatch(setHasMoreData(false))
    }
  }, [movieData.data?.results]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  return (
    <div className= {`${hasMore? "min-h-screen":""}`} >
      <div className="App">
        <form className="mt-5">
          <div className="flex justify-center align-middle">
            <div
              className="border flex justify-between bg-white align-middle border-[#adabab] px-4 py-2
             rounded-full  md:w-1/2 sm:w-4/3"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie"
                className="border-none w-full outline-none"
              />
              <IoIosSearch className="" size={25} color="gray" />
            </div>
          </div>
        </form>

        {loading && <p className="text-center">Loading...</p>}
        {movieData.error && (
          <p className="text-center mt-2" style={{ color: "red" }}>
            {"Something Went wrong"}
          </p>
        )}

        <div className="flex justify-center align-middle mt-3">
          {movies.length > 0 ? (
            <ul className="flex flex-wrap justify-center gap-5">
              {movies.map((movie) => (
                <li
                  className="mb-2 md:w-[300px] lg:w-[200px]  w-[250px] p-2 gap-6 shadow-md transform transition-all hover:scale-105"
                  key={movie.id}
                >
                  <Link href={`movie/${movie.id}`}>
                    <div className="h-[300px] flex justify-center align-middle">
                      <img
                        className={`w-full h-full object-cover`}
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/images/unknown.jpg"
                        }
                        alt={movie.title}
                        width={100}
                      />
                    </div>

                    <h3 className="text-[20px] font-bold mt-2 truncate hover:underline">
                      {movie.title}
                    </h3>

                    <p className="text-[14px] text-[#858383]">
                      ({getYear(movie.release_date) || "unknown"})
                    </p>
                    {movie.overview ? (
                      <p className=" text-[12px] line-clamp-3">
                        {movie.overview}
                      </p>
                    ) : (
                      <p className="text-[12px]"> No description available</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {!hasMore && query.trim() && (
                <p className="text-center">No movies to display.</p>
              )}
            </>
          )}
        </div>
        {hasMore && !movieData.error && (
          <div className="mt-4 mb-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
     
    </div>
  );
};

export default MovieList;
