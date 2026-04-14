import React from 'react';
import { Button } from '@/app/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/Card';
import { useAppContext } from '@/app/context/AppContext';
import { Check, Clock, DollarSign, Zap } from 'lucide-react';

export function TariffsPage() {
  const { tariffs } = useAppContext();
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Наши тарифы</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите оптимальный тариф для комфортной игры
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {tariffs.map((tariff, index) => (
            <Card 
              key={tariff.id} 
              hover 
              className={index === 2 ? 'border-2 border-accent shadow-xl' : ''}
            >
              {index === 2 && (
                <div className="bg-accent text-accent-foreground text-center py-2 rounded-t-lg font-semibold">
                  Популярный выбор
                </div>
              )}
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                    {index === 0 && <Clock className="w-8 h-8 text-accent" />}
                    {index === 1 && <Zap className="w-8 h-8 text-accent" />}
                    {index === 2 && <DollarSign className="w-8 h-8 text-accent" />}
                    {index === 3 && <Check className="w-8 h-8 text-accent" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tariff.name}</h3>
                  <p className="text-muted-foreground mb-4">{tariff.description}</p>
                  <div className="text-4xl font-bold text-accent mb-2">{tariff.price}₽</div>
                  <div className="text-sm text-muted-foreground">
                    {(tariff.price / tariff.hours).toFixed(0)}₽ за час
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent" />
                    <span>{tariff.hours} {tariff.hours === 1 ? 'час' : tariff.hours < 5 ? 'часа' : 'часов'} игры</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent" />
                    <span>Мощное железо</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent" />
                    <span>Удобное кресло</span>
                  </li>
                  {index >= 2 && (
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent" />
                      <span>Напиток в подарок</span>
                    </li>
                  )}
                </ul>
                
                <Button 
                  variant={index === 2 ? 'accent' : 'primary'} 
                  className="w-full"
                >
                  Выбрать тариф
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <p>Работаем круглосуточно</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">30</div>
                <p>Игровых мест</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">240Hz</div>
                <p>Мониторы с высокой частотой</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
