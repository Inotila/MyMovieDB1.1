import React, { useEffect, useState } from 'react';
import { getApiKey, getMovies } from '../services/myMovieService';
import MyMovieList, { Movie } from '../components/MyMovieList';
import NavigationBar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Fav: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = await getApiKey();
        setApiKey(key);
        const movieList = await getMovies(key);
        console.log(movieList)
        setMovies(movieList.filter((movie: Movie) => movie.is_favorite));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <h1 className="text-center mb-4">My Movie DB</h1>
        <h2 className="text-center">My favourite movie list</h2>
        <MyMovieList movies={movies} apiKey={apiKey} />
      </div>
    </div>
  );
};

export default Fav;
