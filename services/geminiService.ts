import { GoogleGenAI } from "@google/genai";
import { AIResponse, SearchSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGeminiLocalGuide = async (query: string): Promise<AIResponse> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Eres un asistente útil para un directorio comercial local. 
      Ayuda al usuario a encontrar información relevante sobre negocios, tendencias de mercado o información general 
      relacionada con estas categorías: Alimentos, Artesanías, Automotriz, Belleza, Eventos, Hogar, Mantenimiento, Mascotas, Ropa, Salud, Tecnología.
      
      Si el usuario pregunta por algo específico que requiere datos actuales, usa Google Search.
      Responde en español de manera concisa y amigable.
      
      Pregunta del usuario: ${query}`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Lo siento, no pude encontrar información al respecto.";
    
    // Extract sources if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: SearchSource[] = [];

    groundingChunks.forEach((chunk: any) => {
      if (chunk.web) {
        sources.push({
          title: chunk.web.title,
          uri: chunk.web.uri,
        });
      }
    });

    return { text, sources };

  } catch (error) {
    console.error("Error calling Gemini:", error);
    return { 
      text: "Hubo un error al conectar con el asistente inteligente. Por favor intenta más tarde.", 
      sources: [] 
    };
  }
};