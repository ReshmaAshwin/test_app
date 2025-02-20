import Footer from "@/components/footer/page";
import MovieDetails from "@/components/movieDetails/page";
import NavBar from "@/components/navBar/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Movie = () => {
  const pathName = usePathname();
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    if (pathName) {
      const urlArray = pathName.split("/");
      const movId = urlArray[2];
      setMovieId(Number(movId));
    }
  }, [pathName]);

  if (movieId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" h-screen bg-black text-white">
      <NavBar />
      <MovieDetails id={movieId} />
      <Footer />
    </div>
  );
};

export default Movie;
