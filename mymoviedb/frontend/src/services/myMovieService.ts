import axios, { AxiosResponse, AxiosError } from 'axios';
import { Movie } from '../components/MyMovieList';

const API_BASE_URL = 'http://localhost:8080/api';

interface ApiKeyResponse {
    success: boolean;
    data: string;
}


interface MovieResponse {
    success: boolean;
    data: Movie[];
}

interface SuccessResponse {
    success: boolean;
}

// Function to fetch API key
export const getApiKey = async (): Promise<string> => {
    try {
        const response: AxiosResponse<ApiKeyResponse> = await axios.get(`${API_BASE_URL}/keys`);
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error('Failed to retrieve API key');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to retrieve API key: ' + error.message);
        } else {
            throw new Error('Failed to retrieve API key');
        }
    }
};

// Function to fetch movies using the API key
export const getMovies = async (key: string): Promise<Movie[]> => {
    try {
        const response: AxiosResponse<MovieResponse> = await axios.get(`${API_BASE_URL}/movies?key=${key}`);
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error('Failed to retrieve movies');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to retrieve movies: ' + error.message);
        } else {
            throw new Error('Failed to retrieve movies');
        }
    }
};

function numToString(number: number): string{
return number.toString( )
}

// Function to toggle favorite status of a movie
export const toggleFavorite = async (key: string, imdbid: string): Promise<SuccessResponse> => {
    try {
        const response: AxiosResponse<SuccessResponse> = await axios.put(`${API_BASE_URL}/movies/${imdbid}?key=${key}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to toggle favorite: ' + error.message);
        } else {
            throw new Error('Failed to toggle favorite');
        }
    }
};

// Function to delete a movie
export const deleteMovie = async (key: string, imdbid: string): Promise<SuccessResponse> => {
    try {
        const response: AxiosResponse<SuccessResponse> = await axios.delete(`${API_BASE_URL}/movies/${imdbid}?key=${key}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to delete movie: ' + error.message);
        } else {
            throw new Error('Failed to delete movie');
        }
    }
};

// Function to login user
export const login = async (user: { username: string; password: string }): Promise<any> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, user);
        if (response.data.success) {
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to login: ' + error.message);
        } else {
            throw new Error('Failed to login');
        }
    }
};

// Function to logout user
export const logout = async (): Promise<SuccessResponse> => {
    try {
        const response: AxiosResponse<SuccessResponse> = await axios.post(`${API_BASE_URL}/auth/logout`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to logout: ' + error.message);
        } else {
            throw new Error('Failed to logout');
        }
    }
};

// Function to register new user
export const register = async (user: { username: string; password: string }): Promise<any> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, user);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Registration failed: ' + error.message);
        } else {
            throw new Error('Registration failed');
        }
    }
};

// Function to add a new movie
export const addMovie = async (movie: Movie, key: string): Promise<SuccessResponse> => {
    try {
        const response: AxiosResponse<SuccessResponse> = await axios.post(`${API_BASE_URL}/movies?key=${key}`, movie);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to add movie: ' + error.message);
        } else {
            throw new Error('Failed to add movie');
        }
    }
};
