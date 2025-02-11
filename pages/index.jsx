import Footer from "../app/components/footer/page";
import MovieList from "../app/components/movieList/page.jsx";
import NavBar from "../app/components/navBar/page.jsx";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-white  to-[#f0ce97] ...">
      <NavBar />
      <div className="sm:px-10 md:px-20 lg:px-20">
        <MovieList />
      </div>
      <Footer />
    </div>
  );
}