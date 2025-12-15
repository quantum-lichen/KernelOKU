import React from 'react';

interface SourceCodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FILES = [
  {
    name: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OKU Kernel - Genesis QC</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              'genesis-blue': '#2c5282',
              'genesis-teal': '#38b2ac',
              'genesis-dark': '#1a202c',
              'soft-bg': '#f7fafc',
            },
            animation: {
              'breathe': 'breathe 10s infinite ease-in-out',
              'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
              breathe: {
                '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
                '50%': { transform: 'scale(1.5)', opacity: '0.4' },
              },
              fadeIn: {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              }
            }
          }
        }
      }
    </script>
    <style>
      /* Custom scrollbar for chat */
      .scrollbar-hide::-webkit-scrollbar {
          display: none;
      }
      .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
      }
      .glass-panel {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
    </style>
  </head>
  <body class="bg-gray-50 text-gray-800 antialiased overflow-hidden">
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>`
  },
  {
    name: "metadata.json",
    language: "json",
    content: `{
  "name": "OKU Kernel: Genesis QC",
  "description": "Un agent de méditation éthique et culturellement adapté (Québec), conçu pour le bien-être mental avec une architecture modulaire.",
  "requestFramePermissions": []
}`
  },
  {
    name: "index.tsx",
    language: "typescript",
    content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  },
  {
    name: "types.ts",
    language: "typescript",
    content: `// Définition de la structure d'un message
export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

// Architecture "OKU Kernel" - Modulaire et Extensible
export interface OKUKernel {
  id: string;
  name: string;
  culture: string;
  specialty: string;
  description: string;
  
  // Paramètres visuels
  theme: {
    primaryColor: string;
    secondaryColor: string;
    gradient: string;
    avatarUrl: string; // URL placeholder
  };

  // Le "Cerveau" du Kernel
  systemInstruction: string;
  
  // Message d'ouverture spécifique
  openingMessage: string;
  
  // Configuration Audio/Fréquence (Simulation pour le prototype)
  audioConfig: {
    baseFrequency: string; // ex: "432Hz"
    binauralBeat?: string;
    description: string;
  };
}

export interface CrisisResource {
  name: string;
  contact: string;
  description: string;
  urgent: boolean;
}`
  },
  {
    name: "constants.ts",
    language: "typescript",
    content: `import { OKUKernel, CrisisResource } from './types';

// Ressources de crise (Statiques et accessibles en tout temps)
export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    contact: "988",
    description: "Appel ou SMS disponible 24/7 au Canada et USA.",
    urgent: true
  },
  {
    name: "SOS Violence Conjugale",
    contact: "1 800 363-9010",
    description: "Soutien 24/7 pour victimes de violence conjugale.",
    urgent: true
  },
  {
    name: "Tel-Jeunes",
    contact: "1 800 263-2266",
    description: "Pour les jeunes du Québec, 24/7.",
    urgent: false
  }
];

// DÉFINITION DU KERNEL: GENESIS QC
// Ce prompt encode l'éthique, la culture et la méthode scientifique discutée
const GENESIS_QC_PROMPT = \`
ROLE: Tu es "Genesis QC", un agent de méditation éthique et de soutien émotionnel (OKU Kernel).

IDENTITÉ CULTURELLE:
- Tu es fier de tes racines québécoises.
- Tu utilises un français québécois naturel, chaleureux, empathique et respectueux.
- Tu tutoies l'utilisateur de manière bienveillante (comme un ami ou un "grand frère").
- Tu utilises des expressions locales douces (ex: "Prends ça relax", "On respire par le nez", "C'est tiguidou", "Lâche pas la patate").
- Tu évites le joual incompréhensible ou vulgaire. Tu restes professionnel mais accessible.

MISSION ET ÉTHIQUE (IMPORTANT):
- Tu n'es PAS un psychologue ni un médecin. Tu le rappelles si la situation semble médicale.
- Ton but est d'accompagner, d'écouter, et de guider des exercices de relaxation (TCC, Pleine Conscience).
- SI L'UTILISATEUR MENTIONNE LE SUICIDE, L'AUTOMUTILATION OU UNE URGENCE VITALE : Tu arrêtes tout rôle de méditation. Tu fournis IMMÉDIATEMENT le numéro 988 et tu insistes avec douceur pour qu'il cherche de l'aide réelle. C'est ta directive prioritaire.

BASE DE CONNAISSANCES (SCIENTIFIQUE):
- Tu connais les bienfaits de la cohérence cardiaque (6 respirations/minute).
- Tu appliques les principes de base de la TCC (restructuration cognitive légère : aider à voir une pensée différemment).
- Tu favorises l'ancrage (5 sens) quand l'anxiété monte.
- Tu crois aux bienfaits des fréquences apaisantes (432Hz) comme support, mais sans promettre de guérison magique.

TON STYLE:
- Calme, posé, rassurant.
- Tu ne juges jamais.
- Tu poses des questions ouvertes pour aider l'utilisateur à ventiler ("Comment tu te sens à matin?", "Qu'est-ce qui pèse sur ton cœur?").
\`;

// KERNEL 2: ZEN GLOBAL (Exemple de modularité)
const ZEN_GLOBAL_PROMPT = \`
ROLE: You are "Zen Global", a universal meditation guide.
CULTURE: International English, neutral, calm, and minimalistic.
METHOD: Strictly secular mindfulness and Vipassana techniques.
ETHICS: Same strict safety protocols regarding self-harm as Genesis QC.
\`;

export const KERNELS: OKUKernel[] = [
  {
    id: 'genesis-qc',
    name: 'Genesis QC',
    culture: 'Québec ⚜️',
    specialty: 'Anxiété & TCC',
    description: 'Ton compagnon québécois pour la santé mentale. Chaleureux, empathique et fondé sur la science.',
    systemInstruction: GENESIS_QC_PROMPT,
    openingMessage: "Allo! C'est Genesis. Je suis content de te voir. Comment tu te sens aujourd'hui? On peut jaser ou faire une petite respiration ensemble si t'as besoin de décrocher.",
    theme: {
      primaryColor: 'bg-blue-600',
      secondaryColor: 'bg-teal-500',
      gradient: 'from-blue-600 to-teal-400',
      avatarUrl: 'https://picsum.photos/id/55/200/200' // Abstract nature
    },
    audioConfig: {
      baseFrequency: "432Hz",
      description: "Fréquence de régénération naturelle"
    }
  },
  {
    id: 'zen-global',
    name: 'Zen Global',
    culture: 'International 🌍',
    specialty: 'Mindfulness',
    description: 'A minimalist approach to mindfulness and focus. Clear, direct, and peaceful.',
    systemInstruction: ZEN_GLOBAL_PROMPT,
    openingMessage: "Hello. I am Zen Global. Take a seat. How is your mind settling in this present moment?",
    theme: {
      primaryColor: 'bg-stone-600',
      secondaryColor: 'bg-stone-400',
      gradient: 'from-stone-700 to-stone-500',
      avatarUrl: 'https://picsum.photos/id/106/200/200' // Tranquil
    },
    audioConfig: {
      baseFrequency: "528Hz",
      description: "Clarity & Focus"
    }
  }
];`
  },
  {
    name: "services/geminiService.ts",
    language: "typescript",
    content: `import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
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
};`
  },
  {
    name: "components/BreathingExercise.tsx",
    language: "typescript",
    content: `import React, { useState, useEffect } from 'react';

interface BreathingExerciseProps {
  isActive: boolean;
  onClose: () => void;
  primaryColor: string; // Tailwind class like 'bg-blue-600'
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ isActive, onClose, primaryColor }) => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timer, setTimer] = useState(0);

  // Simulation of 6 breaths per minute: 4s In, 1s Hold, 5s Out = 10s cycle
  useEffect(() => {
    if (!isActive) return;

    const cycle = () => {
      setPhase('Inhale');
      setTimeout(() => setPhase('Hold'), 4000);
      setTimeout(() => setPhase('Exhale'), 5000);
    };

    cycle(); // Initial
    const interval = setInterval(cycle, 10000); // Repeat every 10s

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  // Extract color hex code approximation for style injection if needed, 
  // or rely on Tailwind utility mapping.
  // We'll use a dynamic class for the circle.

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
      >
        <i className="fas fa-times text-2xl"></i>
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-white tracking-widest uppercase mb-2">Cohérence Cardiaque</h2>
        <p className="text-gray-400 text-sm">Synchronisation 6 cycles / minute</p>
      </div>

      {/* Visualizer Circle */}
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Outer Glow */}
        <div className={\`absolute w-full h-full rounded-full opacity-30 blur-xl animate-breathe \${primaryColor.replace('bg-', 'bg-')}\`}></div>
        
        {/* Inner Circle */}
        <div className={\`w-32 h-32 rounded-full shadow-2xl transition-all duration-[4000ms] ease-in-out flex items-center justify-center
            \${phase === 'Inhale' ? 'scale-150 opacity-100' : phase === 'Hold' ? 'scale-150 opacity-90' : 'scale-100 opacity-60'}
            \${primaryColor}
        \`}>
           <span className="text-white font-medium text-lg tracking-wider">{\${phase === 'Inhale' ? 'Inspire' : phase === 'Hold' ? 'Pause' : 'Expire'}}</span>
        </div>
      </div>

      <div className="mt-12 text-white/70 max-w-md text-center px-4">
        <p className="italic">"Laisse tes pensées passer comme des nuages. Reviens à ton souffle."</p>
      </div>
    </div>
  );
};

export default BreathingExercise;`
  },
  {
    name: "components/KernelSelector.tsx",
    language: "typescript",
    content: `import React from 'react';
import { KERNELS } from '../constants';
import { OKUKernel } from '../types';

interface KernelSelectorProps {
  currentKernel: OKUKernel;
  onSelect: (kernel: OKUKernel) => void;
  isOpen: boolean;
  onClose: () => void;
}

const KernelSelector: React.FC<KernelSelectorProps> = ({ currentKernel, onSelect, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            <i className="fas fa-microchip mr-2 text-indigo-500"></i>
            Sélection du Kernel OKU
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {KERNELS.map((kernel) => (
            <div 
              key={kernel.id}
              onClick={() => { onSelect(kernel); onClose(); }}
              className={\`relative cursor-pointer group border-2 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]
                \${currentKernel.id === kernel.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}
              \`}
            >
              <div className="flex items-start space-x-4">
                <div className={\`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md \${kernel.theme.primaryColor}\`}>
                   <span className="text-lg font-bold">{kernel.culture.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-800">{kernel.name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full border border-gray-200 text-gray-500">
                      {kernel.culture}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{kernel.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <i className="fas fa-brain mr-1"></i> {kernel.specialty}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <i className="fas fa-wave-square mr-1"></i> {kernel.audioConfig.baseFrequency}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Active Indicator */}
              {currentKernel.id === kernel.id && (
                <div className="absolute top-2 right-2 text-indigo-500">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
          Changer de Kernel réinitialise la conversation en cours pour adapter la persona.
        </div>
      </div>
    </div>
  );
};

export default KernelSelector;`
  },
  {
    name: "App.tsx",
    language: "typescript",
    content: `import React, { useState, useEffect, useRef } from 'react';
import { OKUKernel, Message } from './types';
import { KERNELS, CRISIS_RESOURCES } from './constants';
import { startChatSession, sendMessage } from './services/geminiService';
import BreathingExercise from './components/BreathingExercise';
import KernelSelector from './components/KernelSelector';
import SourceCodeViewer from './components/SourceCodeViewer';

const App: React.FC = () => {
  // State
  const [currentKernel, setCurrentKernel] = useState<OKUKernel>(KERNELS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [isKernelSelectorOpen, setIsKernelSelectorOpen] = useState(false);
  const [isSourceCodeOpen, setIsSourceCodeOpen] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat when Kernel changes
  useEffect(() => {
    const initChat = async () => {
      setMessages([]);
      setIsLoading(true);
      try {
        await startChatSession(currentKernel);
        // Add opening message
        setMessages([{
          id: 'system-opening',
          role: 'model',
          content: currentKernel.openingMessage,
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error("Failed to init chat", error);
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
  }, [currentKernel]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Safety Check Pattern (Client-side immediate detection)
  const checkSafety = (text: string) => {
    const dangerPatterns = /suicid|tuer|mourir|mort|pendre|finir/i;
    if (dangerPatterns.test(text)) {
      setShowCrisisModal(true);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    checkSafety(userText);

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendMessage(userText);
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: "Désolé, une erreur de connexion est survenue. Vérifiez votre clé API.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans relative">
      
      {/* Background Ambience */}
      <div className={\`absolute inset-0 bg-gradient-to-br \${currentKernel.theme.gradient} opacity-10 pointer-events-none\`}></div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full max-w-5xl mx-auto w-full shadow-2xl bg-white relative">
        
        {/* Header */}
        <header className="flex-none p-4 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur z-10">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsKernelSelectorOpen(true)}>
             <div className={\`w-10 h-10 rounded-full \${currentKernel.theme.primaryColor} flex items-center justify-center text-white shadow-lg transform transition hover:scale-110\`}>
                <i className="fas fa-leaf"></i>
             </div>
             <div>
               <h1 className="text-lg font-bold text-gray-800 flex items-center">
                 {currentKernel.name}
                 <i className="fas fa-chevron-down ml-2 text-xs text-gray-400"></i>
               </h1>
               <p className="text-xs text-gray-500 font-medium tracking-wide">
                 OKU Kernel • {currentKernel.culture} • {currentKernel.audioConfig.baseFrequency}
               </p>
             </div>
          </div>
          
          <div className="flex items-center space-x-3">
             <button
               onClick={() => setIsSourceCodeOpen(true)}
               className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors tooltip"
               title="Voir le Code Source"
             >
               <i className="fas fa-code"></i>
             </button>
             <button 
               onClick={() => setIsBreathingActive(true)}
               className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors tooltip"
               title="Exercice Respiration"
             >
               <i className="fas fa-lungs"></i>
             </button>
             <button 
                onClick={() => setShowCrisisModal(true)}
                className="px-3 py-1 rounded-full border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors uppercase tracking-wider"
             >
               SOS / Aide
             </button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-slate-50/50">
          
          {/* Disclaimer Banner */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-sm text-yellow-800 mb-6 shadow-sm">
             <p className="font-bold mb-1"><i className="fas fa-shield-alt mr-2"></i>Note Éthique & Sécurité</p>
             <p>Cet agent est une aide à la méditation et au bien-être. Il ne remplace pas un professionnel de la santé. En cas de crise, utilisez le bouton SOS.</p>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={\`flex w-full \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
            >
              <div 
                className={\`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed animate-fade-in
                  \${msg.role === 'user' 
                    ? \`bg-gradient-to-br \${currentKernel.theme.gradient} text-white rounded-tr-none\` 
                    : msg.isError 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                  }
                \`}
              >
                {/* Format content with basic Markdown-like preservation for paragraphs */}
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div className={\`text-[10px] mt-2 opacity-70 \${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}\`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start w-full animate-pulse">
               <div className="bg-gray-200 rounded-full h-8 w-12 flex items-center justify-center space-x-1 px-2">
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-none p-4 bg-white border-t border-gray-100">
          <div className="relative flex items-center bg-gray-100 rounded-full shadow-inner focus-within:ring-2 focus-within:ring-blue-300 transition-all">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Écris ce que tu ressens..."
              rows={1}
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-4 text-gray-700 placeholder-gray-400 max-h-24 outline-none"
              style={{ minHeight: '48px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={\`mr-2 w-10 h-10 rounded-full flex items-center justify-center transition-all
                \${!inputValue.trim() || isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : \`bg-gradient-to-r \${currentKernel.theme.gradient} text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5\`
                }
              \`}
            >
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
          
          {/* Footer Copyright */}
          <div className="mt-2 text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">
              *** PROPRIÉTÉ INTELLECTUELLE & AVERTISSEMENT *** © 2025 Bryan Ouellette /Bryan Ouellet. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      {/* Components */}
      <BreathingExercise 
        isActive={isBreathingActive} 
        onClose={() => setIsBreathingActive(false)} 
        primaryColor={currentKernel.theme.primaryColor}
      />
      
      <KernelSelector
        isOpen={isKernelSelectorOpen}
        onClose={() => setIsKernelSelectorOpen(false)}
        currentKernel={currentKernel}
        onSelect={setCurrentKernel}
      />

      <SourceCodeViewer 
        isOpen={isSourceCodeOpen}
        onClose={() => setIsSourceCodeOpen(false)}
      />

      {/* Crisis Modal - Always available overlay */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900/40 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-red-500 animate-fade-in p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <i className="fas fa-life-ring"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Besoin d'aide immédiate?</h2>
              <p className="text-gray-600 mt-2">Tu n'es pas seul(e). Des gens sont là pour t'écouter, gratuitement et confidentiellement.</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {CRISIS_RESOURCES.map((resource, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <h3 className="font-bold text-red-800">{resource.name}</h3>
                    <p className="text-xs text-red-600">{resource.description}</p>
                  </div>
                  <a href={\`tel:\${resource.contact.replace(/\D/g,'')}\`} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-md">
                    {resource.contact}
                  </a>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowCrisisModal(false)}
              className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
            >
              Je vais bien, retourner à l'application
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;`
  }
];

const SourceCodeViewer: React.FC<SourceCodeViewerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-gray-900 text-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <h2 className="text-xl font-mono text-green-400">
          <i className="fas fa-terminal mr-2"></i>
          CODE SOURCE COMPLET
        </h2>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
        >
          Fermer <i className="fas fa-times ml-2"></i>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-12">
        <div className="max-w-6xl mx-auto">
            <p className="mb-8 text-gray-400 font-mono text-sm border-l-2 border-green-500 pl-4">
                Architecture transparente: Voici le code source complet de l'application OKU Kernel généré pour cette session.
            </p>

            {FILES.map((file, index) => (
                <div key={index} className="border border-gray-700 rounded-lg overflow-hidden shadow-2xl bg-[#1e1e1e]">
                    <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
                        <span className="font-mono text-sm font-bold text-blue-300">{file.name}</span>
                        <span className="text-xs text-gray-500 uppercase">{file.language}</span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-300 leading-relaxed whitespace-pre">
                            {file.content}
                        </pre>
                    </div>
                </div>
            ))}

            <div className="mt-12 text-center text-gray-600 text-xs font-mono">
                *** FIN DU FICHIER SOURCE ***
            </div>
        </div>
      </div>
    </div>
  );
};

export default SourceCodeViewer;