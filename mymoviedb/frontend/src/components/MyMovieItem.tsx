import React from 'react';
import { toggleFavorite, deleteMovie } from '../services/myMovieService';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Movie {
  imdbid: string;
  title: string;
  poster: string;
  trailer_link: string;
  is_favorite: boolean;
}

interface Props {
  movie: Movie;
  apiKey: string;
}

const MyMovieItem: React.FC<Props> = ({ movie, apiKey }) => {
  const location = useLocation();

  const handleFavorite = async () => {
    await toggleFavorite(apiKey, movie.imdbid);
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
            <button className="btn btn-primary mb-2 mx-2" onClick={handleFavorite}>
              {movie.is_favorite ? 'Unfavorite' : 'Favorite'}
            </button>
            {movie.is_favorite && location.pathname === '/fav' ? null : <button className="btn btn-danger mb-2" onClick={handleDelete}>Delete</button>}
            <a className="btn btn-info mb-2 mx-2" href={movie.trailer_link} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMovieItem;
