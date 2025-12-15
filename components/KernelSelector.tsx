import React from 'react';
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
              className={`relative cursor-pointer group border-2 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]
                ${currentKernel.id === kernel.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md ${kernel.theme.primaryColor}`}>
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

export default KernelSelector;