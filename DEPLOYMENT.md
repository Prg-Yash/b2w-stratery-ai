# 🚀 Deployment Guide

## Pre-Deployment Tasks

### 1. Code Validation ✅

- [x] All files created successfully
- [x] No syntax errors
- [x] CSS compatibility warnings fixed
- [x] ES6 module imports verified
- [x] All dependencies loaded via CDN

### 2. Environment Variables Setup

#### For Vercel Deployment:

1. **Go to Vercel Dashboard**:

   - Navigate to your project
   - Go to **Settings** → **Environment Variables**

2. **Add Environment Variable**:

   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Google Gemini API key
   - **Environments**: Select all (Production, Preview, Development)
   - Click **Save**

3. **Deploy**:
   ```bash
   vercel
   ```
   The `npm run build` command will automatically inject the API key.

#### For GitHub Pages Deployment:

1. **Set GitHub Secret**:

   - Go to your repository on GitHub
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Google Gemini API key
   - Click **Add secret**

2. **Create GitHub Actions Workflow**:
   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: "18"

         - name: Build with API key
           env:
             GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
           run: npm run build

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: .
   ```

3. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Source: **GitHub Actions**

#### For Local Development:

Your API key is already set in `js/config/apiConfig.js` as a fallback for local development. No additional setup needed.

### 3. Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the key for use in Vercel/GitHub secrets

### 4. Testing Checklist

#### Core Functionality

- [ ] Open `index-new.html` in browser
- [ ] Fill out project brief form
- [ ] Select all dropdown options
- [ ] Adjust duration slider
- [ ] Toggle animation styles
- [ ] Click "Save Profile" (check LocalStorage)
- [ ] Click "Generate B2W Strategy"
- [ ] Verify AI response displays
- [ ] Check creative brief section
- [ ] Verify portfolio matches load

#### Mode Switching

- [ ] Toggle "Single Asset" mode
- [ ] Toggle "Full Funnel" mode
- [ ] Verify funnel chart appears in Full Funnel mode
- [ ] Verify funnel chart hides in Single Asset mode

#### Multi-Language

- [ ] Switch to Spanish (ES)
- [ ] Switch to French (FR)
- [ ] Switch to German (DE)
- [ ] Switch back to English (EN)
- [ ] Verify language persists on page reload

#### Comparison Mode

- [ ] Generate strategy with multiple recommendations
- [ ] Click comparison toggle button
- [ ] Verify comparison cards display
- [ ] Verify comparison table displays
- [ ] Check cost estimates
- [ ] Check timeline estimates
- [ ] Select an option (verify toast notification)

#### Budget Calculator

- [ ] Click "Show Budget Calculator" button
- [ ] Verify calculator panel displays
- [ ] Check cost summary
- [ ] Check ROI metrics
- [ ] Check cost breakdown
- [ ] Verify calculations are accurate

#### Export Features

- [ ] Click "Export PDF" button
- [ ] Verify PDF downloads
- [ ] Open PDF and check formatting
- [ ] Check B2W branding in PDF
- [ ] Click "Export Google Docs" button
- [ ] Verify HTML file downloads
- [ ] Import HTML to Google Docs (test)
- [ ] Verify formatting in Google Docs

#### Cross-Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, Mac only)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

#### Responsive Design

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile landscape

### 4. Performance Testing

- [ ] Run Lighthouse audit (target: 90+ performance score)
- [ ] Check page load time (<3s on 3G)
- [ ] Verify no console errors
- [ ] Check network tab for failed requests
- [ ] Test with slow network (throttling)

### 5. Security Review

- [ ] API key externalized (NOT hardcoded)
- [ ] No sensitive data in client-side code
- [ ] CORS properly configured
- [ ] Input sanitization (relies on Gemini safety filters)
- [ ] XSS protection (using `innerText` not `innerHTML`)

---

## Deployment Options

### Option 1: Netlify (Recommended)

**Steps:**

1. Create account at netlify.com
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Navigate to project directory
4. Deploy:
   ```bash
   netlify deploy --prod --dir .
   ```
5. Set environment variables in Netlify dashboard:
   - `GEMINI_API_KEY` = your-api-key

**Advantages:**

- Free tier available
- Automatic HTTPS
- CDN included
- Easy rollbacks
- Custom domains

### Option 2: Vercel

**Steps:**

1. Create account at vercel.com
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Navigate to project directory
4. Deploy:
   ```bash
   vercel --prod
   ```
5. Set environment variables in Vercel dashboard

**Advantages:**

- Free tier available
- Fast global CDN
- Automatic HTTPS
- Easy GitHub integration

### Option 3: GitHub Pages

**Steps:**

1. Create GitHub repository
2. Push code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/b2w-copilot.git
   git push -u origin main
   ```
3. Enable GitHub Pages in repository settings
4. Select branch: `main`
5. Select folder: `/ (root)`
6. Access: `https://yourusername.github.io/b2w-copilot/index-new.html`

**Note:** API key must be externalized for GitHub Pages

**Advantages:**

- Free for public repositories
- Direct GitHub integration
- Simple workflow

### Option 4: AWS S3 + CloudFront

**Steps:**

1. Create S3 bucket
2. Enable static website hosting
3. Upload all files
4. Set bucket policy for public read
5. Create CloudFront distribution (optional, for CDN)
6. Point custom domain (optional)

**Advantages:**

- Highly scalable
- Professional solution
- Full AWS ecosystem integration
- Custom domain support

---

## Post-Deployment Tasks

### 1. Verification

- [ ] Visit deployed URL
- [ ] Test all features in production
- [ ] Check browser console for errors
- [ ] Verify API calls work
- [ ] Test on mobile devices
- [ ] Share link with team for testing

### 2. Monitoring

- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor API usage (Gemini quotas)
- [ ] Track page analytics (Google Analytics, Plausible, etc.)
- [ ] Set up uptime monitoring (UptimeRobot, etc.)

### 3. Documentation

- [ ] Update README with production URL
- [ ] Document deployment process
- [ ] Create user guide (if needed)
- [ ] Share with B2W team

### 4. Backup

- [ ] Create GitHub repository backup
- [ ] Document all environment variables
- [ ] Save original files before any changes
- [ ] Create deployment rollback plan

---

## Environment Variables Setup

### For Server-Based Deployment

**Create `.env` file** (add to `.gitignore`):

```env
GEMINI_API_KEY=your-actual-api-key-here
```

**Update `js/app.js`:**

```javascript
// Before (hardcoded):
const apiKey = "AIzaSyCE2gjjrMXthFlTMyW8eYHJjKjAZ7Y1cDI";

// After (from environment):
const apiKey =
  process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
```

**Note:** Since this is vanilla JS (no build tool), you'll need to:

1. Use a server-side proxy for API calls, OR
2. Use Netlify/Vercel environment variables with their build process, OR
3. Keep hardcoded for internal use only

---

## Quick Deploy Commands

### Netlify

```bash
cd "C:\Users\YASH\Downloads\b2w-video-strategy-copilot"
netlify deploy --prod
```

### Vercel

```bash
cd "C:\Users\YASH\Downloads\b2w-video-strategy-copilot"
vercel --prod
```

### GitHub Pages

```bash
cd "C:\Users\YASH\Downloads\b2w-video-strategy-copilot"
git init
git add .
git commit -m "Production ready B2W Strategy Copilot"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

---

## Rollback Plan

If deployment fails:

1. **Netlify/Vercel:** Use dashboard to rollback to previous deployment
2. **GitHub Pages:** Revert commit and force push
3. **S3:** Restore from backup or re-upload files

**Backup Files:**

- Original `index.html` (monolithic version) is preserved
- All new files can be regenerated from documentation

---

## Success Metrics

After deployment, measure:

- [ ] Page load time (<3 seconds)
- [ ] Time to interactive (<5 seconds)
- [ ] Lighthouse performance score (>90)
- [ ] Mobile usability score (>90)
- [ ] Zero console errors
- [ ] API success rate (>95%)
- [ ] User engagement (track with analytics)

---

## Support & Maintenance

### Ongoing Tasks

- Monitor API usage and costs
- Update B2W knowledge base as needed
- Add new languages if requested
- Respond to user feedback
- Fix bugs promptly
- Update dependencies (CDNs)

### Update Schedule

- **Weekly:** Check for errors, monitor usage
- **Monthly:** Review analytics, update content
- **Quarterly:** Update B2W portfolio/pricing data
- **Annually:** Major feature additions, redesign

---

## 🎯 Final Checklist Before Going Live

- [ ] All features tested
- [ ] API key externalized
- [ ] Cross-browser tested
- [ ] Mobile tested
- [ ] Documentation complete
- [ ] Team approved
- [ ] Backup created
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Performance optimized
- [ ] Security reviewed

---

## Ready to Deploy! 🚀

Once all checkboxes are complete, you're ready to deploy the B2W Video Strategy Copilot to production!

**Recommended First Deployment:** Netlify (easiest, fastest, free)

**Questions?** Review:

- `README-PRODUCTION.md` - Full documentation
- `QUICKSTART.md` - Quick setup guide
- `PROJECT-SUMMARY.md` - What was built

---

**Good luck with your deployment!** 🎬✨
