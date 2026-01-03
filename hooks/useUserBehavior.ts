'use client';

import { useEffect } from 'react';

interface UserAction {
  type: 'search' | 'view_movie' | 'add_favorite' | 'remove_favorite' | 'rate_movie';
  movieId?: number;
  query?: string;
  rating?: number;
  timestamp: number;
}

interface UserBehavior {
  searchHistory: string[];
  viewedMovies: number[];
  favoriteGenres: number[];
  averageSessionTime: number;
  totalActions: number;
  preferredRatingRange: [number, number];
}

export const useUserBehaviorTracking = () => {
  
  const trackAction = (action: Omit<UserAction, 'timestamp'>) => {
    try {
      const fullAction: UserAction = {
        ...action,
        timestamp: Date.now()
      };

      // Get existing actions
      const existingActions = JSON.parse(
        localStorage.getItem('movieExplorerActions') || '[]'
      );

      // Add new action
      existingActions.push(fullAction);

      // Keep only last 1000 actions to prevent localStorage bloat
      const recentActions = existingActions.slice(-1000);

      // Save to localStorage
      localStorage.setItem('movieExplorerActions', JSON.stringify(recentActions));

      // Update behavior analysis
      updateUserBehavior(recentActions);
    } catch (error) {
      console.error('Error tracking user action:', error);
    }
  };

  const updateUserBehavior = (actions: UserAction[]) => {
    try {
      const behavior: UserBehavior = {
        searchHistory: [],
        viewedMovies: [],
        favoriteGenres: [],
        averageSessionTime: 0,
        totalActions: actions.length,
        preferredRatingRange: [0, 10]
      };

      // Extract search history
      behavior.searchHistory = actions
        .filter(action => action.type === 'search')
        .map(action => action.query)
        .filter((query): query is string => query !== undefined)
        .slice(-20); // Keep last 20 searches

      // Extract viewed movies
      behavior.viewedMovies = [
        ...new Set(
          actions
            .filter(action => action.movieId && action.type === 'view_movie')
            .map(action => action.movieId)
            .filter((id): id is number => id !== undefined)
        )
      ].slice(-50); // Keep last 50 viewed movies

      // Extract rating preferences
      const ratings = actions
        .filter(action => action.type === 'rate_movie' && action.rating)
        .map(action => action.rating)
        .filter((rating): rating is number => rating !== undefined);

      if (ratings.length > 0) {
        behavior.preferredRatingRange = [
          Math.min(...ratings),
          Math.max(...ratings)
        ];
      }

      // Calculate session analytics
      if (actions.length > 1) {
        const sessionGaps = [];
        for (let i = 1; i < actions.length; i++) {
          const gap = actions[i].timestamp - actions[i - 1].timestamp;
          if (gap < 30 * 60 * 1000) { // 30 minutes max session gap
            sessionGaps.push(gap);
          }
        }
        
        behavior.averageSessionTime = sessionGaps.length > 0
          ? sessionGaps.reduce((sum, gap) => sum + gap, 0) / sessionGaps.length
          : 0;
      }

      // Save behavior analysis
      localStorage.setItem('movieExplorerBehavior', JSON.stringify(behavior));
    } catch (error) {
      console.error('Error updating user behavior:', error);
    }
  };

  const getUserBehavior = (): UserBehavior | null => {
    try {
      const behavior = localStorage.getItem('movieExplorerBehavior');
      return behavior ? JSON.parse(behavior) : null;
    } catch (error) {
      console.error('Error getting user behavior:', error);
      return null;
    }
  };

  const getUserActions = (): UserAction[] => {
    try {
      const actions = localStorage.getItem('movieExplorerActions');
      return actions ? JSON.parse(actions) : [];
    } catch (error) {
      console.error('Error getting user actions:', error);
      return [];
    }
  };

  const clearUserData = () => {
    try {
      localStorage.removeItem('movieExplorerActions');
      localStorage.removeItem('movieExplorerBehavior');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  // Initialize behavior tracking on first load
  useEffect(() => {
    const actions = getUserActions();
    if (actions.length > 0) {
      updateUserBehavior(actions);
    }
  }, []);

  return {
    trackAction,
    getUserBehavior,
    getUserActions,
    clearUserData
  };
};

// Helper hook for easy integration in components
export const useMovieTracking = () => {
  const { trackAction } = useUserBehaviorTracking();

  return {
    trackSearch: (query: string) => trackAction({ type: 'search', query }),
    trackMovieView: (movieId: number) => trackAction({ type: 'view_movie', movieId }),
    trackAddFavorite: (movieId: number) => trackAction({ type: 'add_favorite', movieId }),
    trackRemoveFavorite: (movieId: number) => trackAction({ type: 'remove_favorite', movieId }),
    trackRating: (movieId: number, rating: number) => trackAction({ type: 'rate_movie', movieId, rating })
  };
};