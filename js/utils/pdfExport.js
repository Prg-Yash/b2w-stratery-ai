/**
 * PDF Export Utility
 * Exports creative briefs and recommendations to PDF
 * Uses jsPDF library (loaded via CDN)
 */

export class PDFExporter {
  constructor() {
    this.loadJsPDF();
  }

  loadJsPDF() {
    // Check if jsPDF is already loaded
    if (window.jspdf) {
      this.jsPDF = window.jspdf.jsPDF;
      return;
    }

    // Dynamically load jsPDF from CDN
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => {
      this.jsPDF = window.jspdf.jsPDF;
    };
    document.head.appendChild(script);
  }

  async exportBrief(data, input, i18n) {
    if (!this.jsPDF) {
      alert("PDF library is still loading. Please try again in a moment.");
      return;
    }

    const doc = new this.jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;

    // Helper function to add text with word wrap
    const addText = (
      text,
      fontSize = 12,
      isBold = false,
      color = [0, 0, 0]
    ) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      doc.setFont(undefined, isBold ? "bold" : "normal");

      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      lines.forEach((line) => {
        if (yPos > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(line, margin, yPos);
        yPos += fontSize * 0.5;
      });
      yPos += 5;
    };

    // Header with branding
    doc.setFillColor(107, 70, 193); // B2W Purple
    doc.rect(0, 0, pageWidth, 30, "F");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.text("B2W Video Strategy", margin, 20);

    yPos = 35;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
    yPos += 15;

    // Project Overview
    addText("PROJECT OVERVIEW", 16, true, [107, 70, 193]);
    addText(`Industry: ${input.industry}`, 11);
    addText(`Stage: ${input.stage}`, 11);
    addText(`Funnel Stage: ${input.funnel}`, 11);
    addText(`Primary Goal: ${input.goal}`, 11);
    addText(`Target Duration: ${input.duration}s`, 11);
    yPos += 10;

    if (input.description) {
      addText(`${i18n.t("form.projectBrief")}:`, 12, true);
      addText(input.description, 10);
      yPos += 10;
    }

    // Main Recommendation
    if (data.recommendations && data.recommendations.length > 0) {
      const rec = data.recommendations[0];

      addText("RECOMMENDATION", 16, true, [107, 70, 193]);
      addText(rec.title || "Video Recommendation", 14, true);
      addText(
        `${i18n.t("results.matchLabel").replace("%", "")}: ${rec.score}%`,
        11,
        false,
        [246, 173, 85]
      );
      addText(`${i18n.t("comparison.style")}: ${rec.style}`, 11);
      addText(rec.description, 10);
      yPos += 5;

      if (rec.whyPerfect) {
        addText(`${i18n.t("results.whyWorks")}:`, 11, true);
        addText(rec.whyPerfect, 10);
      }

      if (rec.metrics && rec.metrics.length > 0) {
        addText(
          `${i18n.t("results.projectedOutcome")}: ${rec.metrics[0]}`,
          11,
          false,
          [16, 185, 129]
        );
      }
      yPos += 10;
    }

    // Creative Brief
    if (data.creativeBrief) {
      addText(
        i18n.t("results.creativeBrief").toUpperCase(),
        16,
        true,
        [107, 70, 193]
      );

      addText(`${i18n.t("results.briefAudience")}:`, 11, true);
      addText(data.creativeBrief.targetAudience, 10);

      addText(`${i18n.t("results.briefMessage")}:`, 11, true);
      addText(data.creativeBrief.coreMessage, 10);

      addText(`${i18n.t("results.briefStoryArc")}:`, 11, true);
      addText(data.creativeBrief.storyline, 10);

      if (data.creativeBrief.ctas) {
        addText("Call to Action:", 11, true);
        addText(
          Array.isArray(data.creativeBrief.ctas)
            ? data.creativeBrief.ctas.join(", ")
            : data.creativeBrief.ctas,
          10
        );
      }
      yPos += 10;
    }

    // Portfolio Matches
    if (data.portfolioMatches && data.portfolioMatches.length > 0) {
      addText(
        i18n.t("export.portfolioMatches").toUpperCase(),
        16,
        true,
        [107, 70, 193]
      );

      data.portfolioMatches.forEach((match, idx) => {
        addText(`${idx + 1}. ${match.title}`, 11, true);
        addText(`   Industry: ${match.industry} | Style: ${match.style}`, 10);
        if (match.outcome) {
          addText(`   Outcome: ${match.outcome}`, 10);
        }
        yPos += 3;
      });
      yPos += 10;
    }

    // Pricing
    if (data.pricingTier) {
      addText("Investment:", 12, true);
      addText(`${i18n.t("results.ctaPricing")} ${data.pricingTier}`, 11);
      yPos += 10;
    }

    // Next Steps
    addText(i18n.t("export.nextSteps").toUpperCase(), 14, true, [107, 70, 193]);
    addText("1. Review this strategy with your team", 10);
    addText("2. Schedule a discovery call with Broadcast2World", 10);
    addText("3. Refine the creative brief during consultation", 10);
    addText("4. Approve timeline and kickoff production", 10);
    yPos += 10;

    // Contact Information
    addText(
      i18n.t("export.contactInfo").toUpperCase(),
      14,
      true,
      [107, 70, 193]
    );
    addText("Broadcast2World Inc.", 11, true);
    addText("US Office: 371 Hoes Lane, Suite 200, Piscataway, NJ 08854", 10);
    addText("Phone: (732) 387-3864", 10);
    addText("Email: marketing@b2w.tv", 10);
    addText("Website: https://www.b2w.tv", 10);

    // Footer
    const footerY = pageHeight - 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "© 2025 Broadcast2World, Inc. | Powered by AI Strategy Copilot",
      pageWidth / 2,
      footerY,
      { align: "center" }
    );

    // Save the PDF
    const filename = `B2W_Video_Strategy_${new Date().getTime()}.pdf`;
    doc.save(filename);

    return filename;
  }

  async exportComparison(recommendations, input, i18n) {
    if (!this.jsPDF) {
      alert("PDF library is still loading. Please try again in a moment.");
      return;
    }

    const doc = new this.jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFillColor(107, 70, 193);
    doc.rect(0, 0, pageWidth, 25, "F");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(i18n.t("comparison.title"), pageWidth / 2, 15, {
      align: "center",
    });
    yPos = 35;

    // Table setup
    const columns = [
      "Option",
      "Match",
      "Style",
      "Duration",
      "Best For",
      "Investment",
    ];
    const columnWidth = (pageWidth - 40) / columns.length;

    // Header row
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, pageWidth - 40, 10, "F");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "bold");

    columns.forEach((col, idx) => {
      doc.text(col, 20 + idx * columnWidth + 5, yPos + 7);
    });
    yPos += 10;

    // Data rows
    doc.setFont(undefined, "normal");
    recommendations.slice(0, 3).forEach((rec, idx) => {
      const rowData = [
        `Option ${idx + 1}`,
        `${rec.score}%`,
        rec.style,
        `${input.duration}s`,
        rec.funnelFit || "All stages",
        this.estimateCost(rec.style),
      ];

      doc.setFillColor(
        idx % 2 === 0 ? 255 : 250,
        idx % 2 === 0 ? 255 : 250,
        idx % 2 === 0 ? 255 : 250
      );
      doc.rect(20, yPos, pageWidth - 40, 15, "F");
      doc.setFontSize(9);

      rowData.forEach((data, colIdx) => {
        const text = doc.splitTextToSize(data, columnWidth - 10);
        doc.text(text, 20 + colIdx * columnWidth + 5, yPos + 10);
      });

      yPos += 15;
    });

    const filename = `B2W_Comparison_${new Date().getTime()}.pdf`;
    doc.save(filename);
    return filename;
  }

  estimateCost(style) {
    const pricing = {
      "2D Character": "$2,400 - $3,500",
      "Motion Graphics": "$2,000 - $3,000",
      "3D Product": "$4,000 - $8,000",
      "Mixed Media": "$4,000 - $7,000",
      Whiteboard: "$1,800 - $2,500",
      Isometric: "$3,000 - $4,500",
    };
    return pricing[style] || "$2,000 - $5,000";
  }
}

export default new PDFExporter();
