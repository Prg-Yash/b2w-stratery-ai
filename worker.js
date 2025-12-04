/**
 * Cloudflare Worker - Gemini API Proxy
 * This worker acts as a secure proxy between your frontend and the Gemini API
 * The API key is stored as a secret in Cloudflare Workers environment
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return handleCORS();
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders(),
      });
    }

    try {
      // Parse the incoming request
      const body = await request.json();
      const { contents, systemInstruction } = body;

      if (!contents) {
        return new Response(
          JSON.stringify({ error: "Missing contents in request" }),
          {
            status: 400,
            headers: { ...corsHeaders(), "Content-Type": "application/json" },
          }
        );
      }

      // Get API key from environment variable (secret)
      const GEMINI_API_KEY = env.GEMINI_API_KEY;

      if (!GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({ error: "API key not configured" }),
          {
            status: 500,
            headers: { ...corsHeaders(), "Content-Type": "application/json" },
          }
        );
      }

      // Prepare the request to Gemini API
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      const geminiPayload = {
        contents: contents,
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      };

      // Add system instruction if provided
      if (systemInstruction) {
        geminiPayload.systemInstruction = {
          parts: [{ text: systemInstruction }],
        };
      }

      // Make request to Gemini API
      const geminiResponse = await fetch(geminiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiPayload),
      });

      // Get the response
      const geminiData = await geminiResponse.json();

      // Return the response with CORS headers
      return new Response(JSON.stringify(geminiData), {
        status: geminiResponse.status,
        headers: {
          ...corsHeaders(),
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: error.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders(), "Content-Type": "application/json" },
        }
      );
    }
  },
};

// CORS headers helper
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // In production, replace with your GitHub Pages URL
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// Handle CORS preflight
function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
