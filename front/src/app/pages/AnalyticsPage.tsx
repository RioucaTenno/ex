import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/app/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/Card';
import { analyticsData } from '@/data/mockData';
import { ArrowLeft, Download, Mail, FileText } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#00FF88', '#1A237E', '#FFC107', '#F44336'];

export function AnalyticsPage() {
  const [period, setPeriod] = useState('week');
  const [email, setEmail] = useState('');
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="accent" size="sm">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Назад
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Аналитика</h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Period Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium">Период:</span>
              {['Сегодня', 'Неделя', 'Месяц', 'Квартал', 'Год'].map((label, index) => {
                const value = ['today', 'week', 'month', 'quarter', 'year'][index];
                return (
                  <Button
                    key={value}
                    variant={period === value ? 'accent' : 'secondary'}
                    size="sm"
                    onClick={() => setPeriod(value)}
                  >
                    {label}
                  </Button>
                );
              })}
              <div className="flex gap-2 ml-auto">
                <input
                  type="date"
                  className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm"
                />
                <span className="self-center">—</span>
                <input
                  type="date"
                  className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Hourly Load */}
          <Card>
            <CardHeader>
              <CardTitle>Загрузка по часам</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.hourlyLoad}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#00FF88" strokeWidth={2} name="Факт" />
                  <Line type="monotone" dataKey="forecast" stroke="#1A237E" strokeWidth={2} strokeDasharray="5 5" name="Прогноз" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Revenue by Zone */}
          <Card>
            <CardHeader>
              <CardTitle>Доход по зонам</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.revenueByZone}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#00FF88" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tariff Popularity */}
          <Card>
            <CardHeader>
              <CardTitle>Популярность тарифов</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.tariffPopularity}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.tariffPopularity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Top Clients */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Топ-10 клиентов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2">Имя</th>
                      <th className="text-left py-3 px-2">Часов</th>
                      <th className="text-left py-3 px-2">Сумма</th>
                      <th className="text-left py-3 px-2">Последний визит</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topClients.map((client, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">{client.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{client.hours}</td>
                        <td className="py-3 px-2 font-semibold text-accent">{client.amount.toLocaleString()}₽</td>
                        <td className="py-3 px-2 text-muted-foreground">
                          {new Date(client.lastVisit).toLocaleDateString('ru-RU')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Export Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Экспорт отчётов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Email для отправки отчёта
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input-background"
                />
              </div>
              
              <div className="flex items-end gap-3">
                <Button variant="primary">
                  <FileText className="w-5 h-5 mr-2" />
                  PDF
                </Button>
                <Button variant="primary">
                  <Download className="w-5 h-5 mr-2" />
                  Excel
                </Button>
                <Button variant="accent">
                  <Mail className="w-5 h-5 mr-2" />
                  Отправить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
