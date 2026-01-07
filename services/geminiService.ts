import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

export const getLudoStrategyTip = async (userName: string, context: string): Promise<string> => {
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `
      You are a fun and witty Ludo Game Coach for a Real Money Gaming app called "Ludo Pro".
      The user ${userName} is asking for advice. 
      Context: ${context}.
      Give a short, punchy, and encouraging strategy tip (max 2 sentences). 
      Sometimes include a playful emoji.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Keep rolling! Luck favors the bold! 🎲";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Focus on getting your tokens out of the base first! 🎲";
  }
};
