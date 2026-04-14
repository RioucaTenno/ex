import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@/app/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/Card';
import { useAppContext } from '@/app/context/AppContext';
import { Monitor, Cpu, Tv, MemoryStick, Clock } from 'lucide-react';

export function BookingPage() {
  const { pc_id } = useParams();
  const navigate = useNavigate();
  const { pcs, tariffs, bookPC } = useAppContext();
  const pc = pcs.find(p => p.id === pc_id);
  
  const [selectedTariff, setSelectedTariff] = useState(tariffs[0].id);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 минут в секундах
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  if (!pc) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-xl">ПК не найден</p>
            <Button variant="primary" className="mt-4" onClick={() => navigate('/')}>
              Вернуться на главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const selectedTariffData = tariffs.find(t => t.id === selectedTariff);
  const servicesPrice = additionalServices.reduce((sum, service) => {
    const prices: Record<string, number> = { 'headphones': 100, 'keyboard': 50, 'drink': 150 };
    return sum + (prices[service] || 0);
  }, 0);
  const totalPrice = (selectedTariffData?.price || 0) + servicesPrice;
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const toggleService = (service: string) => {
    setAdditionalServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };
  
  const handleBook = () => {
    if (!pc || !selectedTariffData) return;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:00`;
    bookPC(pc.id, selectedTariff, dateStr, timeStr, selectedTariffData.hours);
    navigate('/profile');
  };
  
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Бронирование ПК №{pc.number}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* PC Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Информация о ПК</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-primary to-primary/80 rounded-lg mb-6 flex items-center justify-center">
                    <Monitor className="w-24 h-24 text-primary-foreground" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Cpu className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <div className="text-sm text-muted-foreground">Процессор</div>
                        <div className="font-medium">{pc.specs.cpu}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <div className="text-sm text-muted-foreground">Видеокарта</div>
                        <div className="font-medium">{pc.specs.gpu}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MemoryStick className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <div className="text-sm text-muted-foreground">ОЗУ</div>
                        <div className="font-medium">{pc.specs.ram}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Tv className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <div className="text-sm text-muted-foreground">Монитор</div>
                        <div className="font-medium">{pc.specs.monitor}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">Зона</div>
                    <div className="font-medium text-lg">{pc.zone}</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tariff Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Выбор тарифа</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tariffs.map((tariff) => (
                      <div
                        key={tariff.id}
                        onClick={() => setSelectedTariff(tariff.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedTariff === tariff.id
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="radio"
                            checked={selectedTariff === tariff.id}
                            onChange={() => setSelectedTariff(tariff.id)}
                            className="w-4 h-4 text-accent"
                          />
                          <div>
                            <div className="font-semibold">{tariff.name}</div>
                            <div className="text-sm text-muted-foreground">{tariff.description}</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-accent">{tariff.price}₽</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Additional Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Дополнительные услуги</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={additionalServices.includes('headphones')}
                          onChange={() => toggleService('headphones')}
                          className="w-4 h-4"
                        />
                        <span>Наушники</span>
                      </div>
                      <span className="font-medium">+100₽</span>
                    </label>
                    
                    <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={additionalServices.includes('keyboard')}
                          onChange={() => toggleService('keyboard')}
                          className="w-4 h-4"
                        />
                        <span>Клавиатура</span>
                      </div>
                      <span className="font-medium">+50₽</span>
                    </label>
                    
                    <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={additionalServices.includes('drink')}
                          onChange={() => toggleService('drink')}
                          className="w-4 h-4"
                        />
                        <span>Напиток</span>
                      </div>
                      <span className="font-medium">+150₽</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-destructive font-semibold p-3 bg-destructive/10 rounded-lg">
                      <Clock className="w-5 h-5" />
                      <span>Бронь до: {minutes}:{seconds.toString().padStart(2, '0')}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Тариф:</span>
                        <span className="font-medium">{selectedTariffData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Стоимость тарифа:</span>
                        <span className="font-medium">{selectedTariffData?.price}₽</span>
                      </div>
                      {servicesPrice > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Доп. услуги:</span>
                          <span className="font-medium">{servicesPrice}₽</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-semibold">Сумма к оплате:</span>
                        <span className="text-3xl font-bold text-accent">{totalPrice}₽</span>
                      </div>
                      
                      <div className="space-y-3">
                        <Button variant="accent" size="lg" className="w-full" onClick={handleBook}>
                          Оплатить онлайн
                        </Button>
                        <Button variant="secondary" size="lg" className="w-full" onClick={handleBook}>
                          Забронировать с оплатой на месте
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
