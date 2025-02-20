"use client";
import { useSelector } from "react-redux";

import Footer from "../components/footer/page";
import MovieList from "../components/movieList/page.jsx";
import NavBar from "../components/navBar/page.jsx";
import GenreMovies from "@/components/genreMovies/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Upcoming() {
  const { hasMoreData } = useSelector((state) => state.movie);
  const [id, setId] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      const { genreIds } = router.query;
      setId(genreIds);
    }
  }, [pathName]);

  console.log(pathName);
  return (
    <div className="">
      <NavBar />
      <div className="px-20">
        <MovieList />
        {!hasMoreData && (
          <>
            <div>
              <GenreMovies title={"Suggested"} genreId={id} />
            </div>
          </>
        )}
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
