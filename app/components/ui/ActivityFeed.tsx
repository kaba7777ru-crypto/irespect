'use client';

import { motion } from 'framer-motion';
import { Activity, CheckCircle, MessageSquare, TrendingUp, FileText, Users, Zap } from 'lucide-react';

interface ActivityItem {
  id: number;
  agent: string;
  action: string;
  timestamp: string;
  icon: any;
  color: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    agent: 'Клиентская Поддержка',
    action: 'Обработала 3 новых запроса от пользователей irespect',
    timestamp: '2 мин назад',
    icon: MessageSquare,
    color: 'text-[#007AFF] bg-[#007AFF]/10',
  },
  {
    id: 2,
    agent: 'Маркетинг Агент',
    action: 'Завершил анализ конкурентов. Отчёт готов',
    timestamp: '5 мин назад',
    icon: TrendingUp,
    color: 'text-[#34C759] bg-[#34C759]/10',
  },
  {
    id: 3,
    agent: 'Контент Генератор',
    action: 'Создал 2 новые статьи для блога Ritual-Service24',
    timestamp: '12 мин назад',
    icon: FileText,
    color: 'text-[#AF52DE] bg-[#AF52DE]/10',
  },
  {
    id: 4,
    agent: 'SEO Оптимизатор',
    action: 'Обновил метатеги для 15 страниц сайта',
    timestamp: '18 мин назад',
    icon: CheckCircle,
    color: 'text-[#34C759] bg-[#34C759]/10',
  },
  {
    id: 5,
    agent: 'Аналитик Данных',
    action: 'Сформировал еженедельный отчёт по всем проектам',
    timestamp: '25 мин назад',
    icon: TrendingUp,
    color: 'text-[#FF9500] bg-[#FF9500]/10',
  },
  {
    id: 6,
    agent: 'HR Рекрутер',
    action: 'Нашёл 5 кандидатов на позицию разработчика',
    timestamp: '34 мин назад',
    icon: Users,
    color: 'text-[#FF3B30] bg-[#FF3B30]/10',
  },
  {
    id: 7,
    agent: 'База Знаний',
    action: 'Синхронизировала 45 документов с облаком',
    timestamp: '1 час назад',
    icon: Zap,
    color: 'text-[#FF9500] bg-[#FF9500]/10',
  },
];

export default function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
            Активность в реальном времени
          </h3>
          <p className="text-sm text-[#86868B] dark:text-[#98989D]">
            Последние действия AI агентов
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#34C759]/10 flex items-center justify-center">
          <Activity size={24} className="text-[#34C759]" />
          <div className="absolute w-3 h-3 bg-[#34C759] rounded-full animate-ping" />
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#007AFF] mb-1">
                  {activity.agent}
                </p>
                <p className="text-sm text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
                  {activity.action}
                </p>
                <p className="text-xs text-[#86868B] dark:text-[#98989D]">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#D2D2D7] dark:border-[#38383A]">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#86868B] dark:text-[#98989D]">
            Всего событий за сегодня
          </span>
          <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
            247
          </span>
        </div>
      </div>
    </motion.div>
  );
}
