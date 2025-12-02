import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_INFLUENCERS } from '../constants';

// Declare process for TS (runtime handled by Vite define or window polyfill)
declare const process: { env: { API_KEY: string } };

// Lazy initialization of the AI client
const getAiClient = () => {
  // Use process.env.API_KEY directly as per guidelines
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key is missing. AI features will use fallback mock data.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// 1. Generate Bio
export const generateBio = async (role: string, keywords: string, tone: string = "professional"): Promise<string> => {
  try {
    const ai = getAiClient();
    if (!ai) return "Passionate content creator ready to collaborate. (AI Key Missing)";

    const prompt = `Write a short, engaging ${tone} bio (max 280 chars) for a ${role} profile on a marketplace. 
    Keywords/Niches: ${keywords}. 
    Focus on value proposition and personality. No hashtags.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const text = response.text;
    return text ? text.trim() : "Passionate content creator ready to collaborate.";
  } catch (error) {
    console.error("Gemini Bio Generation Error:", error);
    return "Passionate content creator ready to collaborate with like-minded brands.";
  }
};

// 2. Smart Match (Semantic Search)
export const smartMatchInfluencers = async (query: string): Promise<string[]> => {
  try {
    const ai = getAiClient();
    if (!ai) return [];

    const influencersLite = MOCK_INFLUENCERS.map(inf => ({
      id: inf.id,
      name: inf.name,
      bio: inf.bio,
      niches: inf.niches,
      location: inf.location,
      price: inf.priceRange
    }));

    const prompt = `
    You are a matching engine for an influencer marketplace.
    Query: "${query}"
    
    Available Influencers:
    ${JSON.stringify(influencersLite)}
    
    Return a JSON object with a list of IDs of influencers that best match the query.
    Format: { "matchIds": ["id1", "id2"] }
    Strictly JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          propertyOrdering: ["matchIds"]
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const result = JSON.parse(text);
    return result.matchIds || [];
  } catch (error) {
    console.error("Gemini Match Error:", error);
    return [];
  }
};

// 3. Chat Suggestion
export const getChatReplySuggestion = async (lastMessage: string, myRole: string): Promise<string> => {
    try {
        const ai = getAiClient();
        if (!ai) return "";

        const prompt = `
        You are assisting a ${myRole} in a professional chat.
        The last message received was: "${lastMessage}".
        Suggest a concise, professional, and friendly reply (max 1 sentence).
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const text = response.text;
        return text ? text.trim() : "";
    } catch (e) {
        return "";
    }
}