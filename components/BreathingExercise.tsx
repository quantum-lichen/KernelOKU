import React, { useState, useEffect } from 'react';

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
        <div className={`absolute w-full h-full rounded-full opacity-30 blur-xl animate-breathe ${primaryColor.replace('bg-', 'bg-')}`}></div>
        
        {/* Inner Circle */}
        <div className={`w-32 h-32 rounded-full shadow-2xl transition-all duration-[4000ms] ease-in-out flex items-center justify-center
            ${phase === 'Inhale' ? 'scale-150 opacity-100' : phase === 'Hold' ? 'scale-150 opacity-90' : 'scale-100 opacity-60'}
            ${primaryColor}
        `}>
           <span className="text-white font-medium text-lg tracking-wider">{phase === 'Inhale' ? 'Inspire' : phase === 'Hold' ? 'Pause' : 'Expire'}</span>
        </div>
      </div>

      <div className="mt-12 text-white/70 max-w-md text-center px-4">
        <p className="italic">"Laisse tes pensées passer comme des nuages. Reviens à ton souffle."</p>
      </div>
    </div>
  );
};

export default BreathingExercise;