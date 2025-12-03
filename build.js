#!/usr/bin/env node

/**
 * Build script for injecting environment variables at build time
 * This runs on Vercel/GitHub Actions before deployment
 */

const fs = require("fs");
const path = require("path");

const apiConfigPath = path.join(__dirname, "js", "config", "apiConfig.js");

// Read the template
let content = fs.readFileSync(apiConfigPath, "utf8");

// Replace placeholder with actual environment variable
const geminiApiKey = process.env.GEMINI_API_KEY || "";
content = content.replace(/__GEMINI_API_KEY__/g, geminiApiKey);

// Write back
fs.writeFileSync(apiConfigPath, content, "utf8");

console.log("✅ API configuration built successfully");
