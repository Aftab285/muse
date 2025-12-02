import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_INFLUENCERS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Generate Bio
export const generateBio = async (role: string, keywords: string, tone: string = "professional"): Promise<string> => {
  try {
    const prompt = `Write a short, engaging ${tone} bio (max 280 chars) for a ${role} profile on a marketplace. 
    Keywords/Niches: ${keywords}. 
    Focus on value proposition and personality. No hashtags.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Gemini Bio Generation Error:", error);
    return "Passionate content creator ready to collaborate with like-minded brands.";
  }
};

// 2. Smart Match (Semantic Search)
export const smartMatchInfluencers = async (query: string): Promise<string[]> => {
  try {
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
          }
        }
      }
    });

    const result = JSON.parse(response.text);
    return result.matchIds || [];
  } catch (error) {
    console.error("Gemini Match Error:", error);
    return [];
  }
};

// 3. Chat Suggestion
export const getChatReplySuggestion = async (lastMessage: string, myRole: string): Promise<string> => {
    try {
        const prompt = `
        You are assisting a ${myRole} in a professional chat.
        The last message received was: "${lastMessage}".
        Suggest a concise, professional, and friendly reply (max 1 sentence).
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (e) {
        return "";
    }
}
