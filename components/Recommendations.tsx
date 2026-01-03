'use client';

import { useState, useEffect } from 'react';
import { Movie, Favorite } from '@/types';
import Image from 'next/image';

interface RecommendationsProps {
  favorites: Favorite[];
  ratings: Record<number, number>;
  onMovieClick: (movieId: number) => void;
}

interface RecommendationSection {
  title: string;
  movies: Movie[];
  reason?: string;
}

export default function Recommendations({ 
  favorites, 
  ratings, 
  onMovieClick 
}: RecommendationsProps) {
  const [sections, setSections] = useState<RecommendationSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<any>(null);

  useEffect(() => {
    loadRecommendations();
  }, [favorites.length, Object.keys(ratings).length]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      // Get collaborative filtering recommendations
      const collaborativeResponse = await fetch('/api/recommendations/collaborative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites, ratings })
      });

      const collaborativeData = await collaborativeResponse.json();
      const newSections: RecommendationSection[] = [];

      if (collaborativeData.recommendations) {
        newSections.push({
          title: favorites.length > 0 
            ? '🎯 Recommended For You' 
            : '🔥 Popular Movies',
          movies: collaborativeData.recommendations,
          reason: collaborativeData.reason
        });
        setUserStats(collaborativeData.userStats);
      }

      // Get genre-based recommendations if user has favorites
      if (favorites.length > 0) {
        const uniqueGenres = new Set(
          favorites.flatMap(fav => fav.genre_ids || [])
        );
        const genreIds = Array.from(uniqueGenres).slice(0, 3).join(',');

        if (genreIds) {
          const genreResponse = await fetch(
            `/api/recommendations/genre?genres=${genreIds}&rating=6.5`
          );
          const genreData = await genreResponse.json();
          
          if (genreData.results) {
            // Filter out movies already in favorites or collaborative recommendations
            const existingIds = new Set([
              ...favorites.map(fav => fav.id),
              ...collaborativeData.recommendations?.map(rec => rec.id) || []
            ]);
            
            const filteredGenreMovies = genreData.results
              .filter(movie => !existingIds.has(movie.id))
              .slice(0, 6);

            if (filteredGenreMovies.length > 0) {
              newSections.push({
                title: '🎬 More Like Your Favorites',
                movies: filteredGenreMovies,
                reason: 'genre_based'
              });
            }
          }
        }
      }

      // Get high-rated movies
      const highRatedResponse = await fetch(
        '/api/recommendations/genre?rating=8.0'
      );
      const highRatedData = await highRatedResponse.json();
      
      if (highRatedData.results) {
        const existingIds = new Set([
          ...favorites.map(fav => fav.id),
          ...newSections.flatMap(section => section.movies.map(m => m.id))
        ]);
        
        const filteredHighRated = highRatedData.results
          .filter(movie => !existingIds.has(movie.id))
          .slice(0, 6);

        if (filteredHighRated.length > 0) {
          newSections.push({
            title: '⭐ Highly Rated Movies',
            movies: filteredHighRated,
            reason: 'high_rated'
          });
        }
      }

      setSections(newSections);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-300 aspect-[2/3] rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {userStats && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">📊 Your Movie Profile</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{userStats.totalFavorites}</div>
              <div className="text-sm opacity-90">Favorites</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userStats.highlyRated}</div>
              <div className="text-sm opacity-90">Highly Rated</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {userStats.averageRating ? userStats.averageRating.toFixed(1) : 'N/A'}
              </div>
              <div className="text-sm opacity-90">Avg Rating</div>
            </div>
          </div>
        </div>
      )}

      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {section.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {section.movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => onMovieClick(movie.id)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No Image
                    </div>
                  )}
                  
                  {movie.vote_average > 0 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                  )}
                </div>
                
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                  {movie.title}
                </h3>
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {sections.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Add some movies to your favorites to get personalized recommendations!
          </p>
        </div>
      )}
    </div>
  );
}