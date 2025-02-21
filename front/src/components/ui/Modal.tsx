import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-auto card p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-emerald-400" />
        </button>
        {children}
      </div>
    </div>
  );
}