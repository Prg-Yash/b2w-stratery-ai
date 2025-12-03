/**
 * Comparison Utility
 * Handles side-by-side comparison of multiple video recommendations
 */

export class ComparisonManager {
  constructor() {
    this.comparisonData = [];
    this.maxComparisons = 3;
  }

  /**
   * Enable comparison mode with multiple recommendations
   */
  enableComparison(recommendations, input) {
    this.comparisonData = recommendations
      .slice(0, this.maxComparisons)
      .map((rec, idx) => ({
        id: idx + 1,
        ...rec,
        duration: input.duration,
        estimatedCost: this.estimateCost(rec.style),
        timeline: this.estimateTimeline(rec.style),
        bestFor: this.determineBestUseCase(rec, input),
      }));

    return this.comparisonData;
  }

  /**
   * Render comparison view
   */
  renderComparison(containerEl, i18n) {
    if (!containerEl) return;

    const html = `
      <div class="comparison-header" style="margin-bottom: 2rem;">
        <h3 class="text-2xl font-bold text-white mb-2">
          ${i18n.t("comparison.title")}
        </h3>
        <p class="text-slate-400 text-sm">
          Compare top recommendations side-by-side to make the best choice for your project
        </p>
      </div>

      <div class="comparison-container">
        ${this.comparisonData
          .map((option, idx) => this.renderComparisonCard(option, idx, i18n))
          .join("")}
      </div>

      <div class="comparison-table" style="margin-top: 2rem; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; background: rgba(30, 41, 59, 0.4); border-radius: 1rem; overflow: hidden;">
          <thead>
            <tr style="background: rgba(107, 70, 193, 0.2);">
              <th style="padding: 1rem; text-align: left; color: #cbd5e1; font-size: 0.875rem; font-weight: 600;">${i18n.t(
                "comparison.option"
              )}</th>
              <th style="padding: 1rem; text-align: center; color: #cbd5e1; font-size: 0.875rem; font-weight: 600;">${i18n.t(
                "comparison.score"
              )}</th>
              <th style="padding: 1rem; text-align: left; color: #cbd5e1; font-size: 0.875rem; font-weight: 600;">${i18n.t(
                "comparison.style"
              )}</th>
              <th style="padding: 1rem; text-align: center; color: #cbd5e1; font-size: 0.875rem; font-weight: 600;">${i18n.t(
                "comparison.duration"
              )}</th>
              <th style="padding: 1rem; text-align: left; color: #cbd5e1; font-size: 0.875rem; font-weight: 600;">${i18n.t(
                "comparison.bestFor"
              )}</th>
              <th style="padding: 1rem; text-align: right; color: #cbd5e1; font-size: 0.875rem; font-weight: 600;">${i18n.t(
                "comparison.investment"
              )}</th>
              <th style="padding: 1rem; text-align: center; color: #cbd5e1; font-size: 0.875rem; font-weight: 600;">${i18n.t(
                "comparison.timeToMarket"
              )}</th>
            </tr>
          </thead>
          <tbody>
            ${this.comparisonData
              .map(
                (option, idx) => `
              <tr style="border-top: 1px solid rgba(255, 255, 255, 0.05);">
                <td style="padding: 1rem; color: #f8fafc; font-weight: 600;">${option.title}</td>
                <td style="padding: 1rem; text-align: center;">
                  <span class="badge badge-gold">${option.score}%</span>
                </td>
                <td style="padding: 1rem; color: #e2e8f0; font-size: 0.875rem;">${option.style}</td>
                <td style="padding: 1rem; text-align: center; color: #a78bfa;">${option.duration}s</td>
                <td style="padding: 1rem; color: #cbd5e1; font-size: 0.875rem;">${option.bestFor}</td>
                <td style="padding: 1rem; text-align: right; color: #10b981; font-weight: 600;">${option.estimatedCost}</td>
                <td style="padding: 1rem; text-align: center; color: #94a3b8; font-size: 0.875rem;">${option.timeline}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    containerEl.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Render individual comparison card
   */
  renderComparisonCard(option, index, i18n) {
    const isWinner = index === 0; // First option is the top recommendation

    return `
      <div class="comparison-card ${
        isWinner ? "winner" : ""
      }" data-option-id="${option.id}">
        ${isWinner ? '<div class="comparison-badge">🏆 Top Choice</div>' : ""}
        
        <div style="margin-bottom: 1rem;">
          <h4 class="text-lg font-bold text-white mb-2">${option.title}</h4>
          <div class="flex items-center gap-2 mb-3">
            <span class="badge badge-gold">${option.score}% Match</span>
            <span class="badge badge-purple">${option.style}</span>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed">${
            option.description
          }</p>
        </div>

        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 1rem; margin-top: 1rem;">
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-400">Duration:</span>
              <span class="text-white font-semibold">${option.duration}s</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Investment:</span>
              <span class="text-green-400 font-semibold">${
                option.estimatedCost
              }</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Timeline:</span>
              <span class="text-purple-400 font-semibold">${
                option.timeline
              }</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Best For:</span>
              <span class="text-slate-200 text-xs">${option.bestFor}</span>
            </div>
          </div>
        </div>

        ${
          option.whyPerfect
            ? `
          <div style="background: rgba(107, 70, 193, 0.1); border-left: 3px solid #6b46c1; padding: 0.75rem; border-radius: 0.5rem; margin-top: 1rem;">
            <p class="text-xs text-slate-300"><strong>Why this works:</strong> ${option.whyPerfect}</p>
          </div>
        `
            : ""
        }

        <button class="btn-primary" style="width: 100%; margin-top: 1.5rem; padding: 0.75rem; font-size: 0.875rem;" onclick="window.selectComparison(${
          option.id
        })">
          Select This Option
        </button>
      </div>
    `;
  }

  /**
   * Estimate cost based on style
   */
  estimateCost(style) {
    const pricing = {
      "2D Character": "$2,400 - $3,500",
      "Motion Graphics": "$2,000 - $3,000",
      "3D Product": "$4,000 - $8,000",
      "3D Animation": "$4,000 - $8,000",
      "Mixed Media": "$4,000 - $7,000",
      Whiteboard: "$1,800 - $2,500",
      Isometric: "$3,000 - $4,500",
    };

    return pricing[style] || "$2,000 - $5,000";
  }

  /**
   * Estimate timeline based on style
   */
  estimateTimeline(style) {
    const timelines = {
      "2D Character": "4-6 weeks",
      "Motion Graphics": "4-6 weeks",
      "3D Product": "8-10 weeks",
      "3D Animation": "8-10 weeks",
      "Mixed Media": "8-10 weeks",
      Whiteboard: "3-4 weeks",
      Isometric: "6-8 weeks",
    };

    return timelines[style] || "4-6 weeks";
  }

  /**
   * Determine best use case for recommendation
   */
  determineBestUseCase(rec, input) {
    if (rec.style.includes("2D")) {
      return "Awareness campaigns, social media, homepage";
    } else if (rec.style.includes("Motion")) {
      return "Technical audiences, data visualization";
    } else if (rec.style.includes("3D")) {
      return "Product showcases, premium positioning";
    } else if (rec.style.includes("Mixed")) {
      return "Brand building, high-trust content";
    } else if (rec.style.includes("Whiteboard")) {
      return "Training, education, process explanation";
    }

    return "Multiple use cases across funnel";
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Global function for option selection
    window.selectComparison = (optionId) => {
      const selectedOption = this.comparisonData.find(
        (opt) => opt.id === optionId
      );
      if (selectedOption) {
        // Dispatch custom event
        window.dispatchEvent(
          new CustomEvent("comparisonSelected", {
            detail: { option: selectedOption },
          })
        );

        // Show confirmation
        this.showToast(`Selected: ${selectedOption.title}`, "success");
      }
    };
  }

  /**
   * Show toast notification
   */
  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i data-lucide="${
        type === "success" ? "check-circle" : "info"
      }" style="width: 1.25rem; height: 1.25rem;"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    if (window.lucide) {
      window.lucide.createIcons();
    }

    setTimeout(() => {
      toast.style.animation = "slideInRight 0.3s ease reverse";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Export comparison data
   */
  exportComparison() {
    return {
      compared: this.comparisonData.length,
      options: this.comparisonData,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Clear comparison data
   */
  clear() {
    this.comparisonData = [];
  }
}

export default new ComparisonManager();
