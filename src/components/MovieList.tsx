import { useEffect, useState } from "react";
import MovieElement from "./MovieElement";

type Props = {
  setLocalStorageObj?: React.Dispatch<React.SetStateAction<object>> | undefined;
  movieInfo: {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
  }[];
  fromWatchlist?: boolean

};

export default function MovieList({ movieInfo, setLocalStorageObj, fromWatchlist }: Props) {
  return (
    <>
      {movieInfo?.map((movie, index) => {
        return (
          <MovieElement
            key={index}
            {...movie}
            setLocalStorageObj={setLocalStorageObj}
            fromWatchlist = {fromWatchlist}
          />
        );
      })}
    </>
  );
}
