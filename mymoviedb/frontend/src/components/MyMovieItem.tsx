import React, { useState } from 'react';
import { toggleFavorite, deleteMovie } from '../services/myMovieService';
import { useLocation } from 'react-router-dom';
import { Movie } from './MyMovieList';

interface Props {
  movie: Movie;
  apiKey: string;
}

const MyMovieItem: React.FC<Props> = ({ movie, apiKey }) => {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(movie.is_favorite);

  const handleFavorite = async () => {
    await toggleFavorite(apiKey, movie.imdbid);
    setIsFavorite(!isFavorite);
  };

  const handleDelete = async () => {
    await deleteMovie(apiKey, movie.imdbid);
    window.location.reload();
  };

  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card h-100">
        <img src={movie.poster} className="card-img-top" alt={movie.title} />
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h5 className="card-title text-center">{movie.title}</h5>
          <div className="mt-auto">
            <button
              className={`btn mb-2 mx-2 ${isFavorite ? 'btn-secondary' : 'btn-primary'}`}
              onClick={handleFavorite}
            >
              {isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
            {isFavorite && location.pathname === '/fav' ? null : (
              <button className="btn btn-danger mb-2" onClick={handleDelete}>Delete</button>
            )}
            <a className="btn btn-warning mb-2 mx-2" href={movie.trailer_link} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMovieItem;
