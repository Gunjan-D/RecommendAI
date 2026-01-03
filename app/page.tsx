'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import MovieDetails from '@/components/MovieDetails';
import FavoritesList from '@/components/FavoritesList';
import Recommendations from '@/components/Recommendations';
import { Movie, Favorite } from '@/types';
import { useMovieTracking } from '@/hooks/useUserBehavior';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [ratings, setRatings] = useState<Record<number, number>>({});

  // Initialize user behavior tracking
  const { trackSearch, trackMovieView, trackAddFavorite, trackRemoveFavorite, trackRating } = useMovieTracking();

  useEffect(() => {
    // Load popular movies on initial load
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setIsLoading(true);
    try {
      // Load trending movies for demo
      const response = await fetch('/api/movies/search?query=trending');
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setMovies(data.results.slice(0, 12)); // Show first 12 popular movies
        } else {
          // Fallback to some popular movie searches if trending doesn't work
          const fallbackResponse = await fetch('/api/movies/search?query=avengers');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setMovies(fallbackData.results?.slice(0, 8) || []);
          }
        }
      }
    } catch (error) {
      console.error('Error loading popular movies:', error);
      // Set some demo movie titles as fallback
      try {
        const demoResponse = await fetch('/api/movies/search?query=batman');
        if (demoResponse.ok) {
          const demoData = await demoResponse.json();
          setMovies(demoData.results?.slice(0, 6) || []);
        }
      } catch (demoError) {
        console.error('Error loading demo movies:', demoError);
      }
    } finally {
      setIsLoading(false);
    }
  };

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

    // Track search behavior
    trackSearch(query);
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (response.ok) {
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
    // Track movie view behavior
    trackMovieView(movieId);

    try {
      const response = await fetch(`/api/movies/demo-details?id=${movieId}`);

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
    // Track add to favorites behavior
    trackAddFavorite(movie.id);
    
    const newFavorite: Favorite = {
      movie,
      rating,
      note,
      addedAt: new Date().toISOString(),
    };

    setFavorites([...favorites, newFavorite]);
    
    // Update ratings state for recommendations
    setRatings(prev => ({
      ...prev,
      [movie.id]: rating
    }));
  };

  const handleRemoveFavorite = (movieId: number) => {
    // Track remove from favorites behavior
    trackRemoveFavorite(movieId);
    
    setFavorites(favorites.filter(fav => fav.movie.id !== movieId));
    
    // Remove from ratings
    setRatings(prev => {
      const updated = { ...prev };
      delete updated[movieId];
      return updated;
    });
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
              🎬 Movie Explorer 🎬
            </h1>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowFavorites(false);
                  setShowRecommendations(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !showFavorites && !showRecommendations
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Search Movies
              </button>
              <button
                onClick={() => {
                  setShowRecommendations(!showRecommendations);
                  setShowFavorites(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showRecommendations
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                🎯 Recommendations
              </button>
              <button
                onClick={() => {
                  setShowFavorites(!showFavorites);
                  setShowRecommendations(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showFavorites
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                ❤️ Favorites ({favorites.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showRecommendations ? (
          <Recommendations
            favorites={favorites}
            ratings={ratings}
            onMovieClick={handleMovieClick}
          />
        ) : !showFavorites ? (
          <>
            <SearchBar onSearch={handleSearch} />

            {/* Demo content when no search is performed */}
            {!error && !isLoading && movies.length === 0 && (
              <div className="mt-8">
                <div className="text-center py-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    🎬 Welcome to Movie Explorer!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    Discover amazing movies with AI-powered recommendations
                  </p>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Try searching for:
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['Marvel', 'Batman', 'Star Wars', 'Harry Potter', 'Inception', 'Avatar', 'Titanic', 'The Godfather'].map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-medium"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                      <div className="text-3xl mb-3">🔍</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Search</h4>
                      <p className="text-gray-600 dark:text-gray-400">Find any movie with our powerful search engine</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                      <div className="text-3xl mb-3">🤖</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Recommendations</h4>
                      <p className="text-gray-600 dark:text-gray-400">Get personalized suggestions based on your taste</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                      <div className="text-3xl mb-3">❤️</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Save Favorites</h4>
                      <p className="text-gray-600 dark:text-gray-400">Build your personal movie collection</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading movies...</p>
              </div>
            )}

            {!isLoading && movies.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  {movies.length >= 10 ? (
                    <>
                      <span className="mr-2">🔥</span>
                      Trending Movies
                      <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                        • {movies.length} movies found
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🎬</span>
                      Search Results
                      <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                        • {movies.length} movies found
                      </span>
                    </>
                  )}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => handleMovieClick(movie.id)}
                    />
                  ))}
                </div>
              </div>
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
