import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { OKUKernel } from "../types";

// NOTE: In a real production app, ensure API keys are handled via secure backend proxies.
// For this frontend-only prototype, we use the env variable directly as instructed.
const API_KEY = process.env.API_KEY || '';

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;
let currentModel: string = 'gemini-2.5-flash';

// Initialize the client
const getClient = (): GoogleGenAI => {
  if (!client) {
    if (!API_KEY) {
      console.error("API_KEY is missing");
    }
    client = new GoogleGenAI({ apiKey: API_KEY });
  }
  return client;
};

// Start a new chat session based on the selected Kernel
export const startChatSession = async (kernel: OKUKernel): Promise<Chat> => {
  const ai = getClient();
  
  // Create the chat with the specific system instruction from the Kernel
  // This is where the personality is injected.
  chatSession = ai.chats.create({
    model: currentModel,
    config: {
      systemInstruction: kernel.systemInstruction,
      temperature: 0.7, // Slightly creative but stable
      topK: 40,
    },
  });

  return chatSession;
};

// Send a message and get response
export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized");
  }

  try {
    const result = await chatSession.sendMessage({
      message: message
    });
    
    return result.text || "Désolé, je n'ai pas pu traiter cette réponse.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};
