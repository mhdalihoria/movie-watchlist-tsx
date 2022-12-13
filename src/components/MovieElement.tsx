import React, { useState } from "react";
import addIcon from '../images/add-icon.png'
import removeIcon from '../images/remove-icon.png'
import starIcon from '../images/star-icon.png'


type Props = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  Metascore?: number;
  Runtime?: number;
  Genre?: string;
  text?: string;
  Plot?: string;
  setLocalStorageObj: React.Dispatch<React.SetStateAction<object>> | undefined;
  fromWatchlist?: boolean;
};
//This is the component that represents every single movie "card"
export default function MovieElement(props: Props) {
  //   const [movieInfo, setMovieInfo] = useState(props);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleClick = () => {
    setIsAdded((prevIsAdded) => !prevIsAdded);
    if (!isAdded) {
      props?.setLocalStorageObj?.((prevLocalStorageObj) => {
        return {
          ...prevLocalStorageObj,
          [props.imdbID]: {
            ...props,
          },
        };
      });
    }
    if (isAdded) {
      props.setLocalStorageObj?.((prevLocalStorageObj) => {
        delete prevLocalStorageObj[props.imdbID as keyof object];
        return { ...prevLocalStorageObj };
      });
    }
  };

  return (
    <div className="movie-container" id={props.imdbID}>
      <div className="left">
        <img src={props.Poster} alt="cover image" />
      </div>
      <div className="right">
        <div className="title-div">
          <span className="title">{props.Title}</span>{" "}
          <img src={starIcon} alt="star icon" />
          <span className="metascore">
           {"  "} {props.Metascore !== undefined ? Number.isNaN(props.Metascore / 10) ? 0.0 : props.Metascore/10 : 0.0}
          </span>
        </div>
        <div className="movie-info-div">
          <span>{props.Runtime}</span>
          <span>{props.Genre}</span>
          {props.fromWatchlist === true ? (
            ""
          ) : (
            <button className="watchlist-btn" onClick={handleClick}>
              <img
                src={isAdded ? removeIcon : addIcon}
                alt="add to watch list btn"
              />
              <span>{isAdded ? " Remove" : " Watchlist"}</span>
            </button>
          )}
        </div>
        <div className="plot-div">
          <p>{props.Plot}</p>
        </div>
      </div>
    </div>
  );
}
