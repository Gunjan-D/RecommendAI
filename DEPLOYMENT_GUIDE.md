# Movie Explorer - Setup & Deployment Guide


## STEP 1: Install Node.js (DO THIS FIRST!)

### Why?
Node.js is required to run npm commands and the Next.js application.

### Instructions:
1. Go to: **https://nodejs.org/**
2. Download: **LTS version** (recommended for most users)
3. Run the installer: Accept all default options
4. **IMPORTANT**: After installation, close VS Code completely and reopen it
5. Verify installation by running in PowerShell:
   ```powershell
   node --version
   npm --version
   ```
   Both should show version numbers (e.g., v20.x.x)

---

## STEP 2: Get TMDB API Key

### Instructions:
1. Go to: **https://www.themoviedb.org/signup**
2. Create a free account
3. Go to: **https://www.themoviedb.org/settings/api**
4. Request an API key (choose "Developer" option)
5. Copy your API key (it looks like: `1234abcd5678efgh9012ijk....`)

### Configure API Key:
I already have created `.env.local` file. Now edit it:

1. Open `.env.local` in VS Code
2. Replace `your_api_key_here` with your actual TMDB API key:
   ```
   TMDB_API_KEY=1234abcd5678efgh9012ijkl3456mnop
   ```
3. Save the file

---

## STEP 3: Install Dependencies & Test Locally

### Run these commands in PowerShell:

```powershell
# Install all npm packages
npm install

# Start development server
npm run dev
```

### Expected Output:
```
- Local:        http://localhost:3000
```

### Test the Application:
1. Open browser: http://localhost:3000
2. Search for a movie (e.g., "Inception")
3. Click on a movie to see details
4. Add to favorites with rating and note
5. Toggle to Favorites view
6. Verify favorites persist after page refresh

---

## STEP 4: Create GitHub Repository

### Instructions:
1. Go to: **https://github.com/new**
2. Repository name: `movie-explorer`
3. Description: `Movie Explorer web app - search movies, view details, save favorites`
4. Keep it **Public** (required for free Vercel deployment)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Copy the repository URL:
It will look like: `https://github.com/Gunjan-D/movie-explorer.git`

---

## STEP 5: Push Code to GitHub

### Run these commands:

```powershell

git branch -M main

# Add your GitHub repository as remote 
git remote add origin https://github.com/Gunjan-D/movie-explorer.git

# Push code to GitHub
git push -u origin main
```


```powershell
git branch -M main
git remote add origin https://github.com/Gunjan-D/movie-explorer.git
git push -u origin main
```

---

## STEP 6: Deploy to Vercel

### Instructions:

1. Go to: **https://vercel.com**
2. Click "Sign Up" or "Login" (use GitHub account for easy integration)
3. Click "Add New Project" or "Import Project"
4. Select your `movie-explorer` repository from GitHub
5. Configure Project:
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. **Add Environment Variable**:
   - Click "Environment Variables"
   - Name: `TMDB_API_KEY`
   - Value: `your_actual_tmdb_api_key`
   - Click "Add"
7. Click "Deploy"

### Deployment Time:
Usually takes 2-3 minutes. You'll get a URL like:
`https://movie-explorer-abc123.vercel.app`

---


