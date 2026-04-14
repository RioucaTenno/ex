import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant: 'free' | 'booked' | 'occupied' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  const variants = {
    free: 'bg-[#00FF88] text-[#1A237E]',
    booked: 'bg-[#FFC107] text-[#1A237E]',
    occupied: 'bg-[#F44336] text-white',
    pending: 'bg-[#FFC107] text-[#1A237E]',
    confirmed: 'bg-[#00FF88] text-[#1A237E]',
    completed: 'bg-muted text-muted-foreground',
    cancelled: 'bg-[#F44336] text-white'
  };
  
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-sm font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}
