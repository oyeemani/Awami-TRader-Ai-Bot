
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, TECHNICAL_SPECS, PRODUCT_PRICES } from "../data/knowledgeBase";
import { Message, CampaignSource } from "../types";

export const sendMessageToGemini = async (
  messages: Message[], 
  campaign: CampaignSource
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const model = 'gemini-3-pro-preview';
  
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const lastMessage = messages[messages.length - 1];

  // Consolidate the source of truth into the system instruction for the AI
  const fullSystemInstruction = `
${SYSTEM_INSTRUCTION}

PRICE_LIST (PRIORITY 1):
${PRODUCT_PRICES}

TECHNICAL_SPECS_REFERENCE:
${TECHNICAL_SPECS}
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: lastMessage.content }] }
      ],
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0, // Force strict adherence to provided data
        topP: 0.1,
        tools: [{ googleSearch: {} }]
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Assalam-o-Alaikum! Technical error aa raha hai. Please call karein: +92 333 5597117.";
  }
};
