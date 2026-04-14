export type PCStatus = 'free' | 'booked' | 'occupied';

export interface PC {
  id: string;
  number: number;
  status: PCStatus;
  zone: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    monitor: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface Tariff {
  id: string;
  name: string;
  hours: number;
  price: number;
  description?: string;
}

export interface Booking {
  id: string;
  pcId: string;
  pcNumber: number;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  tariffId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  additionalServices: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bonusPoints: number;
  avatar?: string;
}

export interface Session {
  id: string;
  pcNumber: number;
  clientName: string;
  startTime: string;
  remainingTime: string;
  amount: number;
}
