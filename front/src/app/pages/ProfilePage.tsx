import React, { useState } from 'react';
import { Button } from '@/app/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/Card';
import { Badge } from '@/app/components/Badge';
import { useAppContext } from '@/app/context/AppContext';
import { visitHistory, weeklyActivity } from '@/data/mockData';
import { User, Calendar, Clock, Gift, Settings, LogOut, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ProfilePage() {
  const { currentUser, userBookings, cancelBooking } = useAppContext();
  const [activeTab, setActiveTab] = useState<'bookings' | 'history' | 'bonuses'>('bookings');
  
  const totalHours = visitHistory.reduce((sum, visit) => sum + visit.hours, 0);
  
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'bookings'
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Мои бронирования</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'history'
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                    <span>История посещений</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('bonuses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'bonuses'
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Gift className="w-5 h-5" />
                    <span className="flex-1 text-left">Бонусы</span>
                    <span className="text-sm font-semibold">{currentUser.bonusPoints}</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                    <Settings className="w-5 h-5" />
                    <span>Настройки</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Выход</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-6">Мои бронирования</h1>
                  
                  <div className="space-y-4">
                    {userBookings.map((booking) => (
                      <Card key={booking.id} hover>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold">ПК №{booking.pcNumber}</h3>
                                <Badge variant={booking.status}>
                                  {booking.status === 'pending' ? 'Ожидает оплаты' : 'Подтверждено'}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Дата:</span>{' '}
                                  <span className="font-medium">{new Date(booking.date).toLocaleDateString('ru-RU')}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Время:</span>{' '}
                                  <span className="font-medium">{booking.startTime} - {booking.endTime}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Сумма:</span>{' '}
                                  <span className="font-medium text-accent">{booking.amount}₽</span>
                                </div>
                                {booking.additionalServices.length > 0 && (
                                  <div>
                                    <span className="text-muted-foreground">Услуги:</span>{' '}
                                    <span className="font-medium">{booking.additionalServices.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              {booking.status === 'pending' && (
                                <Button variant="accent">Оплатить</Button>
                              )}
                              <Button variant="destructive" size="sm" onClick={() => cancelBooking(booking.id)}>Отменить</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-6">История посещений</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-3 text-accent" />
                        <div className="text-3xl font-bold text-accent mb-1">{totalHours}</div>
                        <div className="text-muted-foreground">Всего часов</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Calendar className="w-12 h-12 mx-auto mb-3 text-primary" />
                        <div className="text-3xl font-bold text-primary mb-1">{visitHistory.length}</div>
                        <div className="text-muted-foreground">Посещений</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Gift className="w-12 h-12 mx-auto mb-3 text-accent" />
                        <div className="text-3xl font-bold text-accent mb-1">{currentUser.bonusPoints}</div>
                        <div className="text-muted-foreground">Бонусных баллов</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Активность за неделю</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyActivity}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="hours" fill="#00FF88" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Последние посещения</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {visitHistory.map((visit, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div>
                              <div className="font-medium">
                                {new Date(visit.date).toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {visit.hours} {visit.hours === 1 ? 'час' : visit.hours < 5 ? 'часа' : 'часов'}
                              </div>
                            </div>
                            <div className="text-lg font-semibold text-accent">{visit.amount}₽</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === 'bonuses' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-6">Бонусная программа</h1>
                  
                  <Card className="mb-6 bg-gradient-to-r from-primary to-accent text-white">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg mb-2">Ваш баланс</div>
                          <div className="text-5xl font-bold">{currentUser.bonusPoints}</div>
                          <div className="text-sm opacity-90 mt-2">бонусных баллов</div>
                        </div>
                        <Gift className="w-24 h-24 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Активировать промокод</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Введите промокод"
                          className="flex-1 px-4 py-2 border border-border rounded-lg bg-input-background"
                        />
                        <Button variant="accent">Активировать</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Как получить бонусы?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-4 p-4 border border-border rounded-lg">
                          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-accent">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">За каждый час игры</h4>
                            <p className="text-sm text-muted-foreground">Получайте 10 бонусов за каждый час</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 p-4 border border-border rounded-lg">
                          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-accent">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Приведи друга</h4>
                            <p className="text-sm text-muted-foreground">500 бонусов за каждого друга</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 p-4 border border-border rounded-lg">
                          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-accent">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Промокоды</h4>
                            <p className="text-sm text-muted-foreground">Используйте специальные промокоды</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
