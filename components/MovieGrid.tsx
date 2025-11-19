'use client';

import { Movie } from '@/types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
  title?: string;
}

export default function MovieGrid({ movies, onMovieClick, title = 'Movies' }: MovieGridProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title} ({movies.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
