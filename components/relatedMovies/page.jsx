"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Slider from "react-slick";

import { fetchMovieByGenre } from "@/redux/movieByGenreSlicer";
import { getYear } from "@/utils/utils";
import LoadingSpinner from "../spinner/page";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RelatedMovies = ({ genreIds }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.movieByGenre);
  const latestMoviesData = data?.results;

  useEffect(() => {
    dispatch(fetchMovieByGenre({ genre: genreIds, page: 1 }));
  }, [genreIds]);

  // Slick slider settings
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: latestMoviesData?.length < 5 ? latestMoviesData?.length : 5,
    slidesToScroll: latestMoviesData?.length < 5 ? 0 : 5,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: (
      <div className={`slick-arrow slick-next `}>
        <FaChevronRight size={20} />
      </div>
    ),
    prevArrow: (
      <div className="slick-arrow slick-prev">
        <FaChevronLeft size={20} />
      </div>
    ), 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(latestMoviesData)

  return (
    <div className="flex flex-col justify-center align-middle px-20  mt-6 mb-4">
      <div className="flex justify-between">
        <h3 className="text-[#fd5c63] md:ps-4 text-center lg:text-start md:text-center text-[16px] md:text-[18px] lg:text-[20px]  ">
          Suggested
        </h3>
        <Link href={{ pathname: "/suggested", query: { genreIds: genreIds } }}>
          <p className="underline text-[#fd5c63]">More</p>
        </Link>
      </div>
      {latestMoviesData?.length > 0 ? (
        <div className={`${latestMoviesData?.length < 5 ? "w-auto" : "w-full"}`}>
          <Slider {...settings}>
            {latestMoviesData.map((movie) => (
              <div
                className="mb-2 md:w-[300px] lg:w-[200px] w-[200px] p-2 gap-6 shadow-md transform transition-all hover:scale-105"
                key={movie.id}
              >
                <Link href={`${movie.id}`}>
                  <div className="relative h-[300px] w-full">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        movie.backdrop_path
                          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                          : "/images/unknown.jpg"
                      }
                      alt={movie.title}
                      width={100}
                    />
                    {/* Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col text-white p-4 justify-end">
                      <h3 className="text-[16px] font-bold mt-2 truncate hover:underline">
                        {movie.title}
                      </h3>
                      <p className="text-[12px] ">
                        {getYear(movie.release_date) || "unknown"}
                      </p>
                      {movie.overview ? (
                        <p className="text-[10px] line-clamp-3">
                          {movie.overview}
                        </p>
                      ) : (
                        <p className="text-[12px] mb-6">
                          {"No description available"}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default RelatedMovies;
