import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const movieId = params.id;

  if (!movieId) {
    return NextResponse.json(
      { error: 'Movie ID is required' },
      { status: 400 }
    );
  }

  if (!TMDB_API_KEY) {
    return NextResponse.json(
      { error: 'TMDB API key is not configured' },
      { status: 500 }
    );
  }

  try {
    // Get similar movies from TMDB
    const similarResponse = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&page=1`,
      { next: { revalidate: 3600 } }
    );

    if (!similarResponse.ok) {
      throw new Error('Failed to fetch similar movies from TMDB');
    }

    const similarData = await similarResponse.json();
    
    // Get movie recommendations from TMDB
    const recommendationsResponse = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&page=1`,
      { next: { revalidate: 3600 } }
    );

    const recommendationsData = recommendationsResponse.ok 
      ? await recommendationsResponse.json() 
      : { results: [] };

    // Combine and deduplicate results
    const combinedResults = [
      ...similarData.results,
      ...recommendationsData.results
    ].reduce((acc, movie) => {
      if (!acc.find(m => m.id === movie.id)) {
        acc.push(movie);
      }
      return acc;
    }, []);

    return NextResponse.json({
      similar: similarData.results.slice(0, 6),
      recommendations: recommendationsData.results.slice(0, 6),
      combined: combinedResults.slice(0, 12)
    });
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch similar movies' },
      { status: 500 }
    );
  }
}