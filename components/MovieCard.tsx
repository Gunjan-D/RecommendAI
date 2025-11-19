'use client';

import { Movie } from '@/types';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png';

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
    >
      <div className="relative w-full h-80">
        {movie.poster_path ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {year}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
          {movie.overview || 'No description available.'}
        </p>
        <div className="mt-2 flex items-center">
          <span className="text-yellow-500">⭐</span>
          <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
