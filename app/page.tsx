'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import MovieGrid from '@/components/MovieGrid';
import MovieDetails from '@/components/MovieDetails';
import FavoritesList from '@/components/FavoritesList';
import { Movie, Favorite } from '@/types';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      
      if (data.results.length === 0) {
        setError('No movies found. Try a different search term.');
        setMovies([]);
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = async (movieId: number) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      setError('Failed to load movie details. Please try again.');
    }
  };

  const handleAddFavorite = (movie: Movie, rating: number, note: string) => {
    const newFavorite: Favorite = {
      movie,
      rating,
      note,
      addedAt: new Date().toISOString(),
    };

    setFavorites([...favorites, newFavorite]);
  };

  const handleRemoveFavorite = (movieId: number) => {
    setFavorites(favorites.filter(fav => fav.movie.id !== movieId));
  };

  const handleUpdateFavorite = (movieId: number, rating: number, note: string) => {
    setFavorites(
      favorites.map(fav =>
        fav.movie.id === movieId
          ? { ...fav, rating, note }
          : fav
      )
    );
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(fav => fav.movie.id === movieId);
  };

  const getFavorite = (movieId: number) => {
    return favorites.find(fav => fav.movie.id === movieId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🎬 Movie Explorer
            </h1>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showFavorites ? 'Search Movies' : `Favorites (${favorites.length})`}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showFavorites ? (
          <>
            <SearchBar onSearch={handleSearch} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Searching movies...</p>
              </div>
            )}

            {!isLoading && movies.length > 0 && (
              <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
            )}
          </>
        ) : (
          <FavoritesList
            favorites={favorites}
            onMovieClick={handleMovieClick}
            onRemoveFavorite={handleRemoveFavorite}
            onUpdateFavorite={handleUpdateFavorite}
          />
        )}
      </main>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite(selectedMovie.id)}
          favorite={getFavorite(selectedMovie.id)}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          onUpdateFavorite={handleUpdateFavorite}
        />
      )}
    </div>
  );
}
