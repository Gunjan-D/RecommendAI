import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('id');
  
  if (!movieId) {
    return NextResponse.json(
      { error: 'Movie ID is required' },
      { status: 400 }
    );
  }

  console.log('Getting demo movie details for ID:', movieId);

  // Complete demo movie database
  const demoMovies: Record<string, any> = {
    "1": {
      id: 1,
      title: "The Avengers",
      overview: "Earth's Mightiest Heroes stand as the planet's first line of defense against the most powerful threats in the universe. When Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster, he and Agent Coulson begin assembling a team of superheroes.",
      poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
      backdrop_path: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
      release_date: "2012-04-25",
      vote_average: 7.7,
      vote_count: 29000,
      runtime: 143,
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 878, name: "Science Fiction" }
      ],
      tagline: "Some assembly required.",
      budget: 220000000,
      revenue: 1518812988
    },
    "2": {
      id: 2,
      title: "The Dark Knight",
      overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdrop_path: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
      release_date: "2008-07-16",
      vote_average: 9.0,
      vote_count: 32000,
      runtime: 152,
      genres: [
        { id: 28, name: "Action" },
        { id: 80, name: "Crime" },
        { id: 18, name: "Drama" }
      ],
      tagline: "Welcome to a world without rules.",
      budget: 185000000,
      revenue: 1004558444
    },
    "3": {
      id: 3,
      title: "Inception",
      overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. But his rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.",
      poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      release_date: "2010-07-15",
      vote_average: 8.8,
      vote_count: 35000,
      runtime: 148,
      genres: [
        { id: 28, name: "Action" },
        { id: 878, name: "Science Fiction" },
        { id: 53, name: "Thriller" }
      ],
      tagline: "Your mind is the scene of the crime.",
      budget: 160000000,
      revenue: 836836967
    },
    "4": {
      id: 4,
      title: "Star Wars: A New Hope",
      overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
      poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
      backdrop_path: "/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
      release_date: "1977-05-25",
      vote_average: 8.6,
      vote_count: 20000,
      runtime: 121,
      genres: [
        { id: 12, name: "Adventure" },
        { id: 878, name: "Science Fiction" },
        { id: 28, name: "Action" }
      ],
      tagline: "A long time ago in a galaxy far, far away...",
      budget: 11000000,
      revenue: 775398007
    },
    "5": {
      id: 5,
      title: "Iron Man",
      overview: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil. Tony Stark is a billionaire industrialist and genius inventor who is kidnapped and forced to build a devastating weapon. Instead, using his intelligence and ingenuity, Tony builds a high-tech suit of armor and escapes captivity.",
      poster_path: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
      backdrop_path: "/9Ic1yGjoER35VKLhCc2y1OvLh5e.jpg",
      release_date: "2008-04-30",
      vote_average: 7.9,
      vote_count: 24000,
      runtime: 126,
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 878, name: "Science Fiction" }
      ],
      tagline: "Heroes aren't born. They're built.",
      budget: 140000000,
      revenue: 585366247
    }
  };

  const movieDetails = demoMovies[movieId];
  
  if (!movieDetails) {
    console.log('Movie not found for ID:', movieId);
    return NextResponse.json(
      { error: 'Movie not found' },
      { status: 404 }
    );
  }

  console.log('Returning demo details for:', movieDetails.title);
  return NextResponse.json(movieDetails);
}