import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/app/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/Card';
import { Badge } from '@/app/components/Badge';
import { useAppContext } from '@/app/context/AppContext';
import { PC } from '@/types';
import { Calendar, Clock, Users, Monitor } from 'lucide-react';

function PCIcon({ pc, onHover, isHovered }: { pc: PC; onHover: (pc: PC | null) => void; isHovered: boolean }) {
  const statusColors = {
    free: '#00FF88',
    booked: '#FFC107',
    occupied: '#F44336'
  };
  
  return (
    <g
      onMouseEnter={() => onHover(pc)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer transition-all"
      style={{ transform: isHovered ? 'scale(1.2)' : 'scale(1)' }}
    >
      <rect
        x={pc.position.x}
        y={pc.position.y}
        width="60"
        height="60"
        rx="8"
        fill={statusColors[pc.status]}
        opacity={isHovered ? 1 : 0.9}
        stroke={isHovered ? '#1A237E' : 'transparent'}
        strokeWidth="3"
      />
      <text
        x={pc.position.x + 30}
        y={pc.position.y + 38}
        textAnchor="middle"
        fill="#1A237E"
        fontSize="20"
        fontWeight="bold"
      >
        {pc.number}
      </text>
    </g>
  );
}

export function HomePage() {
  const { pcs, tariffs } = useAppContext();
  const [selectedDate, setSelectedDate] = useState('2026-01-26');
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [hours, setHours] = useState(4);
  const [hoveredPC, setHoveredPC] = useState<PC | null>(null);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Играй с комфортом</h1>
            <p className="text-2xl mb-8 text-primary-foreground/90">Бронируй ПК онлайн — экономь время</p>
            
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Дата
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input-background"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Время начала
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input-background"
                    >
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return <option key={i} value={`${hour}:00`}>{hour}:00</option>;
                      })}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">
                      <Users className="w-4 h-4 inline mr-2" />
                      Количество часов: {hours}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button variant="accent" size="lg" className="w-full">
                  Найти доступные ПК
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Hall Map Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Карта зала</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-end gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#00FF88]"></div>
                  <span className="text-sm">Свободен</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#FFC107]"></div>
                  <span className="text-sm">Забронирован</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#F44336]"></div>
                  <span className="text-sm">Занят</span>
                </div>
              </div>
              
              <svg viewBox="0 0 600 300" className="w-full h-auto border border-border rounded-lg bg-white">
                {pcs.map((pc) => (
                  <PCIcon
                    key={pc.id}
                    pc={pc}
                    onHover={setHoveredPC}
                    isHovered={hoveredPC?.id === pc.id}
                  />
                ))}
              </svg>
            </Card>
          </div>
          
          <div className="lg:w-80">
            {hoveredPC ? (
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>ПК №{hoveredPC.number}</span>
                    <Badge variant={hoveredPC.status}>
                      {hoveredPC.status === 'free' ? 'Свободен' : hoveredPC.status === 'booked' ? 'Забронирован' : 'Занят'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Зона</div>
                      <div className="font-medium">{hoveredPC.zone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Характеристики</div>
                      <div className="space-y-1 text-sm">
                        <div><span className="text-muted-foreground">CPU:</span> {hoveredPC.specs.cpu}</div>
                        <div><span className="text-muted-foreground">GPU:</span> {hoveredPC.specs.gpu}</div>
                        <div><span className="text-muted-foreground">RAM:</span> {hoveredPC.specs.ram}</div>
                        <div><span className="text-muted-foreground">Монитор:</span> {hoveredPC.specs.monitor}</div>
                      </div>
                    </div>
                    {hoveredPC.status === 'free' && (
                      <Link to={`/booking/${hoveredPC.id}`}>
                        <Button variant="accent" className="w-full mt-4">
                          Забронировать
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-24">
                <CardContent className="text-center py-12 text-muted-foreground">
                  <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Наведите на компьютер для просмотра информации</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
      
      {/* Popular Tariffs Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Популярные тарифы</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tariffs.map((tariff) => (
            <Card key={tariff.id} hover className="text-center">
              <CardHeader>
                <CardTitle>{tariff.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-accent mb-2">{tariff.price}₽</div>
                <p className="text-muted-foreground mb-4">{tariff.description}</p>
                <Button variant="primary" className="w-full">Выбрать</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
