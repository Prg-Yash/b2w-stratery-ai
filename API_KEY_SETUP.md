# API Key Configuration

## How It Works

This project uses a hybrid approach for API key management:

### Local Development

- API key is stored in `js/config/apiConfig.js` (git-ignored)
- Works immediately when you clone the repo

### Production (Vercel/GitHub Pages)

- API key is injected at build time from environment variables
- Secure and never exposed in your repository

## Setup for Different Environments

### 🏠 Local Development

1. Your key is already in `js/config/apiConfig.js`
2. Just open `index.html` in your browser - it works!

### ☁️ Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add: `GEMINI_API_KEY` = your_api_key
3. Deploy with `vercel`

### 📄 GitHub Pages

1. Go to **Repo Settings** → **Secrets and variables** → **Actions**
2. Add secret: `GEMINI_API_KEY` = your_api_key
3. Push to GitHub - automatic deployment via GitHub Actions

### 🔄 How Build Process Works

When you run `npm run build`:

```javascript
// Before build (in apiConfig.js):
GEMINI_API_KEY: "__GEMINI_API_KEY__" !== "__GEMINI_API_KEY__"
  ? "__GEMINI_API_KEY__"
  : "AIzaSyBOYGd..."; // fallback for local

// After build (injected):
GEMINI_API_KEY: "your_actual_key_from_env";
```

The build script (`build.js`) replaces `__GEMINI_API_KEY__` with the value from `process.env.GEMINI_API_KEY`.

## Security

- ✅ `apiConfig.js` is in `.gitignore` - your key won't be committed
- ✅ Production uses environment variables - keys stay secret
- ✅ Template file (`apiConfig.template.js`) is safe to commit
- ✅ Build process runs server-side, not in browser

## Get Your API Key

Get a free Gemini API key: https://makersuite.google.com/app/apikey
