# Supabase Setup Guide

## Шаг 1: Создание Проекта

1. Откройте: https://supabase.com/dashboard
2. Нажмите "New Project"
3. Заполните:
   - **Name:** ai-business-ecosystem
   - **Database Password:** (сохраните!)
   - **Region:** Europe (Frankfurt) - ближе к вам
4. Нажмите "Create new project" (ждите ~2 минуты)

---

## Шаг 2: Получите Credentials

После создания проекта:

1. Перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL** (начинается с https://xxx.supabase.co)
   - **anon/public key** (длинный JWT токен)

---

## Шаг 3: Database Schema

Создайте таблицы для данных:

### SQL Editor (Dashboard → SQL Editor):

```sql
-- Businesses Table
CREATE TABLE businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  revenue_monthly DECIMAL(10, 2) DEFAULT 0,
  users_count INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('planning', 'launched', 'scaling')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Metrics Table (daily snapshots)
CREATE TABLE metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  revenue DECIMAL(10, 2) DEFAULT 0,
  users INTEGER DEFAULT 0,
  orders INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(business_id, date)
);

-- AI Agents Table
CREATE TABLE ai_agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'paused', 'error')),
  tasks_completed INTEGER DEFAULT 0,
  quality_score DECIMAL(3, 1) DEFAULT 0,
  last_run TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Decisions Table
CREATE TABLE decisions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  business_id UUID REFERENCES businesses(id),
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'deferred')),
  proposed_by TEXT,
  impact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Activity Feed Table
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_name TEXT NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security (RLS)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - adjust later)
CREATE POLICY "Allow all operations on businesses" ON businesses FOR ALL USING (true);
CREATE POLICY "Allow all operations on metrics" ON metrics FOR ALL USING (true);
CREATE POLICY "Allow all operations on ai_agents" ON ai_agents FOR ALL USING (true);
CREATE POLICY "Allow all operations on decisions" ON decisions FOR ALL USING (true);
CREATE POLICY "Allow all operations on activities" ON activities FOR ALL USING (true);
```

---

## Шаг 4: Seed Initial Data

```sql
-- Insert businesses
INSERT INTO businesses (name, description, revenue_monthly, users_count, status)
VALUES
  ('irespect', 'Маркетплейс услуг', 20000, 1247, 'launched'),
  ('Ritual-Service24', 'Похоронные услуги + AI психолог', 10000, 89, 'planning'),
  ('AIRES', 'Мобильный каталог могил', 1000, 312, 'planning');

-- Insert AI agents
INSERT INTO ai_agents (name, role, status, tasks_completed, quality_score, last_run)
VALUES
  ('Orchestrator', 'Главный координатор', 'active', 143, 9.2, NOW()),
  ('Market Intelligence', 'Аналитик рынков', 'active', 67, 8.9, NOW()),
  ('Development', 'Разработчик', 'active', 23, 9.0, NOW()),
  ('Marketing', 'Маркетолог', 'active', 8, 8.7, NOW()),
  ('Customer Support', 'Поддержка', 'active', 67, 9.5, NOW());

-- Insert sample metrics (last 7 days)
DO $$
DECLARE
  business_rec RECORD;
  day_offset INTEGER;
BEGIN
  FOR business_rec IN SELECT id FROM businesses LOOP
    FOR day_offset IN 0..6 LOOP
      INSERT INTO metrics (business_id, date, revenue, users, orders, conversion_rate)
      VALUES (
        business_rec.id,
        CURRENT_DATE - day_offset,
        (RANDOM() * 1000 + 500)::DECIMAL(10,2),
        (RANDOM() * 50 + 20)::INTEGER,
        (RANDOM() * 10 + 5)::INTEGER,
        (RANDOM() * 5 + 2)::DECIMAL(5,2)
      );
    END LOOP;
  END LOOP;
END $$;

-- Insert sample decisions
INSERT INTO decisions (title, description, business_id, priority, status, proposed_by, impact)
SELECT
  'Запуск рекламы в Instagram',
  'Бюджет €2,000/мес. Ожидаемый ROI 250%',
  id,
  'high',
  'pending',
  'Маркетинг Агент',
  'Увеличение трафика на 40%'
FROM businesses WHERE name = 'irespect';

-- Insert recent activities
INSERT INTO activities (agent_name, action, details)
VALUES
  ('Customer Support Agent', 'resolved ticket #1247', '{"ticket_id": 1247, "time": "2 minutes ago"}'::jsonb),
  ('Marketing Agent', 'posted to social media', '{"platforms": ["Twitter", "LinkedIn", "Facebook"], "time": "8 minutes ago"}'::jsonb),
  ('Development Agent', 'deployed rating system update', '{"version": "1.2.0", "time": "15 minutes ago"}'::jsonb);
```

---

## Шаг 5: Enable Realtime

1. Перейдите в **Database** → **Replication**
2. Включите realtime для таблиц:
   - ✅ metrics
   - ✅ activities
   - ✅ decisions
   - ✅ ai_agents

---

## Next Steps

После выполнения этих шагов:

1. Скопируйте **Project URL** и **anon key**
2. Добавьте в `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Установите Supabase client (я помогу)
4. Создадим API endpoints
5. Подключим к UI компонентам

---

**Готовы начать?** Создайте проект на Supabase и дайте знать! 🚀
