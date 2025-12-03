/**
 * Broadcast2World (B2W) Comprehensive Knowledge Base
 * Contains detailed company information, services, portfolio, pricing, and expertise
 * Source: https://www.b2w.tv
 * Last Updated: December 2025
 */

export const B2W_KNOWLEDGE_BASE = {
  // ============================================
  // COMPANY INFORMATION
  // ============================================
  company: {
    name: "Broadcast2World",
    shortName: "B2W",
    tagline:
      "Human-Powered Animated Explainer Video Company That Wins You More Customers",
    mission: "We don't just move pixels, we move people.",
    founded: "November 2009",
    experience: "15+ years",
    headquarters: {
      us: {
        address: "371 Hoes Lane, Suite 200, Piscataway, New Jersey - 08854",
        phone: "(732) 387-3864",
        email: "marketing@b2w.tv",
      },
      india: {
        address: "WeWork, 246, Udyog Vihar, Gurugram, Haryana - 122016",
        phone: "(+91) 98713 30069",
        description: "Production Hub (Render 5 Technologies Pvt. Ltd.)",
      },
    },
    stats: {
      videosProduced: "50+",
      secondsOfStorytelling: "300,000+",
      happyClients: "2000+",
      countriesServed: "20+",
      teamSize: "100+",
      yearlyRevenue: "100% YoY growth (bootstrapped)",
    },
    positioning:
      "Strategic partner for B2B, SaaS, Fintech, Cybersecurity, Healthcare, and Enterprise brands",
    expertise:
      "Technical storytelling for complex B2B products - we understand APIs, cloud workflows, DevOps, cybersecurity, SaaS architectures",
  },

  // ============================================
  // CORE PHILOSOPHY & VALUE PROPOSITIONS
  // ============================================
  philosophy: {
    humanPowered:
      "100% human creativity - no AI-generated content. Real artists who understand emotion, nuance, and impact.",
    customOnly:
      "Every video is 100% custom - built from scratch. No templates. No shortcuts.",
    technicalStorytelling:
      "We get the story AND the tech - rare combination in creative industry.",
    fullFunnelApproach:
      "Support entire customer lifecycle - awareness to retention, investor pitches to employee training.",
    affordableExcellence:
      "Enterprise-grade quality without enterprise price tag. India-based production model.",
  },

  // ============================================
  // PRICING STRUCTURE
  // ============================================
  pricing: {
    model: "Per-minute pricing with structured packages",
    basePricing: {
      averageCost: "$2,800 USD per 60 seconds",
      startingPrice: "$2,400 USD per 60 seconds (Growth Package)",
      additionalTime: "30-second increments priced proportionally",
      averageProductionCost: "$20 USD per production hour",
    },
    packages: {
      growth: {
        name: "Growth",
        price: "Budget-Friendly",
        description:
          "Simple and effective budget-friendly animation with clean visuals and streamlined animation styles",
        artStyles: ["Whiteboard", "Flat Infographics", "Mixed-Media"],
        useCases: [
          "Social Media",
          "Explainer",
          "Training",
          "Internal Communication",
        ],
        targetAudience: "Startups, small businesses, budget-conscious teams",
        features: [
          "Basic animation styles",
          "Clean visuals",
          "Professional voiceover included",
          "Custom scriptwriting",
          "Fast turnaround (4-6 weeks)",
        ],
      },
      premium: {
        name: "Premium",
        price: "Cost-Savvy",
        description:
          "Balance of quality and affordability with intricate designs and animations",
        artStyles: [
          "Whiteboard",
          "Character",
          "Infographics",
          "2D Mixed-Media Videos",
        ],
        useCases: [
          "Social Media",
          "Explainer",
          "Training",
          "Internal Communication",
          "Landing Page",
          "Brand Video",
          "Commercial Video",
          "Demo Video",
          "Event Video",
          "Marketing",
          "Testimonial Video",
        ],
        targetAudience: "Growing companies, Series A-B, mid-market brands",
        features: [
          "Custom character animation",
          "Advanced motion graphics",
          "Professional voiceover & sound design",
          "Creative direction",
          "2 rounds of revisions per stage",
          "Source files included",
        ],
        mostPopular: true,
      },
      flick: {
        name: "Flick",
        price: "Best-In-Class",
        description:
          "Top-notch designs and cutting-edge animation techniques for brands aiming to stand out",
        artStyles: [
          "2.5D Character & 3D Infographics",
          "2.5D Mixed-Media Videos",
        ],
        useCases: [
          "Social Media",
          "Explainer",
          "Training",
          "Internal Communication",
          "Landing Page",
          "Brand Video",
          "Commercial Video",
          "Demo Video",
          "Event Video",
          "Marketing",
          "Testimonial Video",
        ],
        targetAudience:
          "Enterprise, Series C+, public companies, global brands",
        features: [
          "2.5D Character animation",
          "3D Infographics",
          "Cutting-edge animation techniques",
          "Full creative team",
          "Unlimited revisions",
          "Multiple format deliverables",
          "Priority support",
        ],
      },
    },
    additionalServices: {
      expeditedDelivery: {
        description: "Rush delivery in 2 weeks",
        cost: "$500 USD",
        requirement: "Script must be pre-approved",
      },
      translation: {
        description: "Multilingual version with native voiceover",
        cost: "$500 USD per language for 60s",
        includes:
          "Translation, voiceover recording, on-screen text updates, visual adaptations",
        discount: "Volume discounts for multiple languages",
      },
      socialMedia: {
        description: "Repurpose main video for social ads",
        formats: "Horizontal, vertical, square",
        durations: "30s, 15s, 6s cuts",
        cost: "Nominal charges",
        platforms: "Meta, YouTube, LinkedIn, TikTok, X",
      },
      sourceFiles: {
        description: "Full project source files",
        cost: "Included at no extra cost",
        benefit: "Unlimited reuse and repurposing",
      },
    },
  },

  // ============================================
  // VIDEO SERVICES & TYPES
  // ============================================
  services: {
    explainerVideos: {
      name: "Animated Explainer Videos",
      duration: "60-90 seconds",
      description:
        "The flagship service. Break down complex ideas simply and effectively.",
      bestFor: "Homepage, product launches, awareness campaigns",
      funnelStage: "Awareness (Top of Funnel)",
      avgConversion: "30% increase in engagement",
      keyFeature: "Simplifies complexity without losing meaning",
    },
    productDemo: {
      name: "Product Demo Videos",
      duration: "90s - 2 minutes",
      description:
        "Screen-cast + motion graphics wrapper showing 'How it works'",
      bestFor: "Feature showcases, sales enablement, consideration stage",
      funnelStage: "Consideration (Mid Funnel)",
      avgConversion: "35% increase in demo bookings",
      keyFeature: "Shows product UI/UX in action",
    },
    commercialVideos: {
      name: "Commercial Videos",
      duration: "30-60 seconds",
      description: "High-impact promotional videos for broad audience reach",
      bestFor: "Paid ads, social media campaigns, brand awareness",
      funnelStage: "Awareness",
      avgConversion: "40% higher ad engagement vs static",
      keyFeature: "Attention-grabbing for paid media",
    },
    brandAnthems: {
      name: "Brand Anthem / Culture Videos",
      duration: "60-120 seconds",
      description:
        "Mixed media combining live action + animation. High trust factor.",
      bestFor: "Company values, recruitment, investor presentations",
      funnelStage: "Awareness + Retention",
      keyFeature: "Emotional storytelling with real people",
    },
    caseStudyTestimonial: {
      name: "Case Study & Testimonial Videos",
      duration: "90-180 seconds",
      description: "Remote recording or live action customer success stories",
      bestFor: "Social proof, decision stage, sales collateral",
      funnelStage: "Decision (Bottom of Funnel)",
      avgConversion: "50% increase in conversion rates",
      keyFeature: "Real customer validation",
    },
    trainingVideos: {
      name: "Corporate Training & Onboarding",
      duration: "2-5 minutes",
      description: "Employee education, process training, compliance",
      bestFor: "Internal HR, operations, change management",
      funnelStage: "Retention + Onboarding",
      recommendedStyle: "Whiteboard animation (budget-friendly)",
      keyFeature: "Higher retention vs traditional training",
    },
    investorPitch: {
      name: "Investor Pitch Videos",
      duration: "90-120 seconds",
      description:
        "Compelling narrative for fundraising and stakeholder alignment",
      bestFor: "Pitch decks, fundraising campaigns, board presentations",
      funnelStage: "Pre-funnel (Business Development)",
      keyFeature: "Data visualization + emotional storytelling",
    },
  },

  // ============================================
  // ANIMATION STYLES
  // ============================================
  animationStyles: {
    "2dCharacter": {
      name: "2D Character Animation",
      description:
        "Character-driven narratives with custom illustrated characters",
      complexity: "Medium",
      priceRange: "$2,400 - $3,500 per 60s",
      bestFor: "Relatable storytelling, SaaS explainers, product launches",
      emotionalImpact: "High - humanizes brand",
      productionTime: "4-6 weeks",
      examples: ["Zoom", "PandaDoc", "Aiven", "Sponsorium"],
    },
    motionGraphics: {
      name: "Motion Graphics / Infographic Animation",
      description: "Clean, modern animations focusing on data and concepts",
      complexity: "Medium",
      priceRange: "$2,000 - $3,000 per 60s",
      bestFor: "Data-heavy products, technical explanations, B2B SaaS",
      emotionalImpact: "Medium - professional & credible",
      productionTime: "4-6 weeks",
      examples: ["Siemens", "McAfee", "SUSE", "Salem Electric"],
    },
    "3dAnimation": {
      name: "3D Product Animation",
      description:
        "Photorealistic 3D rendering for hardware and medical devices",
      complexity: "High",
      priceRange: "$4,000 - $8,000 per 60s",
      bestFor: "Hardware products, medical devices, manufacturing",
      emotionalImpact: "Very High - premium perception",
      productionTime: "8-10 weeks",
      examples: ["Wingtra", "Edwards Lifesciences", "3Flow"],
    },
    mixedMedia: {
      name: "Mixed Media Animation",
      description:
        "Live action footage + animated overlays - unique hybrid style",
      complexity: "High",
      priceRange: "$4,000 - $7,000 per 60s",
      bestFor: "Brand anthems, testimonials, premium storytelling",
      emotionalImpact: "Very High - trust + creativity",
      productionTime: "8-10 weeks",
      examples: ["Vanderbilt University", "Siemens", "Align", "Wingtra"],
    },
    whiteboard: {
      name: "Whiteboard Animation",
      description: "Hand-drawn style perfect for educational content",
      complexity: "Low-Medium",
      priceRange: "$1,800 - $2,500 per 60s",
      bestFor: "Training videos, educational content, explainers",
      emotionalImpact: "Medium - trusted & clear",
      productionTime: "3-4 weeks",
      examples: ["TCB", "FibroGen", "Internal training videos"],
    },
    isometric: {
      name: "Isometric Illustration",
      description:
        "Technical 3D-style illustrations (2.5D) for architecture/systems",
      complexity: "Medium-High",
      priceRange: "$3,000 - $4,500 per 60s",
      bestFor: "System architecture, network diagrams, infrastructure",
      emotionalImpact: "Medium - technical credibility",
      productionTime: "6-8 weeks",
      examples: ["Cloud platforms", "DevOps tools", "Network security"],
    },
  },

  // ============================================
  // INDUSTRIES SERVED (with expertise)
  // ============================================
  industries: {
    saas: {
      name: "SaaS & Tech",
      experience: "15+ years, 1000+ videos",
      expertise:
        "Cloud platforms, developer tools, productivity software, collaboration tools",
      notableClients: [
        "Zoom",
        "PandaDoc",
        "Aiven",
        "SUSE",
        "Five9",
        "Tradeshift",
      ],
      specialization:
        "Simplifying complex technical features for non-technical buyers",
      typicalVideos: [
        "Product explainers",
        "Feature demos",
        "Onboarding tutorials",
      ],
    },
    cybersecurity: {
      name: "Cybersecurity",
      experience: "10+ years, 200+ videos",
      expertise:
        "Threat detection, endpoint security, network protection, compliance",
      notableClients: ["McAfee", "Forescout", "Asigra"],
      specialization:
        "Making invisible threats tangible and security solutions understandable",
      typicalVideos: [
        "Threat scenario animations",
        "Product explainers",
        "Sales enablement",
      ],
    },
    fintech: {
      name: "Fintech & Blockchain",
      experience: "8+ years, 150+ videos",
      expertise:
        "Payment processing, crypto wallets, banking platforms, financial analytics",
      notableClients: ["Coinsquare", "BitPay", "American Financial Solutions"],
      specialization:
        "Building trust around money and simplifying complex financial concepts",
      typicalVideos: [
        "Platform explainers",
        "Security trust videos",
        "How-to guides",
      ],
    },
    healthcare: {
      name: "Healthcare & MedTech",
      experience: "12+ years, 250+ videos",
      expertise: "Medical devices, telemedicine, healthcare IT, life sciences",
      notableClients: [
        "BD",
        "CooperVision",
        "Edwards Lifesciences",
        "Fujifilm Healthcare",
        "Takara Bio",
        "Vanderbilt Health",
        "Sutter Health",
        "MedWand",
      ],
      specialization:
        "Scientific accuracy + patient-friendly explanations, regulatory compliance",
      typicalVideos: [
        "Device education",
        "Clinical training",
        "Patient communication",
        "Pharma MOA",
      ],
    },
    enterprise: {
      name: "Enterprise & Manufacturing",
      experience: "15+ years, 400+ videos",
      expertise:
        "ERP systems, supply chain, manufacturing, industrial automation",
      notableClients: [
        "Siemens",
        "Lenovo",
        "Fujitsu",
        "Ericsson",
        "Epicor",
        "Lowe's",
      ],
      specialization:
        "Large-scale internal communications, complex system integrations",
      typicalVideos: [
        "System explainers",
        "Training videos",
        "Sales enablement",
      ],
    },
    education: {
      name: "EdTech & Education",
      experience: "10+ years, 180+ videos",
      expertise:
        "Learning management systems, e-learning platforms, university programs",
      notableClients: [
        "Vanderbilt University",
        "UC Irvine",
        "Bowling Green State University",
      ],
      specialization: "Making learning engaging and accessible",
      typicalVideos: [
        "Course promotions",
        "Platform tutorials",
        "Student onboarding",
      ],
    },
    utilities: {
      name: "Utilities & Energy",
      experience: "8+ years, 100+ videos",
      expertise: "Energy management, grid systems, sustainability initiatives",
      notableClients: [
        "Evergy Fleet Electrification",
        "Oncor",
        "Salem Electric",
      ],
      specialization: "Public-facing education on complex infrastructure",
      typicalVideos: [
        "Public awareness",
        "Customer education",
        "Safety training",
      ],
    },
    nonprofit: {
      name: "Non-Profit & Social Impact",
      experience: "10+ years, 120+ videos",
      expertise: "Social causes, fundraising, awareness campaigns",
      notableClients: ["UN Women", "BlueGreen Water Technologies"],
      specialization: "Emotional storytelling for social good",
      typicalVideos: [
        "Awareness campaigns",
        "Fundraising videos",
        "Impact stories",
      ],
    },
  },

  // ============================================
  // PROVEN CLIENT PORTFOLIO
  // ============================================
  portfolio: {
    topClients: [
      {
        name: "Fujitsu",
        industry: "Enterprise Tech",
        videoType: "Product Explainer",
        outcome: "Simplified complex cloud infrastructure",
      },
      {
        name: "Siemens",
        industry: "Manufacturing",
        videoType: "Mixed Media",
        outcome: "Global team alignment on new platform",
      },
      {
        name: "Lenovo",
        industry: "Technology",
        videoType: "Commercial",
        outcome: "Product launch campaign success",
      },
      {
        name: "Amazon AWS",
        industry: "Cloud/SaaS",
        videoType: "Technical Explainer",
        outcome: "Developer onboarding acceleration",
      },
      {
        name: "Zoom",
        industry: "SaaS",
        videoType: "Feature Explainer",
        outcome: "Early growth partner during scaling",
      },
      {
        name: "McAfee MVISION",
        industry: "Cybersecurity",
        videoType: "Product Demo",
        outcome: "35% increase in trial signups",
      },
      {
        name: "PandaDoc",
        industry: "SaaS",
        videoType: "Mixed Media",
        outcome: "Elevated brand perception",
      },
      {
        name: "Aiven",
        industry: "Cloud Data",
        videoType: "2D Character",
        outcome: "Simplified database-as-service concept",
      },
      {
        name: "SUSE",
        industry: "Open Source",
        videoType: "Motion Graphics",
        outcome: "Enterprise Linux adoption",
      },
      {
        name: "Five9",
        industry: "Contact Center",
        videoType: "Explainer",
        outcome: "Reduced sales cycle time",
      },
      {
        name: "Tradeshift",
        industry: "Supply Chain",
        videoType: "2D Character",
        outcome: "Network effect visualization",
      },
      {
        name: "Forescout",
        industry: "Cybersecurity",
        videoType: "Technical",
        outcome: "Positioned as thought leader",
      },
      {
        name: "Vanderbilt University",
        industry: "Education",
        videoType: "Mixed Media",
        outcome: "Record giving day donations",
      },
      {
        name: "UC Irvine",
        industry: "Education",
        videoType: "Brand Anthem",
        outcome: "Student enrollment increase",
      },
      {
        name: "Edwards Lifesciences",
        industry: "MedTech",
        videoType: "3D Product",
        outcome: "Clinical training efficiency",
      },
      {
        name: "Takara Bio",
        industry: "Life Sciences",
        videoType: "Scientific",
        outcome: "Researcher product adoption",
      },
      {
        name: "Ericsson",
        industry: "Telecom",
        videoType: "Training",
        outcome: "Global workforce upskilling",
      },
      {
        name: "Epicor",
        industry: "ERP",
        videoType: "Product Demo",
        outcome: "Feature adoption across customers",
      },
      {
        name: "Coinsquare",
        industry: "Fintech",
        videoType: "Trust Explainer",
        outcome: "User confidence in crypto platform",
      },
      {
        name: "UN Women",
        industry: "Non-Profit",
        videoType: "Awareness",
        outcome: "Global campaign reach",
      },
      {
        name: "Coca-Cola",
        industry: "CPG",
        videoType: "Internal Comms",
        outcome: "Employee engagement",
      },
      {
        name: "Lowe's",
        industry: "Retail",
        videoType: "Training",
        outcome: "Store operations consistency",
      },
      {
        name: "Bowling Green State University",
        industry: "Education",
        videoType: "Recruitment",
        outcome: "Prospective student engagement",
      },
      {
        name: "Sponsorium",
        industry: "SaaS",
        videoType: "2D Character",
        outcome: "Product-market fit communication",
      },
      {
        name: "Wingtra",
        industry: "Drones/Hardware",
        videoType: "Mixed Media 3D",
        outcome: "Complex technology simplified",
      },
      {
        name: "3Flow",
        industry: "DevOps",
        videoType: "Product Demo",
        outcome: "Developer tool adoption",
      },
      {
        name: "Asigra",
        industry: "Cybersecurity",
        videoType: "Explainer",
        outcome: "Backup solution clarity",
      },
      {
        name: "FibroGen",
        industry: "Pharma",
        videoType: "Whiteboard",
        outcome: "Mechanism of action education",
      },
      {
        name: "BlueGreen Water Technologies",
        industry: "Environmental",
        videoType: "Explainer",
        outcome: "Investor confidence (CEO testimonial)",
      },
      {
        name: "ThermoFisher",
        industry: "Life Sciences",
        videoType: "Product",
        outcome: "Laboratory equipment education",
      },
      {
        name: "Evergy",
        industry: "Utilities",
        videoType: "Explainer",
        outcome: "Fleet electrification public awareness",
      },
      {
        name: "Salem Electric",
        industry: "Utilities",
        videoType: "Infographic",
        outcome: "Customer education on grid systems",
      },
      {
        name: "Oncor",
        industry: "Utilities",
        videoType: "Corporate",
        outcome: "Stakeholder communications",
      },
      {
        name: "American Financial Solutions",
        industry: "Finance",
        videoType: "Explainer",
        outcome: "Debt relief trust building",
      },
      {
        name: "The Law Offices of Adam Roa",
        industry: "Legal Services",
        videoType: "Commercial",
        outcome: "Client acquisition",
      },
      {
        name: "Clif Bar",
        industry: "CPG",
        videoType: "Internal",
        outcome: "Sustainability initiative communication",
      },
      {
        name: "Kyriba",
        industry: "Fintech",
        videoType: "Platform Demo",
        outcome: "Treasury management adoption",
      },
      {
        name: "MITRE",
        industry: "Government/Defense",
        videoType: "Explainer",
        outcome: "Complex systems communication",
      },
    ],

    caseStudyHighlights: [
      {
        client: "BlueGreen Water Technologies",
        testimonial:
          "Excellent and professional work delivered on time. The team was very proactive, diving into our technology, understanding our market and the messages that needed polishing through the movie. Very much recommended!",
        person: "Eyal Harel, CEO & Founder",
        outcome: "Technology adoption in new markets",
      },
      {
        client: "Epicor",
        testimonial:
          "It's great working with you guys. Your videos are one of my favorite projects at Epicor. It is always a blast working on them.",
        person: "Jessica Hodell, Senior Marketing Specialist",
        outcome: "Long-term partnership for multiple product videos",
      },
    ],

    industryBreakdown: {
      "SaaS & Tech": "40%",
      "Healthcare & Life Sciences": "20%",
      "Enterprise & Manufacturing": "15%",
      Cybersecurity: "10%",
      "Fintech & Blockchain": "8%",
      Education: "5%",
      Other: "2%",
    },
  },

  // ============================================
  // PRODUCTION PROCESS & CAPABILITIES
  // ============================================
  production: {
    model: "Vertically integrated in-house studio",
    location: "India-based production (cost advantage)",
    team: {
      scriptwriters: "B2B storytelling specialists with technical backgrounds",
      designers: "Custom illustrators (no templates)",
      animators: "100+ years combined team experience",
      voiceArtists: "Global network, 15+ years of partnerships",
      soundDesigners: "Professional audio engineering",
    },

    workflow: {
      discovery: {
        stage: 1,
        duration: "1-3 days",
        deliverable: "Creative brief & style selection",
        revisions: "Unlimited consultation",
      },
      scriptwriting: {
        stage: 2,
        duration: "3-5 days",
        deliverable: "Custom script with storytelling framework",
        revisions: "2 rounds included",
      },
      storyboarding: {
        stage: 3,
        duration: "5-7 days",
        deliverable: "Visual scene-by-scene breakdown",
        revisions: "2 rounds included",
      },
      illustration: {
        stage: 4,
        duration: "7-10 days",
        deliverable: "Custom artwork & character design",
        revisions: "2 rounds included",
      },
      voiceover: {
        stage: 5,
        duration: "2-3 days",
        deliverable: "Professional voice recording",
        revisions: "1-2 takes included",
      },
      animation: {
        stage: 6,
        duration: "10-15 days",
        deliverable: "Fully animated video with sync",
        revisions: "2 rounds included",
      },
      soundDesign: {
        stage: 7,
        duration: "2-3 days",
        deliverable: "Music, SFX, final mastering",
        revisions: "1 round included",
      },
    },

    timelines: {
      standard: {
        lowerComplexity: "4-6 weeks",
        higherComplexity: "8-10 weeks",
      },
      expedited: {
        duration: "2 weeks",
        requirement: "Pre-approved script",
        additionalCost: "$500",
      },
      fastestEver: "2 weeks (with rush fee)",
    },

    deliverables: {
      formats: ["MP4 (1080p)", "MOV", "Custom resolutions"],
      aspectRatios: ["16:9 (Horizontal)", "9:16 (Vertical)", "1:1 (Square)"],
      lengths: ["Full video", "30s cut", "15s cut", "6s cut (social)"],
      extras: ["Source files (no extra cost)", "Thumbnail images", "GIF loops"],
      multilingual: "Translation + voiceover available",
    },

    qualityAssurance: {
      customCreation: "100% custom - zero templates",
      humanCrafted: "No AI generation - all human artists",
      revisions: "2 rounds per stage minimum",
      clientVisibility: "Modern collaboration tools for feedback",
      satisfaction: "Partnership approach - clients stay for years",
    },
  },

  // ============================================
  // COMPETITIVE ADVANTAGES
  // ============================================
  advantages: {
    technical: [
      "Team understands B2B tech deeply - APIs, DevOps, cloud, security",
      "Technology geeks + visual storytellers hybrid talent",
      "Specialized teams for SaaS, healthcare, fintech, cybersecurity",
      "15+ years focused exclusively on B2B/Enterprise",
    ],

    creative: [
      "100% custom illustration and animation",
      "Human-powered creativity (no AI shortcuts)",
      "Storytelling frameworks proven across 50+ videos",
      "Emotional + logical narrative balance",
    ],

    operational: [
      "Vertically integrated - all stages in-house",
      "India production advantage = 50-70% cost savings vs Western studios",
      "Fast turnaround (can deliver in 2 weeks)",
      "Scalable team (100+ people)",
      "Transparent pricing with no surprise costs",
    ],

    relationship: [
      "Clients stay for years (not one-off projects)",
      "Grew with brands like Zoom from startup to IPO",
      "Collaborative partnership approach",
      "Full transparency at every production stage",
      "Dedicated account management",
    ],

    flexibility: [
      "Startup-friendly pricing starting at $2,000",
      "Enterprise scalability up to $8,000+",
      "Multiple animation styles in-house",
      "Full-funnel video strategy support",
      "Source files included for repurposing",
    ],
  },

  // ============================================
  // STRATEGIC FRAMEWORKS
  // ============================================
  frameworks: {
    storytellingStructure: {
      problem: "Establish the pain point your audience faces",
      agitate: "Make the problem feel urgent and costly",
      solution: "Introduce your product as the hero",
      howItWorks: "Simple 3-step process explanation",
      socialProof: "Credibility through customers/metrics",
      cta: "Clear next action (demo, trial, contact)",
    },

    funnelMapping: {
      awareness: {
        videoTypes: ["Brand Anthem", "Explainer", "Commercial"],
        goal: "Introduce brand, establish credibility",
        metrics: ["Reach", "Awareness lift", "Video completion rate"],
      },
      consideration: {
        videoTypes: ["Product Demo", "Feature Explainer", "Case Study"],
        goal: "Show how product works, differentiation",
        metrics: ["Engagement time", "Demo requests", "Trial signups"],
      },
      decision: {
        videoTypes: ["Customer Testimonial", "Detailed Demo", "ROI Calculator"],
        goal: "Provide social proof, reduce risk",
        metrics: ["Conversion rate", "Sales qualified leads", "Deal velocity"],
      },
      onboarding: {
        videoTypes: [
          "Tutorial Series",
          "Quick Start Guide",
          "Feature Walkthroughs",
        ],
        goal: "Reduce time-to-value, prevent churn",
        metrics: ["Activation rate", "Feature adoption", "Support tickets"],
      },
      retention: {
        videoTypes: [
          "Tips & Tricks",
          "New Feature Announcements",
          "Success Stories",
        ],
        goal: "Drive engagement, upsell, prevent churn",
        metrics: ["NPS", "Renewal rate", "Expansion revenue"],
      },
    },

    industrySpecificApproach: {
      saas: {
        challenge: "Explaining intangible software value",
        solution: "Before/after scenarios with relatable characters",
        focus: "Time savings, efficiency gains, ease of use",
      },
      cybersecurity: {
        challenge: "Making invisible threats tangible",
        solution: "Visual metaphors for attacks and protection",
        focus: "Risk reduction, compliance, peace of mind",
      },
      healthcare: {
        challenge: "Scientific accuracy + patient friendliness",
        solution: "Medical-grade precision with empathetic storytelling",
        focus: "Safety, efficacy, improved outcomes",
      },
      fintech: {
        challenge: "Building trust around money",
        solution: "Security visualization + regulatory emphasis",
        focus: "Trust, transparency, financial gain",
      },
    },
  },

  // ============================================
  // AWARDS & RECOGNITION
  // ============================================
  awards: {
    businessCompetitions: [
      "Lufthansa 'Pioneering Spirit' Winner (ET NOW, 2011)",
    ],
    mediaRecognition: ["ET NOW Business Startup Show (2011)"],
    industryAwards:
      "Multiple animation and storytelling awards (displayed on website)",
  },

  // ============================================
  // KEY MESSAGING FOR AI RECOMMENDATIONS
  // ============================================
  recommendationGuidance: {
    whenToRecommendCharacterAnimation: [
      "Need to humanize technical product",
      "Target audience is non-technical buyers",
      "Storytelling with relatable scenarios",
      "SaaS products with workflow improvements",
      "Budget: $2,400 - $3,500 range",
    ],

    whenToRecommendMotionGraphics: [
      "Data-heavy products",
      "Technical audience (developers, IT)",
      "Need credibility over emotion",
      "Clean, modern brand aesthetic",
      "Budget: $2,000 - $3,000 range",
    ],

    whenToRecommend3D: [
      "Physical hardware products",
      "Medical devices needing precision",
      "Premium brand positioning",
      "Complex mechanical explanations",
      "Budget: $4,000 - $8,000 range",
    ],

    whenToRecommendMixedMedia: [
      "Brand anthem / company values",
      "High trust requirements",
      "Premium storytelling",
      "Emotional connection critical",
      "Budget: $4,000 - $7,000 range",
    ],

    whenToRecommendWhiteboard: [
      "Internal training / education",
      "Budget constraints ($1,800 - $2,500)",
      "Process explanations",
      "Trusted, educational tone",
    ],
  },

  // ============================================
  // PROVEN METRICS & OUTCOMES
  // ============================================
  metrics: {
    averageResults: {
      engagementIncrease: "30-40% vs text/static",
      conversionLift: "25-35% across funnel",
      demoBookings: "35% increase for product demos",
      adPerformance: "40% higher engagement for video ads",
      trainingRetention: "60% higher vs traditional methods",
      salesCycleReduction: "20-30% with video in sales process",
    },

    industryBenchmarks: {
      saas: {
        avgConversion: "30% lift in trial signups",
        avgEngagement: "85% video completion rate",
        bestPerformer: "Product explainers at top of funnel",
      },
      cybersecurity: {
        avgConversion: "35% increase in qualified leads",
        avgEngagement: "78% completion (technical depth)",
        bestPerformer: "Threat scenario animations",
      },
      healthcare: {
        avgConversion: "40% better patient comprehension",
        avgEngagement: "90% completion (trusted source)",
        bestPerformer: "Device education videos",
      },
    },
  },
};

// Export for use in AI prompting
export default B2W_KNOWLEDGE_BASE;
