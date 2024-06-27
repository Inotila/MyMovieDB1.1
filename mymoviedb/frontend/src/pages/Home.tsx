import React, { useEffect, useState } from 'react';
import { getApiKey, getMovies } from '../services/myMovieService';
import MyMovieList, { Movie } from '../components/MyMovieList';
import NavBar from '../components/Navbar';


const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const key = await getApiKey();
      setApiKey(key);
      const movieList:Movie[] = await getMovies(key);
      setMovies(movieList);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Movie DB</h1>
        <h2 className="text-center">movie list</h2>
        <MyMovieList movies={movies} apiKey={apiKey} />
      </div>
    </div>
  );
};

export default Home;
