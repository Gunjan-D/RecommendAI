'use client';

import { useState, useEffect } from 'react';
import { Movie, Favorite } from '@/types';
import Image from 'next/image';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  isFavorite: boolean;
  favorite?: Favorite;
  onAddFavorite: (movie: Movie, rating: number, note: string) => void;
  onRemoveFavorite: (movieId: number) => void;
  onUpdateFavorite: (movieId: number, rating: number, note: string) => void;
}

export default function MovieDetails({
  movie,
  onClose,
  isFavorite,
  favorite,
  onAddFavorite,
  onRemoveFavorite,
  onUpdateFavorite,
}: MovieDetailsProps) {
  const [rating, setRating] = useState(favorite?.rating || 0);
  const [note, setNote] = useState(favorite?.note || '');
  const [showFavoriteForm, setShowFavoriteForm] = useState(false);

  useEffect(() => {
    if (favorite) {
      setRating(favorite.rating);
      setNote(favorite.note);
    }
  }, [favorite]);

  const handleSaveFavorite = () => {
    if (rating === 0) {
      alert('Please select a rating before adding to favorites');
      return;
    }

    if (isFavorite) {
      onUpdateFavorite(movie.id, rating, note);
    } else {
      onAddFavorite(movie, rating, note);
    }
    setShowFavoriteForm(false);
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'N/A';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Backdrop */}
        {backdropUrl && (
          <div className="relative w-full h-64">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {movie.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-6 mb-6">
            {posterUrl && (
              <div className="flex-shrink-0">
                <div className="relative w-48 h-72">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="192px"
                  />
                </div>
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-600 dark:text-gray-400">{year}</span>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">{runtime}</span>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <div className="flex items-center">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-300">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Overview
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>
          </div>

          {/* Favorite Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {!showFavoriteForm ? (
              <div className="flex gap-2">
                {!isFavorite ? (
                  <button
                    onClick={() => setShowFavoriteForm(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add to Favorites
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setShowFavoriteForm(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit Favorite
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(movie.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Remove from Favorites
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Rating (1-5)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-3xl transition-colors ${
                          star <= rating
                            ? 'text-yellow-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Note (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add your personal note about this movie..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveFavorite}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowFavoriteForm(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
