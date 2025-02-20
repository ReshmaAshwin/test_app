"use client";
import { useSelector } from "react-redux";

import Footer from "../../../components/footer/page";
import MovieList from "../../../components/movieList/page.jsx";
import NavBar from "../../../components/navBar/page.jsx";
import GenreMovies from "@/components/genreMovies/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Genres() {
  const { hasMoreData } = useSelector((state) => state.movie);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const pathName = usePathname();
  const modifiedTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  
  useEffect(() => {
    if (pathName) {
      const urlArray = pathName.split("/");
      const genreId = urlArray[3];
      const title = urlArray[2];
      setId(genreId);
      setTitle(title)
    }
  }, [pathName]);

  return (
    <div className="">
      <NavBar />
      <div className="px-20">
        <MovieList />
        {!hasMoreData && (
          <>
            <div>
              <GenreMovies
                title={modifiedTitle}
                genreId={id}
              />
            </div>
          </>
        )}
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
