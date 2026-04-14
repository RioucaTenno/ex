# ClubFlow - Computer Club Management System

## Full-Stack Application with Django + React

### 📋 Project Structure

```
ex/
├── front/                    # React Frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── config/                   # Django configuration
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── users/                    # Users app
├── computers/                # Computers app
├── bookings/                 # Bookings app
├── reports/                  # Reports app
├── billing/                  # Billing app
├── notifications/            # Notifications app
│
├── manage.py
└── requirements.txt

```

### 🚀 Getting Started

#### Backend Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure PostgreSQL in config/settings.py

3. Run migrations:
```bash
python manage.py migrate
```

4. Start server:
```bash
python manage.py runserver
```

#### Frontend Setup

1. Navigate to front directory:
```bash
cd front
```

2. Install dependencies:
```bash
npm install
```

3. Start dev server:
```bash
npm run dev
```

### 📡 API Endpoints

- Users: /api/users/
- Computers: /api/computers/
- Bookings: /api/bookings/
- Sessions: /api/sessions/
- Reports: /api/reports/

### 🛠️ Technology Stack

Backend: Django, Django REST Framework, PostgreSQL
Frontend: React, TypeScript, Vite, Tailwind CSS