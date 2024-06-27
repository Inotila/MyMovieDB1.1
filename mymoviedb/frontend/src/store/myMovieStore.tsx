import create from 'zustand';

interface Movie {
  imdbid: string;
  title: string;
  poster: string;
  trailer_link: string;
  is_favorite: boolean;
}

interface StoreState {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
}));
