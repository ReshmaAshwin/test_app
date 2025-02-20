"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

import { fetchMovieDetails } from "@/redux/movieDetailsSlicer";
import { convertMinutesToHours, getYear } from "@/utils/utils";
import RelatedMovies from "../relatedMovies/page";

const MovieDetails = ({ id }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.movieDetails);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [id, dispatch]);

  const handlePopup = () => {
    setPopup(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setPopup(false);
    document.body.style.overflow = "auto";
  };

  const duration = convertMinutesToHours(data?.runtime);
  const genreIds = data?.genres?.map((genre) => genre.id).join(",");

  return (
    <div className="bg-[#0a0a0a]">
      <div className="relative flex gap-6 justify-center flex-col md:flex-row p-8 mb-6">
        <div className="h-auto w-auto flex flex-1 justify-center shadow-xl shadow-gray-700  p-4">
          <img
            className=""
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/w500${data?.poster_path}`
                : "/images/unknown.jpg"
            }
            alt={data?.title}
            height={300}
            width={400}
          />
        </div>
        <div className="flex flex-1 flex-col ps-4">
          <h3 className="md:text-[38px] text-[28px] underline">
            {data?.title}
          </h3>
          <div className="mt-3 text-[10px] md:text-[12px] flex gap-6 items-center">
            <p>{getYear(data?.release_date) || "unknown"}</p>
            <div className="h-[10px] w-[10px] bg-red-700 rounded-full"></div>
            <p>
              {data?.genres?.map((item, index) => {
                return (
                  <span key={index}>
                    {item.name} {index === data.genres.length - 1 ? "" : ","}{" "}
                  </span>
                );
              })}{" "}
            </p>
            <div className="h-[10px] w-[10px] bg-red-700 rounded-full"></div>
            <div>
              Duration: {`${duration.hours} hours ${duration.minutes} minutes`}
            </div>
          </div>
          <div className="mt-4">{data?.overview}</div>
          <div className="mt-10 flex gap-4">
            <div className="flex justify-center items-center">
              {data?.backdrop_path && (
                <img
                  className=""
                  src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                  alt={data?.title}
                  height={300}
                  width={300}
                />
              )}
            </div>
          </div>
          <div className="flex gap-9">
            <button
              className="mt-6 w-[90px] flex justify-center items-center gap-2 rounded-sm bg-white text-black"
              onClick={handlePopup}
            >
              <FaPlay />
              <div>Play</div>
            </button>
            <button className="mt-6 outline-none w-[120px] flex justify-center items-center gap-2 rounded-sm bg-[#828080] text-white">
              <IoIosInformationCircleOutline />
              <div>More Info</div>
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {popup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg w-[80%] md:w-[60%]">
            <button
              className="flex justify-end items-end w-full"
              onClick={handleClosePopup}
            >
              <IoIosCloseCircle size={25} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Movie Trailer / Player
            </h2>
            <div className="flex justify-center items-center mb-4">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div>
        <RelatedMovies genreIds={genreIds} />
      </div>
    </div>
  );
};

export default MovieDetails;
