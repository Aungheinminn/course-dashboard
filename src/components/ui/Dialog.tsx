import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={dialogRef}
        className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }: { children: ReactNode }) => (
  <div className="p-6">{children}</div>
);

export const DialogHeader = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-between mb-4">{children}</div>
);

export const DialogTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const DialogClose = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
);
