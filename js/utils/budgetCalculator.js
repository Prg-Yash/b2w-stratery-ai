/**
 * Budget Calculator & ROI Estimator
 * Calculates video production costs and projected ROI based on B2W pricing
 */

import B2W_KNOWLEDGE_BASE from "../config/b2wKnowledgeBase.js";

export class BudgetCalculator {
  constructor() {
    this.pricing = B2W_KNOWLEDGE_BASE.pricing;
    this.metrics = B2W_KNOWLEDGE_BASE.metrics;
  }

  /**
   * Calculate estimated cost for video project
   */
  calculateCost(config) {
    const {
      videoType = "explainerVideos",
      animationStyle = "2dCharacter",
      duration = 60,
      quantity = 1,
      expedited = false,
      multilingual = 0,
      socialCuts = false,
    } = config;

    let baseCost = this.getBaseCost(animationStyle, duration);
    let totalCost = baseCost * quantity;

    // Additional services
    const extras = [];

    if (expedited) {
      const expeditedCost = 500;
      totalCost += expeditedCost;
      extras.push({ name: "Expedited Delivery", cost: expeditedCost });
    }

    if (multilingual > 0) {
      const multilingualCost = this.calculateMultilingualCost(
        duration,
        multilingual
      );
      totalCost += multilingualCost;
      extras.push({
        name: `${multilingual} Additional Languages`,
        cost: multilingualCost,
      });
    }

    if (socialCuts) {
      const socialCutsCost = Math.round(baseCost * 0.15); // 15% of base
      totalCost += socialCutsCost;
      extras.push({
        name: "Social Media Cuts (30s, 15s, 6s)",
        cost: socialCutsCost,
      });
    }

    return {
      baseCost,
      totalCost,
      extras,
      perVideo: totalCost / quantity,
      breakdown: this.getBreakdown(animationStyle, duration, extras),
      packageRecommendation: this.recommendPackage(totalCost),
    };
  }

  /**
   * Get base cost for animation style and duration
   */
  getBaseCost(style, duration) {
    const pricing = {
      "2dCharacter": { min: 2400, max: 3500 },
      motionGraphics: { min: 2000, max: 3000 },
      "3dAnimation": { min: 4000, max: 8000 },
      mixedMedia: { min: 4000, max: 7000 },
      whiteboard: { min: 1800, max: 2500 },
      isometric: { min: 3000, max: 4500 },
    };

    const range = pricing[style] || pricing["2dCharacter"];
    const avgPer60s = (range.min + range.max) / 2;

    // Calculate for actual duration (pro-rated from 60s base)
    const cost = Math.round((avgPer60s / 60) * duration);

    return cost;
  }

  /**
   * Calculate multilingual cost
   */
  calculateMultilingualCost(duration, languageCount) {
    const costPer60s = 500;
    const costPerLanguage = Math.round((costPer60s / 60) * duration);
    return costPerLanguage * languageCount;
  }

  /**
   * Get detailed cost breakdown
   */
  getBreakdown(style, duration, extras) {
    return {
      scriptwriting: Math.round(this.getBaseCost(style, duration) * 0.1),
      storyboard: Math.round(this.getBaseCost(style, duration) * 0.12),
      illustration: Math.round(this.getBaseCost(style, duration) * 0.25),
      animation: Math.round(this.getBaseCost(style, duration) * 0.35),
      voiceover: Math.round(this.getBaseCost(style, duration) * 0.08),
      soundDesign: Math.round(this.getBaseCost(style, duration) * 0.1),
      extras: extras,
    };
  }

  /**
   * Recommend package based on total cost
   * Growth: $2,000-$2,400/60s (Budget-Friendly)
   * Premium: $2,800-$3,500/60s (Cost-Savvy)
   * Flick: $4,000-$8,000+/60s (Best-In-Class)
   */
  recommendPackage(totalCost) {
    if (totalCost < 2500) {
      return this.pricing.packages.growth;
    } else if (totalCost < 4000) {
      return this.pricing.packages.premium;
    } else {
      return this.pricing.packages.flick;
    }
  }

  /**
   * Calculate projected ROI based on video type and industry
   */
  calculateROI(config, input) {
    const {
      videoType = "explainerVideos",
      animationStyle = "2dCharacter",
      duration = 60,
    } = config;

    const cost = this.calculateCost(config).totalCost;

    // Get industry-specific metrics
    const industryMetrics = this.getIndustryMetrics(input.industry, videoType);

    // Calculate ROI projections
    const projections = {
      cost,
      timeline: this.getTimeline(animationStyle),
      metrics: {
        conversionLift: industryMetrics.conversionLift,
        engagementIncrease: industryMetrics.engagement,
        estimatedLeads: this.estimateLeads(input, industryMetrics),
        salesCycleReduction: industryMetrics.salesCycle,
      },
      financialImpact: this.calculateFinancialImpact(
        cost,
        industryMetrics,
        input
      ),
      breakEvenPoint: null,
    };

    // Calculate break-even
    if (projections.financialImpact.annualValue > 0) {
      projections.breakEvenPoint = Math.ceil(
        (cost / projections.financialImpact.annualValue) * 12
      );
    }

    return projections;
  }

  /**
   * Get industry-specific performance metrics
   */
  getIndustryMetrics(industry, videoType) {
    const defaults = {
      conversionLift: "25-35%",
      engagement: "30-40%",
      salesCycle: "20-30%",
    };

    const industryMap = {
      SaaS: { conversionLift: "30%", engagement: "85%", salesCycle: "25%" },
      Fintech: { conversionLift: "28%", engagement: "75%", salesCycle: "22%" },
      Healthcare: {
        conversionLift: "35%",
        engagement: "90%",
        salesCycle: "30%",
      },
      Cybersecurity: {
        conversionLift: "35%",
        engagement: "78%",
        salesCycle: "28%",
      },
      Education: {
        conversionLift: "32%",
        engagement: "88%",
        salesCycle: "20%",
      },
      Manufacturing: {
        conversionLift: "25%",
        engagement: "70%",
        salesCycle: "18%",
      },
    };

    return industryMap[industry] || defaults;
  }

  /**
   * Estimate lead generation potential
   */
  estimateLeads(input, metrics) {
    // Conservative estimation based on typical website traffic
    const baseTraffic = {
      "Seed Stage": 1000,
      "Series A": 5000,
      "Series B+": 15000,
      Enterprise: 50000,
      "Public / IPO": 100000,
    };

    const traffic = baseTraffic[input.stage] || 5000;
    const videoViewRate = 0.15; // 15% of visitors watch video
    const conversionRate = parseFloat(metrics.conversionLift) / 100 || 0.3;

    const estimatedLeads = Math.round(traffic * videoViewRate * conversionRate);

    return {
      monthly: estimatedLeads,
      quarterly: estimatedLeads * 3,
      annual: estimatedLeads * 12,
    };
  }

  /**
   * Calculate financial impact
   */
  calculateFinancialImpact(cost, metrics, input) {
    // Average lead value by industry and stage
    const leadValues = {
      SaaS: {
        "Seed Stage": 500,
        "Series A": 1500,
        "Series B+": 3000,
        Enterprise: 8000,
      },
      Fintech: {
        "Seed Stage": 800,
        "Series A": 2000,
        "Series B+": 4000,
        Enterprise: 10000,
      },
      Healthcare: {
        "Seed Stage": 1000,
        "Series A": 2500,
        "Series B+": 5000,
        Enterprise: 15000,
      },
      Cybersecurity: {
        "Seed Stage": 1200,
        "Series A": 3000,
        "Series B+": 6000,
        Enterprise: 20000,
      },
      default: {
        "Seed Stage": 600,
        "Series A": 1800,
        "Series B+": 3500,
        Enterprise: 9000,
      },
    };

    const industryValues = leadValues[input.industry] || leadValues["default"];
    const leadValue = industryValues[input.stage] || 1500;

    const leads = this.estimateLeads(input, metrics);
    const monthlyValue = leads.monthly * leadValue * 0.2; // 20% close rate
    const annualValue = monthlyValue * 12;
    const roi = (((annualValue - cost) / cost) * 100).toFixed(0);

    return {
      leadValue,
      monthlyValue: Math.round(monthlyValue),
      annualValue: Math.round(annualValue),
      roi: `${roi}%`,
      roiMultiple: (annualValue / cost).toFixed(1),
    };
  }

  /**
   * Get production timeline
   */
  getTimeline(style) {
    const timelines = {
      "2dCharacter": "4-6 weeks",
      motionGraphics: "4-6 weeks",
      "3dAnimation": "8-10 weeks",
      mixedMedia: "8-10 weeks",
      whiteboard: "3-4 weeks",
      isometric: "6-8 weeks",
    };

    return timelines[style] || "4-6 weeks";
  }

  /**
   * Compare multiple options
   */
  compareOptions(options, input) {
    return options
      .map((option) => {
        const cost = this.calculateCost(option);
        const roi = this.calculateROI(option, input);

        return {
          name: option.name || `${option.animationStyle} ${option.videoType}`,
          cost: cost.totalCost,
          roi: roi.financialImpact.roi,
          roiMultiple: roi.financialImpact.roiMultiple,
          timeline: roi.timeline,
          leads: roi.metrics.estimatedLeads.monthly,
          score: this.calculateScore(cost.totalCost, roi.financialImpact.roi),
        };
      })
      .sort((a, b) => b.score - a.score);
  }

  /**
   * Calculate comparison score
   */
  calculateScore(cost, roi) {
    const roiValue = parseFloat(roi) || 0;
    const costScore = 10000 / cost; // Lower cost = higher score
    const roiScore = roiValue / 10; // Higher ROI = higher score

    return (costScore + roiScore) / 2;
  }

  /**
   * Generate budget recommendation
   */
  generateRecommendation(input) {
    const recommendations = [];

    // Starter recommendation (budget-friendly)
    recommendations.push({
      name: "Budget-Friendly Starter",
      animationStyle: "motionGraphics",
      videoType: "explainerVideos",
      duration: 60,
      quantity: 1,
      expedited: false,
      multilingual: 0,
      socialCuts: false,
    });

    // Growth recommendation (most popular)
    recommendations.push({
      name: "Growth Package (Most Popular)",
      animationStyle: "2dCharacter",
      videoType: "explainerVideos",
      duration: 90,
      quantity: 1,
      expedited: false,
      multilingual: 0,
      socialCuts: true,
    });

    // Premium recommendation
    recommendations.push({
      name: "Premium Full Funnel",
      animationStyle: "mixedMedia",
      videoType: "brandAnthems",
      duration: 120,
      quantity: 1,
      expedited: false,
      multilingual: 1,
      socialCuts: true,
    });

    return this.compareOptions(recommendations, input);
  }
}

export default new BudgetCalculator();
