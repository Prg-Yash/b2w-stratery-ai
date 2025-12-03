/**
 * Gemini AI Service
 * Handles all interactions with Google's Gemini API
 * Enhanced with comprehensive B2W knowledge base
 */

import B2W_KNOWLEDGE_BASE from "../config/b2wKnowledgeBase.js";

export class GeminiService {
  constructor() {
    this.API_KEY = null;
    this.model = null;
    this.initialized = false;
  }

  /**
   * Initialize Gemini AI with API key
   */
  async init(apiKey) {
    try {
      if (!apiKey || apiKey === "YOUR_API_KEY") {
        console.warn("⚠️ No valid API key provided. Running in demo mode.");
        this.initialized = false;
        return false;
      }

      this.API_KEY = apiKey;

      // Dynamically import Gemini SDK
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(this.API_KEY);

      // Use gemini-2.5-flash model
      this.model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: this.getSystemInstruction(),
      });

      // Set initialized to true - will test on first actual use
      this.initialized = true;
      console.log(
        "✅ Gemini AI initialized successfully with model: gemini-2.5-flash"
      );
      console.log("✅ Model ready for strategy generation");
      return true;
    } catch (error) {
      console.error("❌ Failed to initialize Gemini:", error);
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
      this.initialized = false;
      return false;
    }
  }

  /**
   * Generate comprehensive B2W system instruction with full knowledge base
   */
  getSystemInstruction() {
    const kb = B2W_KNOWLEDGE_BASE;

    return `
ROLE: You are the Senior Video Strategist for Broadcast2World (b2w.tv), one of the world's leading animated explainer video companies.

COMPANY OVERVIEW:
- ${kb.company.tagline}
- Founded: ${kb.company.founded} | Experience: ${kb.company.experience}
- ${kb.company.stats.videosProduced} videos produced | ${
      kb.company.stats.happyClients
    } happy clients
- Serving ${kb.company.stats.countriesServed} countries with a ${
      kb.company.stats.teamSize
    } team
- Mission: "${kb.company.mission}"

CORE PHILOSOPHY:
${Object.entries(kb.philosophy)
  .map(([key, value]) => `- ${value}`)
  .join("\n")}

PRICING STRUCTURE (3 TIERS):
Average Cost: ${kb.pricing.basePricing.averageCost} per 60-second video

B2W offers exactly 3 packages:
1. GROWTH (Budget-Friendly): ${kb.pricing.packages.growth.description}
   - Art Styles: ${kb.pricing.packages.growth.artStyles.join(", ")}
   - Best for: ${kb.pricing.packages.growth.useCases.slice(0, 4).join(", ")}

2. PREMIUM (Cost-Savvy) ⭐ MOST POPULAR: ${
      kb.pricing.packages.premium.description
    }
   - Art Styles: ${kb.pricing.packages.premium.artStyles.join(", ")}
   - Best for: ${kb.pricing.packages.premium.useCases.slice(0, 6).join(", ")}

3. FLICK (Best-In-Class): ${kb.pricing.packages.flick.description}
   - Art Styles: ${kb.pricing.packages.flick.artStyles.join(", ")}
   - Best for: ${kb.pricing.packages.flick.useCases.slice(0, 6).join(", ")}

IMPORTANT: Only recommend "Growth", "Premium", or "Flick" packages - these are the ONLY 3 packages B2W offers!

ANIMATION STYLES EXPERTISE:
${Object.entries(kb.animationStyles)
  .map(
    ([key, style]) =>
      `- ${style.name}: ${style.description} | Best for: ${style.bestFor} | Price: ${style.priceRange}`
  )
  .join("\n")}

VIDEO SERVICES:
${Object.entries(kb.services)
  .map(
    ([key, service]) =>
      `- ${service.name} (${service.duration}): ${service.description} | Funnel: ${service.funnelStage}`
  )
  .join("\n")}

INDUSTRY EXPERTISE:
${Object.entries(kb.industries)
  .map(
    ([key, industry]) =>
      `- ${industry.name}: ${
        industry.experience
      } | Clients: ${industry.notableClients.slice(0, 3).join(", ")}`
  )
  .join("\n")}

TOP CLIENT PORTFOLIO (for recommendation matching - choose clients with similar products/services to what user describes):
${kb.portfolio.topClients
  .slice(0, 25)
  .map((c) => `- ${c.name} (${c.industry}): ${c.videoType} → ${c.outcome}`)
  .join("\n")}

PROVEN METRICS:
- Average Engagement Increase: ${kb.metrics.averageResults.engagementIncrease}
- Average Conversion Lift: ${kb.metrics.averageResults.conversionLift}
- Demo Booking Increase: ${kb.metrics.averageResults.demoBookings}
- Sales Cycle Reduction: ${kb.metrics.averageResults.salesCycleReduction}

RECOMMENDATION GUIDANCE:
When to recommend 2D Character Animation: ${kb.recommendationGuidance.whenToRecommendCharacterAnimation.join(
      ", "
    )}
When to recommend Motion Graphics: ${kb.recommendationGuidance.whenToRecommendMotionGraphics.join(
      ", "
    )}
When to recommend 3D Animation: ${kb.recommendationGuidance.whenToRecommend3D.join(
      ", "
    )}
When to recommend Mixed Media: ${kb.recommendationGuidance.whenToRecommendMixedMedia.join(
      ", "
    )}

STRATEGIC FRAMEWORKS:
Storytelling Structure: ${kb.frameworks.storytellingStructure.problem} → ${
      kb.frameworks.storytellingStructure.solution
    } → ${kb.frameworks.storytellingStructure.socialProof} → ${
      kb.frameworks.storytellingStructure.cta
    }

INSTRUCTIONS:
1. Analyze the user's input deeply considering their industry, stage, funnel position, and goals
2. Match their needs against B2W's 15+ years of proven portfolio data
3. Recommend the MOST APPROPRIATE video strategy from B2W's services
4. Provide portfolio matches from actual B2W clients in similar industries
5. Generate a comprehensive creative brief with target audience, message, and storyline
6. Recommend the appropriate pricing package
7. If Full Funnel mode is requested, provide a complete funnel strategy with video types for each stage
8. Be confident, data-driven, and specific - you have 3,000+ videos of proof
9. Always output valid JSON matching the exact schema requested

TONE: Professional, insightful, confident, results-oriented. Speak as a trusted advisor with deep industry expertise.
    `.trim();
  }

  /**
   * Generate video strategy recommendations
   */
  async generateStrategy(input, isFunnelMode = false) {
    console.log("🎯 generateStrategy called with:", {
      input,
      isFunnelMode,
      initialized: this.initialized,
    });

    if (!this.initialized) {
      console.warn("⚠️ Gemini service not initialized. Using demo mode.");
      return this.getMockData(input, isFunnelMode);
    }

    const prompt = this.buildPrompt(input, isFunnelMode);

    try {
      console.log("🤖 Sending request to Gemini AI...");
      console.log("📤 Prompt length:", prompt.length, "characters");

      const result = await this.model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      });

      const response = result.response;
      const text = response.text();

      console.log("📥 Received response from Gemini");
      console.log("✅ Response length:", text.length, "characters");
      console.log("Response preview:", text.substring(0, 300));

      if (text) {
        // Clean up JSON response
        let jsonStr = text
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "")
          .trim();

        // Try to find JSON in response if wrapped
        const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonStr = jsonMatch[0];
        }

        const data = JSON.parse(jsonStr);
        console.log("✅ Gemini response parsed successfully");
        return this.validateAndEnhanceResponse(data, input);
      }

      throw new Error("No response text from Gemini");
    } catch (error) {
      // Force console output with alert as backup
      const errorMsg = `API Error: ${error?.message || "Unknown error"}`;
      console.log("❌ ===== GEMINI API ERROR =====");
      console.log("Error occurred:", errorMsg);
      console.log("Error object:", error);
      console.log("Error string:", String(error));
      console.log(
        "Error JSON:",
        JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
      );

      // Try to get more details
      try {
        console.log("Error keys:", Object.keys(error));
        console.log("Error constructor:", error?.constructor?.name);
        console.log("Error message:", error?.message);
        console.log("Error stack:", error?.stack);
      } catch (e) {
        console.log("Could not log error details");
      }

      console.log("❌ ===== END ERROR =====");
      console.log("📋 Falling back to demo mode with intelligent mock data...");

      // Fallback to enhanced mock data
      return this.getMockData(input, isFunnelMode);
    }
  }

  /**
   * Build detailed prompt for Gemini
   */
  buildPrompt(input, isFunnelMode) {
    return `
ANALYZE THIS VIDEO PROJECT REQUEST:

Project Description: "${input.description}"

Context Parameters:
- Industry: ${input.industry}
- Company Stage: ${input.stage}
- Funnel Stage: ${input.funnel}
- Primary Goal: ${input.goal}
- Target Duration: ${input.duration} seconds
- Preferred Styles: ${input.styles.join(", ")}
- Mode: ${isFunnelMode ? "FULL FUNNEL STRATEGY" : "SINGLE VIDEO RECOMMENDATION"}

REQUIRED JSON OUTPUT SCHEMA:
{
  "recommendations": [
    {
      "title": "string (compelling video name)",
      "score": number (70-98 realistic match confidence based on how well requirements align with B2W capabilities. 98=perfect match, 85-90=good match, 70-80=acceptable match),
      "funnelFit": "string (which funnel stage)",
      "description": "string (2-3 sentences explaining the recommendation)",
      "style": "string (exact animation style from B2W's offerings)",
      "whyPerfect": "string (data-driven reasoning based on B2W's portfolio)",
      "metrics": ["string (specific projected outcomes)"],
      "channels": ["string (recommended distribution channels)"],
      "estimatedCost": "string (pricing range from B2W packages)"
    }
  ],
  "portfolioMatches": [
    {
      "title": "string (actual B2W client name from knowledge base that matches user's industry or has similar business model)",
      "industry": "string (MUST be same or closely related to user's selected industry)",
      "outcome": "string (proven result)",
      "style": "string (animation style used)"
    }
  ],
  "creativeBrief": {
    "targetAudience": "string (specific persona description)",
    "coreMessage": "string (one sentence value proposition)",
    "storyline": "string (narrative arc: problem → solution → proof → CTA)",
    "ctas": ["string (recommended calls to action)"]
  },
  "pricingTier": "string (MUST BE EXACTLY: 'Growth Package' OR 'Premium Package' OR 'Flick Package')",
  ${
    isFunnelMode
      ? `"fullFunnel": [
    {
      "stage": "string (funnel stage name)",
      "videoType": "string (recommended video type)",
      "duration": "string (recommended length)",
      "metric": "string (KPI to track)"
    }
  ],`
      : ""
  }
  "reasoning": "string (internal explanation of recommendation logic)"
}

CRITICAL REQUIREMENTS:
1. ONLY recommend animation styles from the user's Preferred Styles list: ${
      input.styles.join(", ") || "any B2W style"
    }
2. Match score MUST be realistic (70-98%): Base it on how well user requirements align with B2W capabilities
3. ONLY recommend "Growth Package" (Budget-Friendly $2,000-$2,400/60s), "Premium Package" (Cost-Savvy $2,800-$3,500/60s), or "Flick Package" (Best-In-Class $4,000-$8,000+/60s)
4. PORTFOLIO MATCHING - CRITICAL: Read the project description carefully. Match portfolio clients based on:
   - The ACTUAL product/service type described (not just the selected industry dropdown)
   - If description says "pen" or "physical product" → show Consumer Products/Manufacturing clients
   - If description says "software" or "app" or "platform" → show SaaS/Tech clients
   - Always prefer clients with similar business models to what's described
5. Use REAL metrics from B2W's proven track record from the knowledge base
6. Be specific and actionable - this will go directly to a real client
7. BUDGET CALCULATION BASIS: For each video, multiply duration (in 60s units) by package price range. Growth: $2,000-$2,400, Premium: $2,800-$3,500, Flick: $4,000-$8,000+
8. MATCH PERCENTAGE BASIS: Score 70-98% based on alignment between (a) user's actual product/service type from description, (b) B2W's proven results with similar products, (c) requested styles available in package, (d) budget fit

Generate the most accurate, data-driven recommendation possible based on B2W's 15 years of proven results.
    `.trim();
  }

  /**
   * Validate and enhance AI response
   */
  validateAndEnhanceResponse(data, input) {
    // Ensure all required fields exist
    if (!data.recommendations || !Array.isArray(data.recommendations)) {
      data.recommendations = [];
    }

    // Add duration from input to recommendations
    data.recommendations.forEach((rec) => {
      if (!rec.duration) {
        rec.duration = `${input.duration}s`;
      }

      // Ensure score is within range
      if (rec.score && (rec.score < 0 || rec.score > 100)) {
        rec.score = Math.min(100, Math.max(0, rec.score));
      }
    });

    // Validate portfolio matches against actual B2W clients
    if (data.portfolioMatches) {
      data.portfolioMatches = data.portfolioMatches.map((match) => {
        // Try to find real client data
        const realClient = B2W_KNOWLEDGE_BASE.portfolio.topClients.find((c) =>
          c.name.toLowerCase().includes(match.title.toLowerCase())
        );

        if (realClient) {
          return {
            ...match,
            title: realClient.name,
            industry: realClient.industry,
            outcome: realClient.outcome,
          };
        }

        return match;
      });
    }

    return data;
  }

  /**
   * Enhanced mock data generator (fallback)
   */
  getMockData(input, isFunnelMode) {
    const styleMatch = this.getStyleRecommendation(input);
    const industryData =
      B2W_KNOWLEDGE_BASE.industries[input.industry.toLowerCase()] ||
      B2W_KNOWLEDGE_BASE.industries.saas;

    const response = {
      recommendations: [
        {
          title: `${styleMatch.name} ${input.goal}`,
          score: 92,
          funnelFit: input.funnel,
          description: `A ${
            input.duration
          }-second ${styleMatch.name.toLowerCase()} designed specifically for ${
            input.industry
          } companies at ${input.stage} stage. ${styleMatch.description}`,
          style: styleMatch.name,
          whyPerfect: `Based on ${
            industryData.experience
          } with clients like ${industryData.notableClients
            .slice(0, 2)
            .join(
              " and "
            )}, this style consistently delivers high engagement for ${input.goal.toLowerCase()}.`,
          metrics: [
            `${B2W_KNOWLEDGE_BASE.metrics.averageResults.conversionLift} conversion increase`,
          ],
          channels: ["Website Homepage", "LinkedIn", "Sales Presentations"],
          estimatedCost: styleMatch.priceRange,
        },
      ],
      portfolioMatches: industryData.notableClients
        .slice(0, 3)
        .map((clientName) => {
          const client = B2W_KNOWLEDGE_BASE.portfolio.topClients.find(
            (c) => c.name === clientName
          );
          return client
            ? {
                title: client.name,
                industry: client.industry,
                outcome: client.outcome,
                style: client.videoType,
              }
            : {
                title: clientName,
                industry: industryData.name,
                outcome: "Increased engagement",
                style: styleMatch.name,
              };
        }),
      creativeBrief: {
        targetAudience: this.generateAudience(input),
        coreMessage: this.generateMessage(input),
        storyline:
          "Problem → Your Solution → How It Works → Proof → Strong CTA",
        ctas: [input.goal],
      },
      pricingTier: this.recommendPackage(input, styleMatch),
    };

    if (isFunnelMode) {
      response.fullFunnel = [
        {
          stage: "Awareness",
          videoType: "Brand Anthem / Explainer",
          duration: "60s",
          metric: "Video completion rate & brand recall",
        },
        {
          stage: "Consideration",
          videoType: "Product Demo",
          duration: "90s",
          metric: "Demo requests & trial signups",
        },
        {
          stage: "Decision",
          videoType: "Customer Testimonial",
          duration: "120s",
          metric: "Conversion rate & deal velocity",
        },
      ];
    }

    return response;
  }

  /**
   * Helper: Get style recommendation
   */
  getStyleRecommendation(input) {
    const styles = B2W_KNOWLEDGE_BASE.animationStyles;

    // Match based on input preferences
    if (input.styles.includes("2D Character")) return styles["2dCharacter"];
    if (input.styles.includes("Motion Graphics")) return styles.motionGraphics;
    if (input.styles.includes("3D Product")) return styles["3dAnimation"];
    if (input.styles.includes("Mixed Media")) return styles.mixedMedia;

    // Default to 2D Character (most popular)
    return styles["2dCharacter"];
  }

  /**
   * Helper: Generate target audience
   */
  generateAudience(input) {
    const audienceMap = {
      SaaS: "Decision-makers, CTOs, and product managers in mid-market B2B companies",
      Fintech:
        "Financial professionals and tech-savvy consumers seeking secure solutions",
      Healthcare:
        "Healthcare administrators, clinicians, and patients seeking better outcomes",
      Cybersecurity:
        "CISOs, IT directors, and security-conscious enterprise buyers",
      Education:
        "Educators, administrators, and students looking for innovative learning tools",
    };

    return (
      audienceMap[input.industry] ||
      "Decision-makers and influencers in your target market"
    );
  }

  /**
   * Helper: Generate core message
   */
  generateMessage(input) {
    return `Transform your ${input.industry.toLowerCase()} operations with a solution that delivers measurable results faster than alternatives.`;
  }

  /**
   * Helper: Recommend pricing package
   */
  recommendPackage(input, style) {
    const cost = parseInt(style.priceRange.match(/\d+/)[0]);

    if (cost < 2500) return "Startup Package";
    if (cost < 4000) return "Growth Package";
    return "Enterprise Package";
  }
}

export default new GeminiService();
