import React, { useState, useEffect, useRef } from 'react';
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
      <div className={`absolute inset-0 bg-gradient-to-br ${currentKernel.theme.gradient} opacity-10 pointer-events-none`}></div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full max-w-5xl mx-auto w-full shadow-2xl bg-white relative">
        
        {/* Header */}
        <header className="flex-none p-4 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur z-10">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsKernelSelectorOpen(true)}>
             <div className={`w-10 h-10 rounded-full ${currentKernel.theme.primaryColor} flex items-center justify-center text-white shadow-lg transform transition hover:scale-110`}>
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
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed animate-fade-in
                  ${msg.role === 'user' 
                    ? `bg-gradient-to-br ${currentKernel.theme.gradient} text-white rounded-tr-none` 
                    : msg.isError 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                  }
                `}
              >
                {/* Format content with basic Markdown-like preservation for paragraphs */}
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div className={`text-[10px] mt-2 opacity-70 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
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
              className={`mr-2 w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${!inputValue.trim() || isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : `bg-gradient-to-r ${currentKernel.theme.gradient} text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5`
                }
              `}
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
                  <a href={`tel:${resource.contact.replace(/\D/g,'')}`} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-md">
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

export default App;