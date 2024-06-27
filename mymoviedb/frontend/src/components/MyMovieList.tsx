import React from 'react';
import MyMovieItem from './MyMovieItem';

export interface Movie {
  imdbid: string;
  title: string;
  poster: string;
  trailer_link: string;
  is_favorite: boolean;
}

interface Props {
  movies: Movie[];
  apiKey: string;
}

const MyMovieList: React.FC<Props> = ({ movies, apiKey }) => {
  return (
    <div className="row">
      {movies.map(movie => (
        <MyMovieItem key={movie.imdbid} movie={movie} apiKey={apiKey} />
      ))}
    </div>
  );
};

export default MyMovieList;
