import { PC, Tariff, Booking, User, Session } from '@/types';

export const tariffs: Tariff[] = [
  {
    id: '1',
    name: 'Стандарт',
    hours: 4,
    price: 600,
    description: '4 часа игрового времени'
  },
  {
    id: '2',
    name: 'Ночной',
    hours: 8,
    price: 1000,
    description: 'С 22:00 до 06:00'
  },
  {
    id: '3',
    name: 'VIP',
    hours: 2,
    price: 500,
    description: '2 часа + напиток'
  },
  {
    id: '4',
    name: 'Безлимит',
    hours: 12,
    price: 1500,
    description: '12 часов непрерывной игры'
  }
];

export const pcs: PC[] = [
  { id: '1', number: 1, status: 'free', zone: 'Стандарт', specs: { cpu: 'Intel i7-13700K', gpu: 'RTX 4070 Ti', ram: '32GB DDR5', monitor: '27" 240Hz' }, position: { x: 50, y: 50 } },
  { id: '2', number: 2, status: 'occupied', zone: 'Стандарт', specs: { cpu: 'Intel i7-13700K', gpu: 'RTX 4070 Ti', ram: '32GB DDR5', monitor: '27" 240Hz' }, position: { x: 150, y: 50 } },
  { id: '3', number: 3, status: 'free', zone: 'Стандарт', specs: { cpu: 'Intel i7-13700K', gpu: 'RTX 4070 Ti', ram: '32GB DDR5', monitor: '27" 240Hz' }, position: { x: 250, y: 50 } },
  { id: '4', number: 4, status: 'booked', zone: 'Стандарт', specs: { cpu: 'Intel i7-13700K', gpu: 'RTX 4070 Ti', ram: '32GB DDR5', monitor: '27" 240Hz' }, position: { x: 350, y: 50 } },
  { id: '5', number: 5, status: 'free', zone: 'Стандарт', specs: { cpu: 'Intel i7-13700K', gpu: 'RTX 4070 Ti', ram: '32GB DDR5', monitor: '27" 240Hz' }, position: { x: 450, y: 50 } },
  { id: '6', number: 6, status: 'free', zone: 'VIP', specs: { cpu: 'Intel i9-14900K', gpu: 'RTX 4090', ram: '64GB DDR5', monitor: '32" 4K 144Hz' }, position: { x: 50, y: 150 } },
  { id: '7', number: 7, status: 'occupied', zone: 'VIP', specs: { cpu: 'Intel i9-14900K', gpu: 'RTX 4090', ram: '64GB DDR5', monitor: '32" 4K 144Hz' }, position: { x: 150, y: 150 } },
  { id: '8', number: 8, status: 'free', zone: 'VIP', specs: { cpu: 'Intel i9-14900K', gpu: 'RTX 4090', ram: '64GB DDR5', monitor: '32" 4K 144Hz' }, position: { x: 250, y: 150 } },
  { id: '9', number: 9, status: 'free', zone: 'Стандарт', specs: { cpu: 'Intel i5-13400F', gpu: 'RTX 4060', ram: '16GB DDR4', monitor: '24" 144Hz' }, position: { x: 350, y: 150 } },
  { id: '10', number: 10, status: 'booked', zone: 'Стандарт', specs: { cpu: 'Intel i5-13400F', gpu: 'RTX 4060', ram: '16GB DDR4', monitor: '24" 144Hz' }, position: { x: 450, y: 150 } },
];

export const currentUser: User = {
  id: '1',
  name: 'Александр Иванов',
  email: 'alex@example.com',
  phone: '+7 (999) 123-45-67',
  bonusPoints: 1230
};

export const userBookings: Booking[] = [
  {
    id: '1',
    pcId: '4',
    pcNumber: 4,
    clientName: 'Александр Иванов',
    date: '2026-01-26',
    startTime: '18:00',
    endTime: '22:00',
    tariffId: '1',
    status: 'pending',
    amount: 600,
    additionalServices: ['Наушники']
  },
  {
    id: '2',
    pcId: '10',
    pcNumber: 10,
    clientName: 'Александр Иванов',
    date: '2026-01-27',
    startTime: '14:00',
    endTime: '18:00',
    tariffId: '1',
    status: 'confirmed',
    amount: 750,
    additionalServices: ['Наушники', 'Напиток']
  }
];

export const activeSessions: Session[] = [
  { id: '1', pcNumber: 2, clientName: 'Дмитрий Петров', startTime: '14:30', remainingTime: '2:15', amount: 600 },
  { id: '2', pcNumber: 7, clientName: 'Елена Сидорова', startTime: '13:00', remainingTime: '0:45', amount: 500 },
  { id: '3', pcNumber: 15, clientName: 'Игорь Козлов', startTime: '15:00', remainingTime: '3:30', amount: 600 },
  { id: '4', pcNumber: 23, clientName: 'Анна Смирнова', startTime: '12:00', remainingTime: '1:20', amount: 1000 },
];

export const visitHistory = [
  { date: '2026-01-20', hours: 4, amount: 600 },
  { date: '2026-01-15', hours: 2, amount: 500 },
  { date: '2026-01-10', hours: 8, amount: 1000 },
  { date: '2026-01-05', hours: 4, amount: 600 },
];

export const weeklyActivity = [
  { day: 'Пн', hours: 3 },
  { day: 'Вт', hours: 0 },
  { day: 'Ср', hours: 4 },
  { day: 'Чт', hours: 2 },
  { day: 'Пт', hours: 8 },
  { day: 'Сб', hours: 6 },
  { day: 'Вс', hours: 5 },
];

export const analyticsData = {
  hourlyLoad: [
    { hour: '00:00', actual: 5, forecast: 7 },
    { hour: '03:00', actual: 2, forecast: 3 },
    { hour: '06:00', actual: 8, forecast: 10 },
    { hour: '09:00', actual: 15, forecast: 16 },
    { hour: '12:00', actual: 22, forecast: 20 },
    { hour: '15:00', actual: 28, forecast: 25 },
    { hour: '18:00', actual: 30, forecast: 29 },
    { hour: '21:00', actual: 27, forecast: 28 },
  ],
  revenueByZone: [
    { zone: 'Стандарт', revenue: 45000 },
    { zone: 'VIP', revenue: 32000 },
    { zone: 'Премиум', revenue: 18000 },
  ],
  tariffPopularity: [
    { name: 'Стандарт', value: 45 },
    { name: 'Ночной', value: 25 },
    { name: 'VIP', value: 20 },
    { name: 'Безлимит', value: 10 },
  ],
  topClients: [
    { name: 'Дмитрий Петров', hours: 48, amount: 7200, lastVisit: '2026-01-24' },
    { name: 'Елена Сидорова', hours: 42, amount: 6300, lastVisit: '2026-01-23' },
    { name: 'Игорь Козлов', hours: 38, amount: 5700, lastVisit: '2026-01-25' },
    { name: 'Анна Смирнова', hours: 35, amount: 5250, lastVisit: '2026-01-22' },
    { name: 'Сергей Волков', hours: 32, amount: 4800, lastVisit: '2026-01-24' },
  ],
};
