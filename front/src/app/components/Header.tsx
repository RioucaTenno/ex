import React from 'react';
import { Link, useLocation } from 'react-router';
import { Button } from './Button';
import { Monitor, Settings } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Monitor className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary">CyberZone</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Главная
            </Link>
            <Link 
              to="/tariffs" 
              className={`transition-colors ${isActive('/tariffs') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Тарифы
            </Link>
            <Link 
              to="/profile" 
              className={`transition-colors ${isActive('/profile') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Бронирование
            </Link>
            <a href="#contacts" className="text-muted-foreground hover:text-foreground transition-colors">
              Контакты
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" title="Админ-панель">
              <Button variant="secondary" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="secondary" size="md">Войти</Button>
            </Link>
            <Link to="/profile">
              <Button variant="accent" size="md">Регистрация</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}