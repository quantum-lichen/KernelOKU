// Définition de la structure d'un message
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
}