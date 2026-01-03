# RecommendAI 

## Advanced Movie Recommendation System

A comprehensive, ML-powered movie recommendation platform built with Next.js 14, featuring multiple recommendation algorithms and intelligent user behavior analysis.

###  **Live Demo**: [https://recommend-ai-nine.vercel.app](https://recommend-ai-nine.vercel.app)

###  Features

####  **Completed ML-Powered Recommendations**
- **Collaborative Filtering**: Personalized suggestions based on user favorites and ratings
- **Content-Based Recommendations**: Movies similar to your preferences  
- **Genre-Based Filtering**: Smart recommendations with rating thresholds
- **Similar Movies**: Discover movies like ones you love
- **User Behavior Analysis**: Track and analyze viewing patterns

####  **Core Functionality**
- **Smart Search**: Enhanced search with demo data fallback
- **Favorites System**: Add/remove movies with rating capabilities
- **User Analytics**: View your movie statistics and recommendation scores
- **Responsive Design**: Modern UI with dark/light mode support
- **Demo Data System**: Works offline with comprehensive movie database

####  **Technical Stack**
- **Frontend**: Next.js 14.2.5, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Data**: TMDB API integration with demo fallback
- **State Management**: React Hooks, LocalStorage persistence
- **Styling**: Responsive design with modern UI components

###  **App Structure**

```
RecommendAI/
  Search Tab - Movie discovery with genre filtering
  Favorites Tab - Your saved movies with ratings
  Recommendations Tab - Personalized AI suggestions
```

###  **Recommendation Algorithms**

1. **Collaborative Filtering**: Analyzes user behavior patterns to suggest movies liked by similar users
2. **Genre-Based Recommendations**: Suggests movies within preferred genres with quality filtering  
3. **Content-Based Filtering**: Recommends movies with similar characteristics to your favorites
4. **User Analytics**: Provides insights into viewing preferences and recommendation accuracy

###  **Demo Content**

The app includes a rich demo database featuring:
- Marvel Cinematic Universe movies
- Classic films (Star Wars, The Dark Knight, Inception)
- Various genres and rating levels
- Complete metadata with posters, ratings, and descriptions

### **Deploy Your Own**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gunjan-D/RecommendAI)

**Or manually:**
1. Fork this repository on GitHub
2. Go to [Vercel](https://vercel.com) and sign in  
3. Click "Import Project" and select your forked repository
4. Deploy! (No environment variables needed - works with demo data)

###  **Getting Started**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gunjan-D/RecommendAI.git
   cd RecommendAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Add your TMDB API key (optional - demo data works without it)
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

###  **How It Works**

1. **Search Movies**: Use the search functionality or try demo buttons
2. **Add Favorites**: Click movies to add them to your favorites with ratings
3. **Get Recommendations**: Visit the Recommendations tab to see personalized suggestions
4. **Track Behavior**: The system learns from your interactions to improve suggestions

###  **User Analytics**

The system tracks and displays:
- Total movies in favorites
- Average rating preferences  
- Favorite genres analysis
- Recommendation accuracy score
- Viewing pattern insights

###  **API Endpoints**

- `/api/movies/search` - Movie search with genre filtering
- `/api/movies/demo-details` - Movie details with demo fallback
- `/api/recommendations/collaborative` - Collaborative filtering recommendations
- `/api/recommendations/genre` - Genre-based suggestions
- `/api/movies/[id]/similar` - Similar movie recommendations

###  **Future Enhancements**

- Integration with additional movie databases
- Advanced ML algorithms for better recommendations
- Social features and movie reviews
- Mobile app development
- Real-time recommendation updates

###  **Contributing**

Feel free to contribute to this project by:
- Adding new recommendation algorithms
- Improving UI/UX design
- Expanding the demo database
- Optimizing performance
- Adding new features

###  **License**

This project is open source and available under the [MIT License](LICENSE).

---

**Built with  using Next.js, React, and Machine Learning principles**

 **Live Demo**: [RecommendAI on GitHub](https://github.com/Gunjan-D/RecommendAI)
