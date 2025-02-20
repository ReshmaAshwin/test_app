"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Slider from "react-slick";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getYear } from "@/utils/utils";
import LoadingSpinner from "../spinner/page";
import { fetchMovieByGenre } from "@/redux/movieByGenreSlicer";

const ComedyMovies = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.movieByGenre);
  const moviesData = data?.results;

  useEffect(() => {
    dispatch(fetchMovieByGenre({ genre: 35, page: 1 }));
  }, [dispatch]);

  // Slick slider settings
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: (
      <div className="slick-arrow slick-next">
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

  return (
    <div className="flex flex-col justify-center align-middle mt-6 mb-4">
      <div className="flex justify-between">
        <h3 className="text-[#fd5c63] md:ps-4 text-center lg:text-start md:text-center text-[16px] md:text-[18px] lg:text-[20px]  ">
          Comedy Movies
        </h3>
        <Link href={"/genres/comedy/35"}>
          <p className="underline text-[#fd5c63]">More</p>
        </Link>
      </div>
      {moviesData?.length > 0 ? (
        <div className="w-full">
          <Slider {...settings}>
            {moviesData.map((movie) => (
              <div
                className="mb-2 md:w-[300px] lg:w-[200px] w-[200px] p-2 gap-6 shadow-md transform transition-all hover:scale-105"
                key={movie.id}
              >
                <Link href={`movie/${movie.id}`}>
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

export default ComedyMovies;
