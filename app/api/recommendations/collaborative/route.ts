import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { favorites, ratings } = await request.json();
    console.log("Collaborative filtering with favorites:", favorites.length);
    
    // Demo recommendations based on user favorites
    const demoRecommendations = [
      {
        id: 5,
        title: "Iron Man",
        overview: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor.",
        poster_path: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
        vote_average: 7.9,
        release_date: "2008-04-30"
      },
      {
        id: 3,
        title: "Inception", 
        overview: "A thief who steals corporate secrets through dream-sharing technology.",
        poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        vote_average: 8.8,
        release_date: "2010-07-15"
      },
      {
        id: 4,
        title: "Star Wars: A New Hope",
        overview: "Luke Skywalker joins forces with a Jedi Knight to save the galaxy.",
        poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg", 
        vote_average: 8.6,
        release_date: "1977-05-25"
      }
    ];

    const userStats = {
      totalMovies: favorites.length,
      averageRating: 4.5,
      favoriteGenres: ["Action", "Adventure", "Science Fiction"],
      recommendationScore: 0.95
    };

    return NextResponse.json({
      recommendations: demoRecommendations,
      userStats,
      totalRecommendations: demoRecommendations.length
    });
  } catch (error) {
    console.error("Collaborative filtering error:", error);
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}