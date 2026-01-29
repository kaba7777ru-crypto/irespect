# Supabase Integration Examples

## Пример 1: Загрузка Данных в Компоненте

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Business, getBusinesses } from '@/app/lib/supabase';

export default function BusinessList() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const data = await getBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error('Error loading businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {businesses.map((business) => (
        <div key={business.id}>
          <h3>{business.name}</h3>
          <p>Revenue: €{business.revenue_monthly}</p>
          <p>Users: {business.users_count}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Пример 2: Real-time Обновления

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Activity, getRecentActivities, subscribeToActivities } from '@/app/lib/supabase';

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Загрузить начальные данные
    loadActivities();

    // Подписаться на обновления
    const channel = subscribeToActivities((payload) => {
      console.log('New activity:', payload);
      if (payload.eventType === 'INSERT') {
        setActivities((prev) => [payload.new, ...prev].slice(0, 10));
      }
    });

    // Отписаться при unmount
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const loadActivities = async () => {
    const data = await getRecentActivities(10);
    setActivities(data);
  };

  return (
    <div className="space-y-4">
      <h2>Recent Activity</h2>
      {activities.map((activity) => (
        <div key={activity.id} className="p-4 border rounded">
          <p className="font-bold">{activity.agent_name}</p>
          <p>{activity.action}</p>
          <p className="text-sm text-gray-500">
            {new Date(activity.created_at).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
}
```

---

## Пример 3: Обновление Decisions

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Decision, getPendingDecisions } from '@/app/lib/supabase';

export default function DecisionCenter() {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    loadDecisions();
  }, []);

  const loadDecisions = async () => {
    const data = await getPendingDecisions();
    setDecisions(data);
  };

  const handleDecision = async (id: string, status: 'approved' | 'rejected' | 'deferred') => {
    try {
      const response = await fetch('/api/decisions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        // Удалить из списка
        setDecisions((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (error) {
      console.error('Error updating decision:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2>Pending Decisions</h2>
      {decisions.map((decision) => (
        <div key={decision.id} className="p-4 border rounded">
          <h3 className="font-bold">{decision.title}</h3>
          <p>{decision.description}</p>
          <p className="text-sm text-gray-500">Proposed by: {decision.proposed_by}</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleDecision(decision.id, 'approved')}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleDecision(decision.id, 'deferred')}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Defer
            </button>
            <button
              onClick={() => handleDecision(decision.id, 'rejected')}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Пример 4: Обновление ActivityFeed с Real-time

Обновите ваш существующий `ActivityFeed.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity as ActivityIcon, Clock } from 'lucide-react';
import { Activity, getRecentActivities, subscribeToActivities } from '@/app/lib/supabase';

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();

    // Real-time subscription
    const channel = subscribeToActivities((payload) => {
      if (payload.eventType === 'INSERT') {
        setActivities((prev) => [payload.new, ...prev].slice(0, 10));
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getRecentActivities(10);
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
          <ActivityIcon size={20} className="text-[#007AFF]" />
        </div>
        <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
          Recent Activity
        </h3>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex gap-3 pb-4 border-b border-[#D2D2D7] dark:border-[#38383A] last:border-0"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <strong>{activity.agent_name}</strong> {activity.action}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={12} className="text-[#86868B]" />
                  <p className="text-xs text-[#86868B]">
                    {formatTime(activity.created_at)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

## Установка Dependencies

```bash
npm install @supabase/supabase-js
```

---

## Тестирование

После настройки Supabase и добавления credentials в `.env.local`:

1. Перезапустите dev server
2. Откройте http://localhost:3000
3. Компоненты будут загружать реальные данные
4. Real-time обновления будут работать автоматически

---

## Troubleshooting

### Ошибка: "supabaseUrl is required"
- Убедитесь, что `NEXT_PUBLIC_SUPABASE_URL` добавлен в `.env.local`
- Перезапустите dev server

### Ошибка: "Row Level Security"
- Убедитесь, что RLS policies созданы (см. SUPABASE_SETUP.md)

### Real-time не работает
- Проверьте, что Replication включена для таблицы в Supabase Dashboard
- Проверьте консоль браузера на ошибки подключения
