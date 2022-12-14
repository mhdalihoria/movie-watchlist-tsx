import React, { useEffect, useState } from "react";
import { movieObj } from "../components/Interface";
import MovieList from "../components/MovieList";
import defaultMovieIcon from "../images/default-movie-icon.png"


type Props = {};


export default function Home({}: Props) {
  const [query, setQuery] = useState<string>("");
  const [resultsList, setResultsList] = useState<string | movieObj[]>();
  const [search, setSearch] = useState<string>("");
  const [movieInfo, setMovieInfo] = useState<movieObj[]>([]);
  const [localStorageObj, setLocalStorageObj] = useState<object>(() => {
    try { //try and catch blocks to protect us from JSON.parse errors
      const savedItem = localStorage.getItem("movies");
      const parsedItem = JSON.parse(savedItem !== null ? savedItem : "");
      return parsedItem;
    } catch (e) {
      console.log(e);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSearch(query);
    if (query !== search) {
      setMovieInfo([]);
    }
  };

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(localStorageObj));
  }, [localStorageObj]);

  useEffect(() => {
    async function getMovies(search: string) {
      try {
        const results = await fetch(
          `https://www.omdbapi.com/?apikey=317bd43c&s=${search}`
        );
        const data = await results.json();

        if (data.Response === "True") {
          setResultsList(data.Search);
        } else if (data.Response !== "True" && search !== "") {
          setResultsList(
            "Unable to find what you’re looking for. Please try another search."
          );
        }
      } catch (e) {
        console.error(e);
      }
    }

    let modifiedSearchStr = search.toLowerCase();
    if (modifiedSearchStr[0] === " ") {
      modifiedSearchStr = modifiedSearchStr.substring(
        1,
        modifiedSearchStr.length
      );
    }
    getMovies(modifiedSearchStr);
  }, [search]);

  useEffect(() => {
    async function getMovieInfo(movie: movieObj) {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=317bd43c&i=${movie.imdbID}`
        );
        const data = await response.json();

        setMovieInfo((prevMovieInfo) => {
          return [...prevMovieInfo, data];
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (typeof resultsList !== "undefined") {
      for (let results of resultsList) {
        if (typeof results !== "string") {
          getMovieInfo(results);
        }
      }
    }
  }, [resultsList]);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className="input"
          name="query"
          value={query}
          onChange={(e) => handleChange(e)}
          placeholder="Search for a movie"
        />
        <button
          type="submit"
          className="submit-btn btn"
          onClick={(e) => clickHandler(e)}
        >
          Search
        </button>
      </div>

      <div className="movie-list">
        {typeof resultsList === "string" ? (
          <div className="error">
            <p>
              Unable to find what you’re looking for.
              <br /> Please try another search.
            </p>
          </div>
        ) : search.length === 0 ? (
          <div className="default">
            <img
              src={defaultMovieIcon}
              alt="default movie icon"
            />
            <p>Start Exploring</p>
          </div>
        ) : (
          <MovieList
            movieInfo={movieInfo}
            setLocalStorageObj={setLocalStorageObj}
          />
        )}
      </div>
    </div>
  );
}
