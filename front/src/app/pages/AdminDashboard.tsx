import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/app/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/Card';
import { Badge } from '@/app/components/Badge';
import { useAppContext } from '@/app/context/AppContext';
import { Monitor, DollarSign, Clock, TrendingUp, Search, Plus, FileText, BarChart3 } from 'lucide-react';

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const { pcs, activeSessions } = useAppContext();
  
  const occupiedPCs = pcs.filter(pc => pc.status === 'occupied').length;
  const totalRevenue = 15430;
  const activeSess = activeSessions.length;
  const avgTime = 3.2;
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Панель администратора</h1>
            <Link to="/admin/analytics">
              <Button variant="accent">
                <BarChart3 className="w-5 h-5 mr-2" />
                Аналитика
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Monitor className="w-10 h-10 text-accent" />
                <span className="text-3xl font-bold text-accent">{occupiedPCs}/{pcs.length}</span>
              </div>
              <div className="text-muted-foreground">Занятость</div>
              <div className="text-2xl font-semibold mt-1">
                {Math.round((occupiedPCs / pcs.length) * 100)}%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-10 h-10 text-accent" />
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div className="text-muted-foreground">Выручка сегодня</div>
              <div className="text-2xl font-semibold mt-1">{totalRevenue.toLocaleString()}₽</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Monitor className="w-10 h-10 text-primary" />
                <span className="text-3xl font-bold text-primary">{activeSess}</span>
              </div>
              <div className="text-muted-foreground">Активные сеансы</div>
              <div className="text-sm mt-1 text-muted-foreground">Сейчас играют</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-10 h-10 text-primary" />
                <span className="text-3xl font-bold text-primary">{avgTime}</span>
              </div>
              <div className="text-muted-foreground">Среднее время</div>
              <div className="text-sm mt-1 text-muted-foreground">часа на сеанс</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Текущие сеансы</span>
                  <Badge variant="confirmed">{activeSessions.length} активных</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2">ПК №</th>
                        <th className="text-left py-3 px-2">Клиент</th>
                        <th className="text-left py-3 px-2">Время начала</th>
                        <th className="text-left py-3 px-2">Осталось</th>
                        <th className="text-left py-3 px-2">Сумма</th>
                        <th className="text-left py-3 px-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSessions.map((session) => (
                        <tr key={session.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-2 font-semibold">{session.pcNumber}</td>
                          <td className="py-3 px-2">{session.clientName}</td>
                          <td className="py-3 px-2 text-muted-foreground">{session.startTime}</td>
                          <td className="py-3 px-2">
                            <span className="text-accent font-medium">{session.remainingTime}</span>
                          </td>
                          <td className="py-3 px-2 font-semibold">{session.amount}₽</td>
                          <td className="py-3 px-2">
                            <Button variant="destructive" size="sm">
                              Завершить
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="accent" className="w-full justify-start">
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить бронь
                  </Button>
                  
                  <Button variant="primary" className="w-full justify-start">
                    <Monitor className="w-5 h-5 mr-2" />
                    Изменить статус ПК
                  </Button>
                  
                  <Button variant="primary" className="w-full justify-start">
                    <FileText className="w-5 h-5 mr-2" />
                    Создать отчёт
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Поиск клиента</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Номер телефона"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-input-background"
                  />
                  <Button variant="accent" size="md">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Карта зала (мини)</CardTitle>
              </CardHeader>
              <CardContent>
                <svg viewBox="0 0 300 150" className="w-full h-auto border border-border rounded-lg bg-white">
                  {pcs.slice(0, 6).map((pc) => (
                    <rect
                      key={pc.id}
                      x={pc.position.x * 0.5}
                      y={pc.position.y * 0.5}
                      width="30"
                      height="30"
                      rx="4"
                      fill={
                        pc.status === 'free' ? '#00FF88' :
                        pc.status === 'booked' ? '#FFC107' : '#F44336'
                      }
                      className="cursor-pointer hover:opacity-80"
                    />
                  ))}
                </svg>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#00FF88]"></div>
                    <span>Свободен</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#FFC107]"></div>
                    <span>Забронирован</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#F44336]"></div>
                    <span>Занят</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
