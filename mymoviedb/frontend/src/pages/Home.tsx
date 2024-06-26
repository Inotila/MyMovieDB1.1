import React, { useEffect, useState } from 'react';
import { getApiKey, getMovies } from '../services/myMovieService';
import MyMovieList from '../components/MyMovieList';
import NavigationBar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const key = await getApiKey();
      setApiKey(key);
      const movieList = await getMovies(key);
      setMovies(movieList);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Movie DB</h1>
        <h2 className="text-center">movie list</h2>
        <MyMovieList movies={movies} apiKey={apiKey} />
      </div>
    </div>
  );
};

export default Home;
