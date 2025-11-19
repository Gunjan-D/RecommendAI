'use client';

import { Favorite } from '@/types';
import Image from 'next/image';

interface FavoritesListProps {
  favorites: Favorite[];
  onMovieClick: (movieId: number) => void;
  onRemoveFavorite: (movieId: number) => void;
  onUpdateFavorite: (movieId: number, rating: number, note: string) => void;
}

export default function FavoritesList({
  favorites,
  onMovieClick,
}: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl text-gray-500 dark:text-gray-400">
          No favorites yet. Start adding movies you love!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Your Favorites ({favorites.length})
      </h2>
      <div className="space-y-4">
        {favorites.map((favorite) => {
          const posterUrl = favorite.movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${favorite.movie.poster_path}`
            : null;

          const year = favorite.movie.release_date
            ? new Date(favorite.movie.release_date).getFullYear()
            : 'N/A';

          return (
            <div
              key={favorite.movie.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onMovieClick(favorite.movie.id)}
            >
              <div className="flex gap-4">
                {posterUrl ? (
                  <div className="relative w-24 h-36 flex-shrink-0">
                    <Image
                      src={posterUrl}
                      alt={favorite.movie.title}
                      fill
                      className="object-cover rounded"
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-36 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded flex-shrink-0">
                    <span className="text-3xl">🎬</span>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {favorite.movie.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {year}
                  </p>

                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                      Your Rating:
                    </span>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < favorite.rating
                            ? 'text-yellow-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }
                      >
                        ⭐
                      </span>
                    ))}
                  </div>

                  {favorite.note && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 italic">
                      &quot;{favorite.note}&quot;
                    </p>
                  )}

                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Added: {new Date(favorite.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
