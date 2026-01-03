import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rating = searchParams.get("rating") || "7.0";
  
  console.log("Genre recommendations with rating:", rating);
  
  // Demo genre-based recommendations
  const genreRecommendations = [
    {
      id: 6,
      title: "Captain America: The First Avenger", 
      overview: "Steve Rogers transforms into Captain America after taking a Super-Soldier serum.",
      poster_path: "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
      vote_average: 7.0,
      release_date: "2011-07-19"
    },
    {
      id: 7,
      title: "Thor",
      overview: "The Mighty Thor recklessly reignites an ancient war against his father Odin's will.",
      poster_path: "/bIuOWTtyFPjsFDevqvF3QrD1aun.jpg", 
      vote_average: 7.0,
      release_date: "2011-04-21"
    },
    {
      id: 8,
      title: "Guardians of the Galaxy",
      overview: "A group of intergalactic criminals must pull together to stop a fanatical warrior.",
      poster_path: "/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
      vote_average: 8.0, 
      release_date: "2014-07-30"
    }
  ];

  return NextResponse.json({
    page: 1,
    results: genreRecommendations,
    total_pages: 1,
    total_results: genreRecommendations.length
  });
}