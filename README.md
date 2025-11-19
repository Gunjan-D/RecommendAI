# Movie Explorer

A Next.js web application for searching movies, viewing details, and managing your favorite films with personal ratings and notes.

## 🚀 Live Demo

[Deploy on Vercel](https://vercel.com) - Coming soon

## ✨ Features

- **Movie Search**: Search movies by title using The Movie Database (TMDB) API
- **Detailed View**: View comprehensive movie information including poster, overview, year, runtime, and genres
- **Favorites Management**: Add/remove movies to your personal favorites list
- **Personal Ratings**: Rate your favorite movies from 1 to 5 stars
- **Custom Notes**: Add personal notes to each favorite movie
- **Persistent Storage**: All favorites are saved locally using LocalStorage
- **Error Handling**: Graceful handling of API errors, network issues, and edge cases
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technical Stack

- **Frontend**: Next.js 14+ (React, TypeScript)
- **Styling**: Tailwind CSS
- **API**: TMDB (The Movie Database) API
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: LocalStorage
- **Image Optimization**: Next.js Image component

## 📋 Requirements

Before running this project, you need:

1. **Node.js**: Version 18.17 or later
   - Download from: https://nodejs.org/
   
2. **TMDB API Key**: Free API key from The Movie Database
   - Sign up at: https://www.themoviedb.org/signup
   - Get your API key at: https://www.themoviedb.org/settings/api

## 🚀 Getting Started

### 1. Install Node.js

Download and install Node.js from https://nodejs.org/ (LTS version recommended)

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
TMDB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual TMDB API key.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
movie-explorer/
├── app/
│   ├── api/
│   │   └── movies/
│   │       ├── search/
│   │       │   └── route.ts       # Search API proxy
│   │       └── [id]/
│   │           └── route.ts       # Movie details API proxy
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page component
├── components/
│   ├── SearchBar.tsx              # Search input component
│   ├── MovieGrid.tsx              # Movies grid display
│   ├── MovieCard.tsx              # Individual movie card
│   ├── MovieDetails.tsx           # Movie details modal
│   └── FavoritesList.tsx          # Favorites list view
├── types/
│   └── index.ts                   # TypeScript type definitions
├── .github/
│   └── copilot-instructions.md    # Project context
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

## 🔧 Technical Decisions & Tradeoffs

### 1. API Proxy Architecture
**Decision**: Used Next.js API routes to proxy TMDB API calls  
**Rationale**: Keeps API key secure on the server-side, prevents exposure in client-side code  
**Tradeoff**: Adds a network hop, but security benefit outweighs minimal latency

### 2. LocalStorage for Persistence
**Decision**: Client-side persistence using LocalStorage  
**Rationale**: Simple implementation, no backend required, meets project scope  
**Tradeoff**: Data is device-specific; upgrading to database would enable cross-device sync

### 3. State Management
**Decision**: React Hooks (useState, useEffect) without external state library  
**Rationale**: Application state is simple enough; Redux/Zustand would be overkill  
**Tradeoff**: For larger apps, centralized state management would be beneficial

### 4. Modal vs. Separate Page for Details
**Decision**: Modal overlay for movie details  
**Rationale**: Better UX, maintains search context, faster navigation  
**Tradeoff**: Separate pages would enable direct linking to specific movies

### 5. Image Optimization
**Decision**: Next.js Image component with TMDB CDN  
**Rationale**: Automatic optimization, lazy loading, responsive images  
**Tradeoff**: Requires TMDB domain whitelisting in next.config.js

### 6. TypeScript
**Decision**: Full TypeScript implementation  
**Rationale**: Type safety, better IDE support, catches errors early  
**Tradeoff**: Slightly longer development time, but improved maintainability

## 🎯 Known Limitations & Future Improvements

### Current Limitations
1. **No Pagination**: Search results limited to first page (20 movies)
2. **No User Authentication**: Favorites are device-specific
3. **No Advanced Filters**: Can't filter by genre, year, rating, etc.
4. **No Sorting**: Can't sort search results or favorites
5. **Basic Error Messages**: Could provide more specific error guidance

### Future Improvements (with more time)
1. **Backend Integration**:
   - Add PostgreSQL/MongoDB database
   - Implement user authentication (NextAuth.js)
   - Enable cross-device favorite syncing

2. **Enhanced Features**:
   - Pagination for search results
   - Advanced filtering (genre, year, rating)
   - Sorting options (popularity, rating, release date)
   - Watchlist in addition to favorites
   - Share favorites with friends

3. **UX Improvements**:
   - Loading skeletons instead of spinners
   - Optimistic UI updates
   - Infinite scroll for results
   - Keyboard navigation
   - Accessibility improvements (ARIA labels, focus management)

4. **Performance**:
   - Implement request caching
   - Add service worker for offline support
   - Optimize bundle size with dynamic imports

5. **Testing**:
   - Unit tests (Jest, React Testing Library)
   - E2E tests (Playwright)
   - API integration tests

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable: `TMDB_API_KEY`
4. Deploy!

### Alternative: Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Configure environment variables in Netlify dashboard

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TMDB_API_KEY` | Your TMDB API key | Yes |

## 🤝 Development Time

This project was developed as a take-home assignment with an estimated 3-hour scope:

- **Project Setup**: 15 minutes
- **API Integration**: 45 minutes
- **UI Components**: 60 minutes
- **Favorites Feature**: 45 minutes
- **Testing & Polish**: 15 minutes

## 📄 License

This project is for demonstration purposes only.

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
