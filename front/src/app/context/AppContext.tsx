import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PC, Booking, Tariff, User, Session } from '@/types';
import { pcs as initialPcs, tariffs, currentUser, userBookings as initialUserBookings, activeSessions as initialSessions } from '@/data/mockData';

interface AppContextType {
  pcs: PC[];
  tariffs: Tariff[];
  currentUser: User;
  userBookings: Booking[];
  activeSessions: Session[];
  bookPC: (pcId: string, tariffId: string, date: string, startTime: string, hours: number) => void;
  cancelBooking: (bookingId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [pcs, setPcs] = useState<PC[]>(initialPcs);
  const [userBookings, setUserBookings] = useState<Booking[]>(initialUserBookings);
  const [activeSessions, setActiveSessions] = useState<Session[]>(initialSessions);

  const bookPC = (pcId: string, tariffId: string, date: string, startTime: string, hours: number) => {
    // 1. Update PC status
    setPcs(prev => prev.map(pc => pc.id === pcId ? { ...pc, status: 'booked' } : pc));
    
    // 2. Add booking
    const selectedTariff = tariffs.find(t => t.id === tariffId);
    const selectedPc = pcs.find(p => p.id === pcId);
    
    if (selectedTariff && selectedPc) {
      const newBooking: Booking = {
        id: Math.random().toString(36).substring(7),
        pcId,
        pcNumber: selectedPc.number,
        clientName: currentUser.name,
        date,
        startTime,
        endTime: `${(parseInt(startTime.split(':')[0]) + hours) % 24}:00`,
        tariffId,
        status: 'pending',
        amount: selectedTariff.price,
        additionalServices: []
      };
      
      setUserBookings(prev => [...prev, newBooking]);
    }
  };

  const cancelBooking = (bookingId: string) => {
    const booking = userBookings.find(b => b.id === bookingId);
    if (booking) {
      setUserBookings(prev => prev.filter(b => b.id !== bookingId));
      setPcs(prev => prev.map(pc => pc.id === booking.pcId ? { ...pc, status: 'free' } : pc));
    }
  };

  return (
    <AppContext.Provider value={{
      pcs,
      tariffs,
      currentUser,
      userBookings,
      activeSessions,
      bookPC,
      cancelBooking
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
