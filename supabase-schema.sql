-- AI Business Ecosystem Database Schema
-- Execute this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor

-- ============================================
-- TABLES
-- ============================================

-- Businesses Table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  revenue_monthly DECIMAL(10, 2) DEFAULT 0,
  users_count INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('planning', 'launched', 'scaling')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Metrics Table (daily snapshots)
CREATE TABLE IF NOT EXISTS metrics (
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
CREATE TABLE IF NOT EXISTS ai_agents (
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
CREATE TABLE IF NOT EXISTS decisions (
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
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_name TEXT NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for now - adjust for production)
CREATE POLICY "Allow all on businesses" ON businesses FOR ALL USING (true);
CREATE POLICY "Allow all on metrics" ON metrics FOR ALL USING (true);
CREATE POLICY "Allow all on ai_agents" ON ai_agents FOR ALL USING (true);
CREATE POLICY "Allow all on decisions" ON decisions FOR ALL USING (true);
CREATE POLICY "Allow all on activities" ON activities FOR ALL USING (true);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert businesses
INSERT INTO businesses (name, description, revenue_monthly, users_count, status)
VALUES
  ('irespect', 'Маркетплейс услуг', 20000, 1247, 'launched'),
  ('Ritual-Service24', 'Похоронные услуги + AI психолог', 10000, 89, 'planning'),
  ('AIRES', 'Мобильный каталог могил', 1000, 312, 'planning')
ON CONFLICT DO NOTHING;

-- Insert AI agents
INSERT INTO ai_agents (name, role, status, tasks_completed, quality_score, last_run)
VALUES
  ('Orchestrator', 'Главный координатор', 'active', 143, 9.2, NOW()),
  ('Market Intelligence', 'Аналитик рынков', 'active', 67, 8.9, NOW()),
  ('Development', 'Разработчик', 'active', 23, 9.0, NOW()),
  ('Marketing', 'Маркетолог', 'active', 8, 8.7, NOW()),
  ('Customer Support', 'Поддержка', 'active', 67, 9.5, NOW()),
  ('Product Strategy', 'Продуктовый стратег', 'active', 45, 8.8, NOW()),
  ('UX/UI Design', 'Дизайнер', 'active', 12, 9.1, NOW()),
  ('QA Testing', 'Тестирование', 'active', 89, 9.3, NOW()),
  ('DevOps', 'DevOps инженер', 'active', 34, 9.0, NOW()),
  ('Data Analyst', 'Аналитик данных', 'active', 56, 8.9, NOW())
ON CONFLICT DO NOTHING;

-- Insert sample metrics (last 7 days)
DO $$
DECLARE
  business_rec RECORD;
  day_offset INTEGER;
BEGIN
  FOR business_rec IN SELECT id, name FROM businesses LOOP
    FOR day_offset IN 0..6 LOOP
      INSERT INTO metrics (business_id, date, revenue, users, orders, conversion_rate)
      VALUES (
        business_rec.id,
        CURRENT_DATE - day_offset,
        CASE
          WHEN business_rec.name = 'irespect' THEN (RANDOM() * 800 + 600)::DECIMAL(10,2)
          WHEN business_rec.name = 'Ritual-Service24' THEN (RANDOM() * 500 + 300)::DECIMAL(10,2)
          ELSE (RANDOM() * 50 + 30)::DECIMAL(10,2)
        END,
        CASE
          WHEN business_rec.name = 'irespect' THEN (RANDOM() * 40 + 20)::INTEGER
          WHEN business_rec.name = 'Ritual-Service24' THEN (RANDOM() * 5 + 2)::INTEGER
          ELSE (RANDOM() * 10 + 5)::INTEGER
        END,
        CASE
          WHEN business_rec.name = 'irespect' THEN (RANDOM() * 8 + 5)::INTEGER
          WHEN business_rec.name = 'Ritual-Service24' THEN (RANDOM() * 2 + 1)::INTEGER
          ELSE (RANDOM() * 2 + 1)::INTEGER
        END,
        (RANDOM() * 5 + 2)::DECIMAL(5,2)
      )
      ON CONFLICT (business_id, date) DO NOTHING;
    END LOOP;
  END LOOP;
END $$;

-- Insert sample decisions
DO $$
DECLARE
  irespect_id UUID;
  ritual_id UUID;
  aires_id UUID;
BEGIN
  SELECT id INTO irespect_id FROM businesses WHERE name = 'irespect' LIMIT 1;
  SELECT id INTO ritual_id FROM businesses WHERE name = 'Ritual-Service24' LIMIT 1;
  SELECT id INTO aires_id FROM businesses WHERE name = 'AIRES' LIMIT 1;

  INSERT INTO decisions (title, description, business_id, priority, status, proposed_by, impact)
  VALUES
    ('Запуск рекламы в Instagram', 'Бюджет €2,000/мес. Ожидаемый ROI 250%', irespect_id, 'high', 'pending', 'Маркетинг Агент', 'Увеличение трафика на 40%'),
    ('Добавить AI-психолога', 'Интеграция Claude для консультаций', ritual_id, 'medium', 'pending', 'Product Strategy', 'Новый поток дохода €5К/мес'),
    ('Запуск iOS версии', 'Разработка нативного iOS приложения', aires_id, 'high', 'pending', 'Development Agent', 'Расширение аудитории на 60%')
  ON CONFLICT DO NOTHING;
END $$;

-- Insert recent activities
INSERT INTO activities (agent_name, action, details)
VALUES
  ('Customer Support Agent', 'resolved ticket #1247', '{"ticket_id": 1247, "resolution_time": "12 minutes"}'::jsonb),
  ('Marketing Agent', 'posted to social media', '{"platforms": ["Twitter", "LinkedIn", "Facebook"], "reach": 12500}'::jsonb),
  ('Development Agent', 'deployed rating system update', '{"version": "1.2.0", "changes": ["bug fixes", "new features"]}'::jsonb),
  ('Sales Agent', 'sent 15 partnership emails', '{"sent": 15, "opened": 7, "responses": 3}'::jsonb),
  ('QA Agent', 'completed testing', '{"tests_passed": 127, "tests_failed": 0, "coverage": "92%"}'::jsonb),
  ('DevOps Agent', 'optimized database queries', '{"improvement": "40% faster", "affected_queries": 23}'::jsonb)
ON CONFLICT DO NOTHING;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE '✅ Sample data inserted!';
  RAISE NOTICE '📊 Check your tables in Database → Tables';
END $$;
