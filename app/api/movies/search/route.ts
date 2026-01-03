import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  // Check if we have a valid API key
  if (!TMDB_API_KEY || TMDB_API_KEY === 'demo_key_replace_with_real_key') {
    console.log('Using demo data - no valid TMDB API key found');
    
    // Return demo movie data for popular searches
    const demoMovies = {
      trending: [
        {
          id: 1,
          title: "The Avengers",
          overview: "Earth's Mightiest Heroes stand as the planet's first line of defense against the most powerful threats in the universe.",
          poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
          backdrop_path: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
          release_date: "2012-04-25",
          vote_average: 7.7,
          vote_count: 29000,
          genre_ids: [28, 12, 878]
        },
        {
          id: 2,
          title: "The Dark Knight",
          overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
          poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          backdrop_path: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
          release_date: "2008-07-16",
          vote_average: 9.0,
          vote_count: 32000,
          genre_ids: [28, 80, 18]
        },
        {
          id: 3,
          title: "Inception",
          overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
          poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
          backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
          release_date: "2010-07-15",
          vote_average: 8.8,
          vote_count: 35000,
          genre_ids: [28, 878, 53]
        },
        {
          id: 4,
          title: "Star Wars: A New Hope",
          overview: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy.",
          poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
          backdrop_path: "/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
          release_date: "1977-05-25",
          vote_average: 8.6,
          vote_count: 20000,
          genre_ids: [12, 878, 28]
        },
        {
          id: 5,
          title: "Iron Man",
          overview: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor.",
          poster_path: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
          backdrop_path: "/9Ic1yGjoER35VKLhCc2y1OvLh5e.jpg",
          release_date: "2008-04-30",
          vote_average: 7.9,
          vote_count: 24000,
          genre_ids: [28, 12, 878]
        },
        {
          id: 6,
          title: "Harry Potter and the Philosopher's Stone",
          overview: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and his terrible fate.",
          poster_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
          backdrop_path: "/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
          release_date: "2001-11-04",
          vote_average: 7.9,
          vote_count: 26000,
          genre_ids: [12, 14, 10751]
        },
        {
          id: 7,
          title: "Avatar",
          overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world.",
          poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
          backdrop_path: "/Yc9q6QuWrMp9nuDm5R8ExNqbEWU.jpg",
          release_date: "2009-12-10",
          vote_average: 7.8,
          vote_count: 31000,
          genre_ids: [28, 12, 878, 14]
        },
        {
          id: 8,
          title: "Titanic",
          overview: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later.",
          poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
          backdrop_path: "/qgd6wl7sZEFE0Ux1zz3USbWwLYA.jpg",
          release_date: "1997-11-18",
          vote_average: 7.9,
          vote_count: 23000,
          genre_ids: [18, 10749]
        }
      ]
    };

    // Match query to demo data
    const searchQuery = query.toLowerCase();
    let results = [];

    if (searchQuery.includes('trending') || searchQuery.includes('popular')) {
      results = demoMovies.trending;
    } else if (searchQuery.includes('marvel')) {
      results = demoMovies.trending.filter(movie => 
        movie.title.toLowerCase().includes('avengers') || 
        movie.title.toLowerCase().includes('iron man')
      );
    } else if (searchQuery.includes('batman')) {
      results = demoMovies.trending.filter(movie => 
        movie.title.toLowerCase().includes('dark knight')
      );
    } else if (searchQuery.includes('star wars')) {
      results = demoMovies.trending.filter(movie => 
        movie.title.toLowerCase().includes('star wars')
      );
    } else if (searchQuery.includes('inception')) {
      results = demoMovies.trending.filter(movie => 
        movie.title.toLowerCase().includes('inception')
      );
    } else if (searchQuery.includes('harry potter')) {
      results = demoMovies.trending.filter(movie => 
        movie.title.toLowerCase().includes('harry potter')
      );
    } else if (searchQuery.includes('avatar')) {
      results = demoMovies.trending.filter(movie => 
        movie.title.toLowerCase().includes('avatar')
      );
    } else if (searchQuery.includes('titanic')) {
      results = demoMovies.trending.filter(movie => 
        movie.title.toLowerCase().includes('titanic')
      );
    } else if (searchQuery.includes('the godfather')) {
      results = [{
        id: 9,
        title: "The Godfather",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
        release_date: "1972-03-14",
        vote_average: 9.2,
        vote_count: 19000,
        genre_ids: [18, 80]
      }];
    } else {
      // Default search results - return a subset based on query
      results = demoMovies.trending.slice(0, 6);
    }

    return NextResponse.json({
      page: 1,
      results: results,
      total_pages: 1,
      total_results: results.length
    });
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=1`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from TMDB');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
