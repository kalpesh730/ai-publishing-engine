const { GoogleGenAI } = require("@google/genai");

// Teri AQ. wali secure key aur naya SDK yahan properly bind honge
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateOmnichannelContent(topic) {
  console.log(`[AI Service] Generating content for: "${topic}"...`);

  const systemInstruction = `
    You are an expert B2B SaaS and Wealth Tech editor. 
    Your job is to generate a highly engaging, SEO-optimized blog post and a matching Twitter thread.
    
    You MUST return ONLY a raw JSON object. Do not wrap it in markdown code blocks (\`\`\`json).
    The JSON must exactly match this structure:
    {
      "blog": {
        "title": "Catchy SEO Title",
        "slug": "catchy-seo-title",
        "htmlContent": "<h2>Introduction</h2><p>Article body here...</p>",
        "seoDescription": "A 150-character meta description."
      },
      "twitter": {
        "thread": [
          "Tweet 1/5: Hook...",
          "Tweet 2/5: Value...",
          "Tweet 5/5: Conclusion..."
        ],
        "hashtags": ["#AI", "#SaaS", "#FinTech"]
      }
    }
  `;

  try {
    // Wapas tere original aur sahi model par aa gaye hain
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Topic to cover today: ${topic}`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    // Parse the API's text response
    const generatedData = JSON.parse(response.text);
    console.log(`[AI Service] ✅ Successfully generated and parsed content!`);

    return generatedData;
  } catch (error) {
    console.error("[AI Service] ❌ Error generating content:", error);
    throw error;
  }
}

module.exports = { generateOmnichannelContent };
