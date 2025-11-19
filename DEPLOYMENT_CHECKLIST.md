# 🚀 Deployment Checklist - Movie Explorer

## ✅ Status: Ready to Deploy!

Your code is ready and committed to Git. Follow these steps to deploy:

---

## STEP 1: Get TMDB API Key ⏳

1. **Sign up for TMDB account:**
   - Go to: https://www.themoviedb.org/signup
   - Fill in your details (free, no payment needed)
   - Verify your email

2. **Get API Key:**
   - Go to: https://www.themoviedb.org/settings/api
   - Click "Create" or "Request an API Key"
   - Choose "Developer" option
   - Fill in the form (can use dummy URL like http://localhost:3000)
   - Copy your API key (looks like: `abc123def456ghi789jkl012mno345pq`)
   - **Save it somewhere safe** - you'll need it for Vercel!

---

## STEP 2: Create GitHub Repository ⏳

1. **Go to GitHub:**
   - URL: https://github.com/new

2. **Fill in details:**
   - Repository name: `movie-explorer`
   - Description: `Movie Explorer web app - search movies, view details, save favorites`
   - Visibility: **Public** (required for free Vercel deployment)
   - **DO NOT** check any of these:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   
3. **Click "Create repository"**

4. **Copy the repository URL** (it will look like):
   ```
   https://github.com/YOUR-USERNAME/movie-explorer.git
   ```

---

## STEP 3: Push Code to GitHub ⏳

**Run these commands in VS Code terminal:**

Replace `YOUR-USERNAME` with your actual GitHub username!

```powershell
# Add GitHub as remote (replace YOUR-USERNAME!)
git remote add origin https://github.com/YOUR-USERNAME/movie-explorer.git

# Push your code
git push -u origin main
```

**If you get an error about authentication:**
- GitHub might ask you to log in
- Use GitHub Desktop or Personal Access Token
- Or authenticate via browser when prompted

---

## STEP 4: Deploy to Vercel ⏳

1. **Go to Vercel:**
   - URL: https://vercel.com

2. **Sign Up / Log In:**
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

3. **Create New Project:**
   - Click "Add New..." → "Project"
   - You'll see a list of your GitHub repositories
   - Find and click on `movie-explorer`
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** (leave default - `npm run build`)
   - **Output Directory:** (leave default - `.next`)

5. **Add Environment Variable (IMPORTANT!):**
   - Click "Environment Variables" section
   - Name: `TMDB_API_KEY`
   - Value: (paste your TMDB API key from Step 1)
   - Click "Add"

6. **Deploy:**
   - Click "Deploy" button
   - Wait 2-3 minutes while Vercel builds your app
   - You'll get a URL like: `https://movie-explorer-xyz123.vercel.app`

7. **Test Your App:**
   - Click on the deployment URL
   - Try searching for a movie (e.g., "Inception")
   - Click on a movie to see details
   - Add to favorites with rating and note
   - Verify favorites persist after refresh

---

## STEP 5: Submit Your Project ⏳

**Email Response Template:**

```
Subject: Take-Home Project Submission - Movie Explorer

Hello,

Please find my Movie Explorer project submission:

GitHub Repository: https://github.com/YOUR-USERNAME/movie-explorer
Live Demo: https://movie-explorer-xyz123.vercel.app

Project Features:
✅ Search movies by title with TMDB API
✅ View detailed movie information (poster, overview, year, runtime, genres)
✅ Add/remove favorites with personal ratings (1-5 stars) and notes
✅ LocalStorage persistence for favorites
✅ Server-side API proxy for secure key management
✅ Comprehensive error handling
✅ Responsive design with Tailwind CSS

Technical Stack:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- TMDB API integration via Next.js API routes

Setup Instructions:
Complete setup and run instructions are available in the README.md file.

Time Spent: Approximately 3 hours

Documentation:
- README.md: Full documentation with technical decisions and tradeoffs
- DEPLOYMENT_GUIDE.md: Step-by-step deployment instructions
- ALTERNATIVE_SETUP.md: Alternative setup methods

I look forward to discussing my implementation decisions and tradeoffs in the technical interview.

Best regards,
Gunjan Deshpande
```

**Replace:**
- `YOUR-USERNAME` with your GitHub username
- `xyz123` with your actual Vercel deployment URL
- Add any additional notes you want to mention

---

## 📋 Final Checklist

- [ ] TMDB API key obtained
- [ ] GitHub repository created (`movie-explorer`)
- [ ] Code pushed to GitHub
- [ ] Vercel account created with GitHub
- [ ] Project deployed to Vercel
- [ ] Environment variable added (`TMDB_API_KEY`)
- [ ] Live app tested and working
- [ ] GitHub URL copied
- [ ] Vercel URL copied
- [ ] Submission email sent

---

## 🆘 Troubleshooting

### If GitHub push fails:
```powershell
# Check if remote is set correctly
git remote -v

# If wrong, remove and re-add
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/movie-explorer.git
git push -u origin main
```

### If Vercel build fails:
1. Check build logs in Vercel dashboard
2. Verify environment variable is set correctly
3. Make sure API key has no extra spaces
4. Try redeploying

### If movies don't load on deployed app:
1. Check browser console (F12 → Console)
2. Verify `TMDB_API_KEY` environment variable in Vercel settings
3. Test API key at: https://www.themoviedb.org/settings/api
4. Redeploy after fixing environment variable

---

## 🎉 You're Almost Done!

Once deployed, your app will be live and accessible to anyone with the URL. The interviewers can test it without needing to run it locally.

Good luck with your submission! 🚀
