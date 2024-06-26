import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface Movie {
  imdbid: string;
  title: string;
  poster: string;
  trailer_link: string;
  is_favorite: boolean;
}

export const getApiKey = async (): Promise<string> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return token;
};

export const getMovies = async (apiKey: string): Promise<Movie[]> => {
  const response = await axios.get(`${API_BASE_URL}/movies/`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
  return response.data;
};

export const toggleFavorite = async (apiKey: string, imdbid: string): Promise<void> => {
  await axios.put(`${API_BASE_URL}/movies/${imdbid}/favorite/`, {}, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
};

export const deleteMovie = async (apiKey: string, imdbid: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/movies/${imdbid}/`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
};

export const addMovie = async (movie: Partial<Movie>, apiKey: string): Promise<{ success: boolean }> => {
  const response = await axios.post(`${API_BASE_URL}/movies/`, movie, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
  return response.data;
};

export const login = async (username: string, password: string): Promise<{ success: boolean, token: string }> => {
  const response = await axios.post(`${API_BASE_URL}/token/`, { username, password });
  return response.data;
};
