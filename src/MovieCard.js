import React from "react";
import noImage from './images/no-image.png';

const MovieCard = ({ movie }) => {
    const genreList = {
        28 : "Action",
        12 : "Adventure",
        16 : "Animation",
        35 : "Comedy",
        80 : "Crime",
        99 : "Documentary",
        18 : "Drama",
        10751 : "Family",
        14 : "Fantasy",
        36 : "History",
        27 : "Horror",
        10402 : "Music",
        9648 : "Mystery",
        10749 : "Romance",
        878 : "Science Fiction",
        10770 : "TV Movie",
        53 : "Thriller",
        10752 : "War",
        37 : "Western"
    };

    function getGenre(genres) {
        let movieGenres = [];
        genres.forEach((el) => {
            movieGenres.push(genreList[el]);
        });
        return movieGenres;
    }
    let genre = [];
    genre = getGenre(movie.genre_ids.slice(0, 3));

    function getYear(date) {
        if (date !== "") {
            let gYear = new Date(date);
            gYear = gYear.getFullYear() + 1;
            gYear = gYear - 1;
            return gYear;
        } else {
            return 0;
        }
    }
    const year = getYear(movie.release_date);

    return (
        <div className="movie-card" key={movie.id + "-card"}>
            <div className="mc-img" key={movie.id + "-img"}>
                <img src={movie.poster_path !== null ? "http://image.tmdb.org/t/p/w500" + movie.poster_path : noImage} alt={movie.title} key={movie.id + "-img2"} />
            </div>

            <div className="mc-info" key={movie.id + "-title"}>
                <h3 className="mc-title" key={movie.id + "-title2"}>{movie.title}</h3>

                <div className="more-info" key={movie.id + "-more"}>
                    {year > 0 ? (
                        <div className="mc-year" key={movie.id + "-year"}>
                            <p key={movie.id + "-year2"}>{year}</p>
                        </div>
                    ) : (
                        <div className="mc-year" key={movie.id + "-year"}></div>
                    )}

                    <div className="mc-genres" key={movie.id + "-genres"}>
                        {genre.map((gen) => (
                            <span className="mc-genre" key={movie.id + "-" + gen}>{gen}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;
