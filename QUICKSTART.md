# 🚀 Quick Start Guide

## Get Running in 60 Seconds

### 1. Start Local Server

**Windows PowerShell:**

```powershell
# Navigate to project directory
cd "C:\Users\YASH\Downloads\b2w-video-strategy-copilot"

# Start Python server
python -m http.server 8000
```

**Alternative (if Python not available):**

- Use VS Code "Live Server" extension
- Right-click `index-new.html` → "Open with Live Server"

### 2. Open in Browser

Navigate to: **http://localhost:8000/index-new.html**

### 3. Test the Application

1. **Enter a project description:**

   ```
   We're a Series B SaaS company launching an AI-powered project management tool. Need to explain our complex features to non-technical users and drive demo signups.
   ```

2. **Select options:**

   - Industry: SaaS & Tech
   - Stage: Series B+
   - Funnel: Consideration (Mid)
   - Goal: Book Demos
   - Duration: 60s
   - Style: 2D Character

3. **Click "Generate B2W Strategy"**

4. **Explore results:**
   - View AI recommendation
   - Read creative brief
   - Check portfolio matches
   - Try language switcher (top right)
   - Click "Show Budget Calculator"
   - Export to PDF

## 🎯 File Overview

### Use These Files:

- ✅ **index-new.html** - Main entry point
- ✅ **css/main.css** - All styles
- ✅ **js/app.js** - Main application
- ✅ **js/** folder - All modular code
- ✅ **locales/** folder - Translations

### Legacy Files (Reference Only):

- ⚠️ **index.html** - Original monolithic version
- ⚠️ **metadata.json** - Project metadata
- ⚠️ **README.md** - Original README

## 📂 Key Directories

```
/css/          → Stylesheets
/js/           → JavaScript modules
  /config/     → B2W knowledge base
  /services/   → Gemini AI service
  /utils/      → Helper utilities
/locales/      → Translation files
```

## 🔑 Important Notes

1. **ES6 Modules Requirement:**

   - MUST run on local server (not `file://`)
   - Chrome/Firefox/Edge 80+ required

2. **API Key:**

   - Currently hardcoded in `js/app.js` (line 87)
   - Key: `AIzaSyCE2gjjrMXthFlTMyW8eYHJjKjAZ7Y1cDI`
   - For production: Move to environment variable

3. **No Build Required:**
   - Pure vanilla JavaScript
   - No npm, webpack, or Vite needed
   - Just serve and run!

## ✨ Feature Checklist

After opening, verify these features work:

- [ ] Project input form
- [ ] Style selection toggles
- [ ] Generate button (creates AI recommendation)
- [ ] Creative brief display
- [ ] Portfolio matches
- [ ] Language switcher (EN/ES/FR/DE)
- [ ] Budget calculator toggle
- [ ] Comparison mode (if multiple recommendations)
- [ ] PDF export button
- [ ] Google Docs export button
- [ ] Full funnel mode toggle

## 🐛 Quick Fixes

**Icons not showing?**

```javascript
// Browser console:
lucide.createIcons();
```

**Translations not loading?**

- Check browser console for 404 errors
- Verify files exist: `locales/en.json`, `locales/es.json`, etc.

**API errors?**

- Check browser console for Gemini API errors
- Verify API key is valid
- App will fallback to mock data if API fails

## 📖 Next Steps

1. Read **README-PRODUCTION.md** for full documentation
2. Explore **js/config/b2wKnowledgeBase.js** to see B2W data
3. Check **js/services/geminiService.js** for AI prompts
4. Review **locales/en.json** for UI strings

## 🎨 Customization Quick Tips

**Change AI personality:**
→ Edit `js/services/geminiService.js` → `getSystemInstruction()`

**Add new language:**
→ Copy `locales/en.json` → `locales/yourLang.json` → translate

**Update B2W data:**
→ Edit `js/config/b2wKnowledgeBase.js`

**Modify styling:**
→ Edit `css/main.css`

---

**Ready to deploy?** See README-PRODUCTION.md → Deployment section
