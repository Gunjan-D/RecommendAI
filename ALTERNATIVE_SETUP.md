# Alternative Installation Methods for Node.js (No Admin Required)

## If You Don't Have Admin Access

If you can't install Node.js because you don't have administrator privileges, here are alternatives:

---

## Option 1: Use Node.js Portable (No Admin Required)

### Download Portable Version:
1. Go to: https://nodejs.org/dist/v20.10.0/node-v20.10.0-win-x64.zip
2. Download the ZIP file (no installation needed)
3. Extract to a folder like: `C:\Users\gdeshpande\nodejs`

### Add to PATH manually for this session:
```powershell
# Set the path to where you extracted Node.js
$env:Path += ";C:\Users\gdeshpande\nodejs"

# Verify it works
node --version
npm --version
```

### To make it permanent (for your user only):
```powershell
# Add to your user PATH (doesn't require admin)
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Users\gdeshpande\nodejs", "User")
```

Then restart VS Code.

---

## Option 2: Use Vercel CLI (Deploy Without Local Testing)

You can deploy directly to Vercel without installing Node.js locally:

1. **Ensure code is on GitHub** (you already did this ✅)
2. **Go to Vercel**: https://vercel.com
3. **Sign up with GitHub**
4. **Import your repository**: movie-explorer
5. **Add environment variable**: `TMDB_API_KEY=your_api_key`
6. **Deploy** - Vercel will build it for you in the cloud!

This way you can skip local testing and deploy directly.

---

## Option 3: Use GitHub Codespaces (Free Cloud Development)

1. Go to your GitHub repository
2. Click the green "Code" button
3. Select "Codespaces" tab
4. Click "Create codespace on main"
5. GitHub will give you a cloud VS Code with Node.js pre-installed
6. Run `npm install` and `npm run dev` in the cloud
7. Test your app in the browser

---

## Option 4: Contact Your IT Department

If this is a work or school computer with restricted access:
- Contact your IT administrator
- Ask them to install Node.js for you
- Or ask for temporary admin privileges

---

## Recommended Path Forward

Since you have Git working and your code is ready:

**SKIP LOCAL TESTING → DEPLOY DIRECTLY:**
1. Create GitHub repository (if not done)
2. Push your code to GitHub
3. Deploy to Vercel (they'll build it for you)
4. Test the live deployed version

You don't actually NEED to run it locally - you can deploy and test on Vercel directly!
