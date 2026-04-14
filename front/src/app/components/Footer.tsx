import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>г. Москва, ул. Геймерская, д. 1</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@cyberzone.ru</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Часы работы</h3>
            <p className="text-primary-foreground/80">Круглосуточно, 24/7</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Социальные сети</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">ВКонтакте</a>
              <a href="#" className="hover:text-accent transition-colors">Telegram</a>
              <a href="#" className="hover:text-accent transition-colors">Discord</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60">© 2026 CyberZone. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Оферта</a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
