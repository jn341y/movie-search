import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import SearchImage from './images/search.svg';

const tmdbUrl = "https://api.themoviedb.org/3/search/movie?api_key=[API KEY]&include_adult=false";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${tmdbUrl}&query=${encodeURI(title)}`);
        const data = await response.json();
        setMovies(data.results);
    }

    useEffect(() => {
        searchMovies("The Matrix");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovies(searchTerm);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    function useScrollDirection() {
        const [scrollDirection, setScrollDirection] = useState(null);
    
        useEffect(() => {
            let lastScrollY = window.pageYOffset;
            const updateScrollDirection = () => {
                const scrollY = window.pageYOffset;
                const direction = scrollY > lastScrollY ? "down" : "up";
                if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                    setScrollDirection(direction);
                }
                lastScrollY = scrollY > 0 ? scrollY : 0;
            };
            window.addEventListener("scroll", updateScrollDirection);
            return () => {
                window.removeEventListener("scroll", updateScrollDirection);
            }
        }, [scrollDirection]);
        return scrollDirection;
    };
    const scrollDirection = useScrollDirection();

    return (
        <div className="movie-search-app">
            <h1>Movie Search</h1>

            <div className={`search-container ${ scrollDirection === "down" ? "hide" : "show" }`}>
                <div className="search">
                    <form onSubmit={handleSubmit}>
                        <input id="movie" placeholder="Search for a movie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button type="submit"><img src={SearchImage} alt="search" /></button>
                    </form>
                </div>
            </div>

            { movies?.length > 0
                ? (
                    <div className="container">
                        {movies.slice(0, 20).map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;
