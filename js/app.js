/**
 * B2W Video Strategy Copilot - Main Application
 * Integrates all services and utilities into cohesive application
 *
 * NEW FEATURES:
 * - Multi-language support (Google Translate)
 * - PDF Export
 * - Comparison Mode
 * - Budget Calculator & ROI Estimator
 * - Enhanced B2W Knowledge Base
 */

import geminiService from "./services/geminiService.js";
import pdfExporter from "./utils/pdfExport.js";
import budgetCalculator from "./utils/budgetCalculator.js";
import comparisonManager from "./utils/comparison.js";
import B2W_KNOWLEDGE_BASE from "./config/b2wKnowledgeBase.js";
import { API_CONFIG } from "./config/apiConfig.js";

// Animation styles from knowledge base
const STYLES = Object.keys(B2W_KNOWLEDGE_BASE.animationStyles).map(
  (key) => B2W_KNOWLEDGE_BASE.animationStyles[key].name
);

// Application State
const state = {
  isFunnel: false,
  loading: false,
  showComparison: false,
  showBudgetCalc: false,
  input: {
    description: "",
    industry: "SaaS",
    stage: "Series A",
    funnel: "Consideration",
    goal: "Book Demos",
    duration: 60,
    styles: [],
  },
  data: null,
  currentLanguage: "en",
};

// DOM Elements (will be populated on init)
let els = {};

// Simple i18n fallback - Google Translate will handle translation
const i18n = {
  t: (key) => {
    const translations = {
      "notifications.profileSaved": "Profile Saved",
      "notifications.profileLoaded": "Loaded",
      "notifications.formIncomplete": "Please fill in the description",
      "notifications.briefCopied": "Brief copied to clipboard",
      "results.ctaPricing": "Recommended:",
      "results.briefAudience": "Audience",
      "results.briefMessage": "Message",
      "results.briefStoryArc": "Story Arc",
      "results.hideComparison": "Hide Comparison",
      "results.showComparison": "Show Comparison",
      "results.exportPDF": "Export to PDF",
      "results.budgetCalculator": "Budget Calculator",
      "results.matchLabel": "Match",
      "results.whyWorks": "Why It Works",
      "results.projectedOutcome": "Projected Outcome",
      "results.creativeBrief": "Creative Brief",
      "results.provenSuccess": "Proven Success Stories",
      "budgetCalc.title": "Budget Calculator & ROI Estimator",
      "budgetCalc.subtitle": "Project your video marketing investment",
      "budgetCalc.pricing": "Pricing Breakdown",
      "budgetCalc.basePrice": "Base Price",
      "budgetCalc.additions": "Additional Costs",
      "budgetCalc.roi": "Projected ROI",
      "export.exportSuccess": "Exported successfully:",
      "export.exportError": "Export failed",
      "export.portfolioMatches": "Portfolio Matches",
      "export.nextSteps": "Next Steps",
      "export.contactInfo": "Contact Information",
      "export.pdfTitle": "B2W Video Strategy",
      "comparison.title": "Video Strategy Comparison",
      "comparison.style": "Style",
      "form.projectBrief": "Project Brief",
    };
    return translations[key] || key;
  },
};

/**
 * Initialize Application
 */
async function init() {
  try {
    console.log("🚀 Initializing B2W Strategy Copilot...");

    // Cache DOM elements
    cacheElements();

    // Initialize Gemini with Worker URL
    const workerUrl = API_CONFIG.WORKER_URL;
    console.log("🔑 Worker URL loaded:", workerUrl || "MISSING");

    const geminiInitialized = await geminiService.init(workerUrl);

    if (!geminiInitialized) {
      console.warn(
        "⚠️ Gemini not initialized - will use demo mode for generations"
      );
    }

    // Setup event listeners
    setupEventListeners();

    // Render initial UI
    renderStyles();
    loadProfile();

    // Initialize icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    console.log("✅ B2W Strategy Copilot initialized successfully");
  } catch (error) {
    console.error("❌ Critical initialization error:", error);
    console.error("Error stack:", error.stack);
    // App can still work with demo mode, so don't show error to user
  }
}

/**
 * Cache DOM Elements
 */
function cacheElements() {
  els = {
    // Input elements
    desc: document.getElementById("input-desc"),
    industry: document.getElementById("input-industry"),
    stage: document.getElementById("input-stage"),
    funnel: document.getElementById("input-funnel"),
    goal: document.getElementById("input-goal"),
    duration: document.getElementById("input-duration"),
    durationLabel: document.getElementById("duration-label"),
    styleContainer: document.getElementById("style-container"),

    // Action buttons
    btnGenerate: document.getElementById("btn-generate"),
    btnSave: document.getElementById("btn-save"),
    modeSingle: document.getElementById("mode-single"),
    modeFunnel: document.getElementById("mode-funnel"),

    // View containers
    viewForm: document.getElementById("view-form"),
    viewEmpty: document.getElementById("view-empty"),
    viewLoading: document.getElementById("view-loading"),
    viewResults: document.getElementById("view-results"),

    // Results elements
    recTitle: document.getElementById("rec-title"),
    recDesc: document.getElementById("rec-desc"),
    recScore: document.getElementById("rec-score"),
    recStyle: document.getElementById("rec-style"),
    recDuration: document.getElementById("rec-duration"),
    recWhy: document.getElementById("rec-why"),
    recMetric: document.getElementById("rec-metric"),
    recPricing: document.getElementById("rec-pricing"),

    // Creative brief & portfolio
    briefContent: document.getElementById("brief-content"),
    portfolioList: document.getElementById("portfolio-list"),

    // Funnel
    funnelContainer: document.getElementById("funnel-container"),
    funnelChart: document.getElementById("funnel-chart"),

    // New feature containers
    comparisonContainer: document.getElementById("comparison-container"),
    budgetContainer: document.getElementById("budget-container"),
    exportButtonsContainer: document.getElementById("export-buttons"),
  };
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  // Input listeners
  els.desc?.addEventListener("input", (e) =>
    updateInput("description", e.target.value)
  );
  els.industry?.addEventListener("change", (e) =>
    updateInput("industry", e.target.value)
  );
  els.stage?.addEventListener("change", (e) =>
    updateInput("stage", e.target.value)
  );
  els.funnel?.addEventListener("change", (e) =>
    updateInput("funnel", e.target.value)
  );
  els.goal?.addEventListener("change", (e) =>
    updateInput("goal", e.target.value)
  );
  els.duration?.addEventListener("input", (e) => {
    updateInput("duration", parseInt(e.target.value));
    if (els.durationLabel) {
      els.durationLabel.innerText = e.target.value + "s";
    }
  });

  // Action listeners
  els.modeSingle?.addEventListener("click", () => setMode(false));
  els.modeFunnel?.addEventListener("click", () => setMode(true));
  els.btnGenerate?.addEventListener("click", generateStrategy);
  els.btnSave?.addEventListener("click", saveProfile);

  // Language change listener
  window.addEventListener("languageChanged", (e) => {
    state.currentLanguage = e.detail.language;
    if (state.data) {
      renderResults(state.data);
    }
  });

  // Comparison selection listener
  window.addEventListener("comparisonSelected", (e) => {
    console.log("Selected comparison option:", e.detail.option);
    showToast(`Selected: ${e.detail.option.title}`, "success");
  });
}

/**
 * Update input state
 */
function updateInput(key, value) {
  state.input[key] = value;
  if (els.btnGenerate) {
    els.btnGenerate.disabled = !state.input.description.trim();
  }
}

/**
 * Toggle style selection
 */
function toggleStyle(style) {
  const idx = state.input.styles.indexOf(style);
  if (idx > -1) {
    state.input.styles.splice(idx, 1);
  } else {
    state.input.styles.push(style);
  }
  renderStyles();
}

/**
 * Render style selection buttons
 */
function renderStyles() {
  if (!els.styleContainer) return;

  els.styleContainer.innerHTML = "";
  STYLES.forEach((style) => {
    const isActive = state.input.styles.includes(style);
    const btn = document.createElement("button");
    btn.className = `text-[10px] px-3 py-1.5 rounded-lg border transition-all font-medium ${
      isActive
        ? "bg-b2w-purple text-white border-b2w-purple shadow-md shadow-purple-900/30"
        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
    }`;
    btn.innerText = style;
    btn.onclick = () => toggleStyle(style);
    els.styleContainer.appendChild(btn);
  });
}

/**
 * Render language selector
 */
function renderLanguageSelector() {
  const header = document.querySelector("header");
  if (!header) return;

  const languages = i18n.getSupportedLanguages();
  const selector = document.createElement("div");
  selector.className = "language-selector";
  selector.innerHTML = `
    <select id="language-select" class="text-xs">
      ${languages
        .map(
          (lang) => `
        <option value="${lang.code}" ${
            lang.code === state.currentLanguage ? "selected" : ""
          }>
          ${lang.name}
        </option>
      `
        )
        .join("")}
    </select>
  `;

  const portfolioLink = header.querySelector('a[href*="portfolio"]');
  if (portfolioLink) {
    header.insertBefore(selector, portfolioLink);
  }

  document
    .getElementById("language-select")
    ?.addEventListener("change", (e) => {
      i18n.setLanguage(e.target.value);
    });
}

/**
 * Set mode (Single vs Funnel)
 */
function setMode(isFunnel) {
  state.isFunnel = isFunnel;

  if (els.modeFunnel && els.modeSingle) {
    if (isFunnel) {
      els.modeFunnel.classList.replace("text-slate-400", "text-white");
      els.modeFunnel.classList.add("bg-b2w-purple", "shadow-lg");
      els.modeSingle.classList.remove(
        "bg-b2w-purple",
        "text-white",
        "shadow-lg"
      );
      els.modeSingle.classList.add("text-slate-400");
    } else {
      els.modeSingle.classList.replace("text-slate-400", "text-white");
      els.modeSingle.classList.add("bg-b2w-purple", "shadow-lg");
      els.modeFunnel.classList.remove(
        "bg-b2w-purple",
        "text-white",
        "shadow-lg"
      );
      els.modeFunnel.classList.add("text-slate-400");
    }
  }

  if (state.data) {
    renderResults(state.data);
  }
}

/**
 * Save user profile
 */
function saveProfile() {
  try {
    localStorage.setItem("b2w_profile_v2", JSON.stringify(state.input));
    showToast(i18n.t("notifications.profileSaved"), "success");

    if (els.btnSave) {
      const originalHTML = els.btnSave.innerHTML;
      els.btnSave.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> <span class="text-emerald-400">${i18n.t(
        "form.savedSuccess"
      )}</span>`;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        els.btnSave.innerHTML = originalHTML;
        if (window.lucide) window.lucide.createIcons();
      }, 2000);
    }
  } catch (error) {
    console.error("Failed to save profile:", error);
  }
}

/**
 * Load user profile
 */
function loadProfile() {
  try {
    const saved = localStorage.getItem("b2w_profile_v2");
    if (saved) {
      state.input = JSON.parse(saved);

      // Update form fields
      if (els.desc) els.desc.value = state.input.description;
      if (els.industry) els.industry.value = state.input.industry;
      if (els.stage) els.stage.value = state.input.stage;
      if (els.funnel) els.funnel.value = state.input.funnel;
      if (els.goal) els.goal.value = state.input.goal;
      if (els.duration) {
        els.duration.value = state.input.duration;
        if (els.durationLabel) {
          els.durationLabel.innerText = state.input.duration + "s";
        }
      }

      updateInput("description", state.input.description);
      renderStyles();
    }
  } catch (error) {
    console.error("Failed to load profile:", error);
  }
}

/**
 * Generate Strategy (Main Action)
 */
async function generateStrategy() {
  if (!state.input.description.trim()) {
    showToast(i18n.t("notifications.formIncomplete"), "error");
    return;
  }

  state.loading = true;
  updateView();

  try {
    const data = await geminiService.generateStrategy(
      state.input,
      state.isFunnel
    );
    state.data = data;
    renderResults(data);
  } catch (error) {
    console.error("❌ Strategy generation failed:", error);
    // Don't show error toast - geminiService handles fallback to demo mode gracefully
  } finally {
    state.loading = false;
    updateView();
  }
}

/**
 * Render Results
 */
function renderResults(data) {
  if (!data || !data.recommendations || data.recommendations.length === 0) {
    console.error("Invalid data structure");
    return;
  }

  const rec = data.recommendations[0];

  // Main recommendation card
  if (els.recTitle) els.recTitle.innerText = rec.title;
  if (els.recDesc) els.recDesc.innerText = rec.description;
  if (els.recScore) els.recScore.innerText = rec.score;
  if (els.recStyle) els.recStyle.innerText = rec.style;
  if (els.recDuration)
    els.recDuration.innerText = state.input.duration + " Seconds";
  if (els.recWhy)
    els.recWhy.innerText = rec.whyPerfect || "Optimized for your requirements";
  if (els.recMetric)
    els.recMetric.innerText =
      (rec.metrics && rec.metrics[0]) || "Increased engagement";
  if (els.recPricing)
    els.recPricing.innerText = `${i18n.t("results.ctaPricing")} ${
      data.pricingTier
    }`;

  // Creative brief
  if (data.creativeBrief && els.briefContent) {
    els.briefContent.innerHTML = `
      <div class="grid grid-cols-[100px_1fr] gap-4 border-b border-white/5 pb-3">
        <span class="text-slate-500 font-medium">${i18n.t(
          "results.briefAudience"
        )}</span>
        <span class="text-slate-300">${data.creativeBrief.targetAudience}</span>
      </div>
      <div class="grid grid-cols-[100px_1fr] gap-4 border-b border-white/5 pb-3">
        <span class="text-slate-500 font-medium">${i18n.t(
          "results.briefMessage"
        )}</span>
        <span class="text-slate-300">${data.creativeBrief.coreMessage}</span>
      </div>
      <div class="grid grid-cols-[100px_1fr] gap-4">
        <span class="text-slate-500 font-medium">${i18n.t(
          "results.briefStoryArc"
        )}</span>
        <span class="text-slate-300 leading-relaxed">${
          data.creativeBrief.storyline
        }</span>
      </div>
    `;
  }

  // Portfolio matches
  if (data.portfolioMatches && els.portfolioList) {
    els.portfolioList.innerHTML = "";
    data.portfolioMatches.forEach((item) => {
      const div = document.createElement("a");
      div.href = "https://www.b2w.tv/portfolio";
      div.target = "_blank";
      div.className =
        "flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5 hover:border-b2w-purple/50 hover:bg-slate-800/60 transition-all group";
      div.innerHTML = `
        <div class="w-8 h-8 rounded bg-slate-700/50 flex items-center justify-center text-[8px] font-bold text-slate-400 group-hover:text-white group-hover:bg-b2w-purple transition-colors">B2W</div>
        <div>
          <h4 class="font-bold text-white text-xs group-hover:text-b2w-purple transition-colors">${item.title}</h4>
          <div class="text-[10px] text-slate-400 mt-0.5 flex gap-2">
            <span>${item.industry}</span> • <span>${item.style}</span>
          </div>
          <div class="text-[10px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
            <i data-lucide="check-circle" class="w-3 h-3"></i> ${item.outcome}
          </div>
        </div>
      `;
      els.portfolioList.appendChild(div);
    });
  }

  // Funnel chart
  if (
    state.isFunnel &&
    data.fullFunnel &&
    els.funnelContainer &&
    els.funnelChart
  ) {
    els.funnelContainer.classList.remove("hidden");
    els.funnelChart.innerHTML = "";

    data.fullFunnel.forEach((step, idx) => {
      const widthPercent = 100 - idx * 15;
      const opacity = 1 - idx * 0.15;
      const bar = document.createElement("div");
      bar.className = "relative group";
      bar.innerHTML = `
        <div class="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-1 px-1">
          <span>${step.stage}</span>
          <span>${step.duration}</span>
        </div>
        <div class="h-10 bg-slate-800/50 rounded-r-xl border-l-2 border-b2w-purple relative overflow-hidden flex items-center px-4 transition-all hover:w-full" style="width: ${widthPercent}%">
          <div class="absolute inset-0 bg-gradient-to-r from-b2w-purple/30 to-transparent" style="opacity: ${opacity}"></div>
          <span class="relative z-10 text-xs font-bold text-white">${step.videoType}</span>
        </div>
      `;
      els.funnelChart.appendChild(bar);
    });
  } else if (els.funnelContainer) {
    els.funnelContainer.classList.add("hidden");
  }

  // Render export buttons
  renderExportButtons();

  // Render comparison mode if multiple recommendations
  if (data.recommendations.length > 1 && els.comparisonContainer) {
    const comparisonToggle = document.createElement("button");
    comparisonToggle.className = "btn-secondary mb-4";
    comparisonToggle.innerHTML = `
      <i data-lucide="layout-grid"></i>
      <span>${
        state.showComparison
          ? i18n.t("results.hideComparison")
          : i18n.t("results.showComparison")
      }</span>
    `;
    comparisonToggle.onclick = toggleComparison;

    if (!document.getElementById("comparison-toggle")) {
      comparisonToggle.id = "comparison-toggle";
      els.comparisonContainer.parentElement?.insertBefore(
        comparisonToggle,
        els.comparisonContainer
      );
    }
  }

  // Render budget calculator button
  renderBudgetCalculatorButton();

  // Refresh icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Render export buttons
 */
function renderExportButtons() {
  const container =
    document.querySelector(".export-buttons") || document.createElement("div");
  container.className = "export-buttons";

  container.innerHTML = `
    <button class="export-btn" onclick="window.app.exportPDF()">
      <i data-lucide="file-text"></i>
      <span>${i18n.t("results.exportPDF")}</span>
    </button>
  `;

  // Insert after creative brief if not already present
  const briefContainer = els.briefContent?.parentElement;
  if (briefContainer && !document.querySelector(".export-buttons")) {
    briefContainer.appendChild(container);
  }
}

/**
 * Render budget calculator button
 */
function renderBudgetCalculatorButton() {
  if (!els.budgetContainer) return;

  const btn = document.createElement("button");
  btn.className = "btn-secondary w-full";
  btn.innerHTML = `
    <i data-lucide="calculator"></i>
    <span>${state.showBudgetCalc ? "Hide" : "Show"} Budget Calculator</span>
  `;
  btn.onclick = toggleBudgetCalculator;

  if (!document.getElementById("budget-calc-toggle")) {
    btn.id = "budget-calc-toggle";
    els.budgetContainer.parentElement?.insertBefore(btn, els.budgetContainer);
  }
}

/**
 * Toggle Comparison View
 */
function toggleComparison() {
  state.showComparison = !state.showComparison;

  if (state.showComparison && state.data && els.comparisonContainer) {
    comparisonManager.enableComparison(state.data.recommendations, state.input);
    comparisonManager.renderComparison(els.comparisonContainer, i18n);
    els.comparisonContainer.classList.remove("hidden");
  } else if (els.comparisonContainer) {
    els.comparisonContainer.classList.add("hidden");
  }
}

/**
 * Toggle Budget Calculator
 */
function toggleBudgetCalculator() {
  state.showBudgetCalc = !state.showBudgetCalc;

  if (state.showBudgetCalc && els.budgetContainer) {
    renderBudgetCalculator();
    els.budgetContainer.classList.remove("hidden");
  } else if (els.budgetContainer) {
    els.budgetContainer.classList.add("hidden");
  }
}

/**
 * Render Budget Calculator
 */
function renderBudgetCalculator() {
  if (!els.budgetContainer) return;

  const rec = state.data?.recommendations?.[0];
  const style = rec?.style || "2D Character";

  const config = {
    videoType: "explainerVideos",
    animationStyle: style.replace(/\s+/g, "").replace(/3D/, "3d"),
    duration: state.input.duration,
    quantity: 1,
    expedited: false,
    multilingual: 0,
    socialCuts: false,
  };

  const costData = budgetCalculator.calculateCost(config);
  const roiData = budgetCalculator.calculateROI(config, state.input);

  els.budgetContainer.innerHTML = `
    <div class="calculator-panel">
      <h3 class="text-xl font-bold text-white mb-6">Budget Calculator & ROI Estimator</h3>
      
      <!-- Cost Summary -->
      <div class="calculator-result">
        <div class="text-sm text-purple-200 mb-2">Estimated Cost</div>
        <div class="text-4xl font-bold">$${costData.totalCost.toLocaleString()}</div>
        <div class="text-xs text-purple-200 mt-1">${
          costData.packageRecommendation.name
        }</div>
      </div>

      <!-- ROI Metrics -->
      <div class="mt-6">
        <h4 class="text-sm font-bold text-white mb-3">Projected ROI</h4>
        <div class="space-y-2">
          <div class="roi-metric">
            <span class="roi-metric-label">Conversion Lift</span>
            <span class="roi-metric-value">${
              roiData.metrics.conversionLift
            }</span>
          </div>
          <div class="roi-metric">
            <span class="roi-metric-label">Engagement Increase</span>
            <span class="roi-metric-value">${
              roiData.metrics.engagementIncrease
            }</span>
          </div>
          <div class="roi-metric">
            <span class="roi-metric-label">Monthly Leads</span>
            <span class="roi-metric-value">${
              roiData.metrics.estimatedLeads.monthly
            }</span>
          </div>
          <div class="roi-metric">
            <span class="roi-metric-label">Annual Revenue Impact</span>
            <span class="roi-metric-value">$${roiData.financialImpact.annualValue.toLocaleString()}</span>
          </div>
          <div class="roi-metric">
            <span class="roi-metric-label">ROI</span>
            <span class="roi-metric-value">${roiData.financialImpact.roi}</span>
          </div>
        </div>
      </div>

      <!-- Cost Breakdown -->
      <div class="mt-6">
        <h4 class="text-sm font-bold text-white mb-3">Pricing Breakdown</h4>
        <div class="space-y-1 text-sm">
          ${Object.entries(costData.breakdown)
            .filter(([key]) => key !== "extras")
            .map(
              ([key, value]) => `
            <div class="flex justify-between text-slate-300">
              <span>${key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span>$${value}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

/**
 * Export to PDF
 */
async function exportPDF() {
  try {
    const filename = await pdfExporter.exportBrief(
      state.data,
      state.input,
      i18n
    );
    showToast(`${i18n.t("export.exportSuccess")} ${filename}`, "success");
  } catch (error) {
    console.error("PDF export failed:", error);
    showToast(i18n.t("export.exportError"), "error");
  }
}

/**
 * Export to Google Docs
 */
async function exportGoogleDocs() {
  try {
    await googleDocsExporter.exportBrief(state.data, state.input, i18n);
    showToast(i18n.t("export.exportSuccess"), "success");
  } catch (error) {
    console.error("Google Docs export failed:", error);
    showToast(i18n.t("export.exportError"), "error");
  }
}

/**
 * Update View (Form/Loading/Results)
 */
function updateView() {
  // Hide all views first
  if (els.viewForm) els.viewForm.classList.add("hidden");
  if (els.viewEmpty) els.viewEmpty.classList.add("hidden");
  if (els.viewLoading) els.viewLoading.classList.add("hidden");
  if (els.viewResults) els.viewResults.classList.add("hidden");

  if (state.loading) {
    // Show loading state
    if (els.viewLoading) els.viewLoading.classList.remove("hidden");
  } else if (state.data) {
    // Show results
    if (els.viewResults) {
      els.viewResults.classList.remove("hidden");
      // Scroll to top of results
      setTimeout(() => {
        if (els.viewResults) {
          els.viewResults.scrollTop = 0;
        }
      }, 0);
    }
  } else {
    // Show form initially
    if (els.viewForm) els.viewForm.classList.remove("hidden");
  }
}

/**
 * Show Toast Notification
 */
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const iconMap = {
    success: "check-circle",
    error: "alert-circle",
    info: "info",
  };
  toast.innerHTML = `
    <i data-lucide="${iconMap[type]}" style="width: 1.25rem; height: 1.25rem;"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s ease reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Copy Brief to Clipboard
 */
function copyBrief() {
  if (!state.data || !state.data.creativeBrief) return;

  const t = state.data.creativeBrief;
  const text = `TARGET: ${t.targetAudience}\nMESSAGE: ${t.coreMessage}\nSTORY: ${t.storyline}`;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast(i18n.t("notifications.briefCopied"), "success");
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

// Global API for HTML onclick handlers
window.app = {
  exportPDF,
  exportGoogleDocs,
  copyBrief,
  toggleComparison,
  toggleBudgetCalculator,
};

window.copyBrief = copyBrief;

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export default {
  init,
  generateStrategy,
  exportPDF,
  exportGoogleDocs,
  state,
};
