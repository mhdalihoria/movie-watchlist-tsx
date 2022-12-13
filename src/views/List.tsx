import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { Link } from "react-router-dom";
import addIcon from '../images/add-icon.png'

type Props = {};

export default function List({}: Props) {
  const [moviesFromStorage, setMoviesFromStorage] = useState<
    {
      Poster: string;
      Title: string;
      Type: string;
      Year: string;
      imdbID: string;
    }[]
  >([]);

  const [fromWatchlist, setFromWatchlist] = useState<boolean>(true);

  useEffect(() => {
    try {
      let moviesLocalStorage = JSON.parse(localStorage.getItem("movies") || "");
      moviesLocalStorage = Object.values(moviesLocalStorage);

      setMoviesFromStorage((prevMovies) => {
        return [...moviesLocalStorage];
      });
    } catch (e) {
      console.log(e);
      setMoviesFromStorage([]);
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("movies");
    setMoviesFromStorage([]);
  };

  return (
    <div>
      {moviesFromStorage.length !== 0 ? (
        <div className="movie-list">
          <div className="delete-all">
            <button onClick={handleClick}>Delete All</button>
          </div>
          <MovieList
            movieInfo={moviesFromStorage}
            fromWatchlist={fromWatchlist}
          />
        </div>
      ) : (
        <div className="watchlist-default">
          <p>Your watchlist is looking a little empty...</p>
          <Link to="/" className="add-movies">
            <img src={addIcon} alt="" />
            <span> Let's add some movies!</span>
          </Link>
        </div>
      )}
    </div>
  );
}
