'use client';

import { motion } from 'framer-motion';
import { Bot, CheckCircle, Clock, Zap, TrendingUp, Users, FileText, MessageSquare, Search, Database, Code, BarChart3 } from 'lucide-react';

const agents = [
  {
    id: 1,
    name: 'Маркетинг Агент',
    description: 'Управление рекламой и контентом',
    status: 'active',
    icon: TrendingUp,
    color: 'from-[#007AFF] to-[#0051D5]',
    tasksCompleted: 47,
    lastActive: '2 мин назад',
    currentTask: 'Анализ конкурентов irespect',
  },
  {
    id: 2,
    name: 'SEO Оптимизатор',
    description: 'Поисковая оптимизация сайтов',
    status: 'active',
    icon: Search,
    color: 'from-[#34C759] to-[#28A745]',
    tasksCompleted: 89,
    lastActive: '5 мин назад',
    currentTask: 'Аудит ключевых слов',
  },
  {
    id: 3,
    name: 'Контент Генератор',
    description: 'Создание статей и постов',
    status: 'active',
    icon: FileText,
    color: 'from-[#AF52DE] to-[#8E44AD]',
    tasksCompleted: 134,
    lastActive: '1 мин назад',
    currentTask: 'Написание блог-поста для ritual',
  },
  {
    id: 4,
    name: 'Аналитик Данных',
    description: 'Анализ метрик и KPI',
    status: 'active',
    icon: BarChart3,
    color: 'from-[#FF9500] to-[#FF6B00]',
    tasksCompleted: 56,
    lastActive: '10 мин назад',
    currentTask: 'Отчет по конверсиям',
  },
  {
    id: 5,
    name: 'Клиентская Поддержка',
    description: 'Автоответы и консультации',
    status: 'active',
    icon: MessageSquare,
    color: 'from-[#007AFF] to-[#0051D5]',
    tasksCompleted: 312,
    lastActive: 'Только что',
    currentTask: 'Обработка 3 запросов',
  },
  {
    id: 6,
    name: 'Разработчик',
    description: 'Код-ревью и оптимизация',
    status: 'idle',
    icon: Code,
    color: 'from-[#5856D6] to-[#3634A3]',
    tasksCompleted: 23,
    lastActive: '2 часа назад',
    currentTask: 'Ожидает задач',
  },
  {
    id: 7,
    name: 'Финансовый Агент',
    description: 'Прогнозы и бюджетирование',
    status: 'active',
    icon: TrendingUp,
    color: 'from-[#34C759] to-[#28A745]',
    tasksCompleted: 67,
    lastActive: '15 мин назад',
    currentTask: 'Прогноз выручки на Q2',
  },
  {
    id: 8,
    name: 'HR Рекрутер',
    description: 'Поиск и отбор кандидатов',
    status: 'idle',
    icon: Users,
    color: 'from-[#FF3B30] to-[#D62828]',
    tasksCompleted: 12,
    lastActive: '1 день назад',
    currentTask: 'Ожидает вакансий',
  },
  {
    id: 9,
    name: 'База Знаний',
    description: 'Индексация документов',
    status: 'active',
    icon: Database,
    color: 'from-[#FF9500] to-[#FF6B00]',
    tasksCompleted: 234,
    lastActive: '3 мин назад',
    currentTask: 'Синхронизация 45 документов',
  },
  {
    id: 10,
    name: 'Оркестратор',
    description: 'Координация всех агентов',
    status: 'active',
    icon: Zap,
    color: 'from-[#AF52DE] to-[#8E44AD]',
    tasksCompleted: 456,
    lastActive: 'Только что',
    currentTask: 'Мониторинг системы',
  },
];

export default function AgentsPage() {
  const activeAgents = agents.filter((a) => a.status === 'active').length;
  const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#007AFF] to-[#0051D5] rounded-3xl flex items-center justify-center text-4xl shadow-lg">
            🤖
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">AI Агенты</h1>
            <p className="text-xl text-[#86868B] dark:text-[#98989D]">
              {activeAgents} из {agents.length} агентов активны
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-[#34C759]" size={24} />
            <span className="text-sm text-[#86868B] dark:text-[#98989D]">Всего задач</span>
          </div>
          <p className="text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{totalTasks}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="text-[#FF9500]" size={24} />
            <span className="text-sm text-[#86868B] dark:text-[#98989D]">Активные агенты</span>
          </div>
          <p className="text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{activeAgents}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-[#007AFF]" size={24} />
            <span className="text-sm text-[#86868B] dark:text-[#98989D]">Время безотказной работы</span>
          </div>
          <p className="text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">99.8%</p>
        </motion.div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
              className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={28} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {agent.name}
                    </h3>
                    {agent.status === 'active' ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-[#34C759]">Активен</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#86868B] rounded-full" />
                        <span className="text-xs font-medium text-[#86868B]">Простаивает</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-3">
                    {agent.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#86868B] dark:text-[#98989D]">Текущая задача:</span>
                      <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">
                        {agent.currentTask}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#86868B] dark:text-[#98989D]">Выполнено задач:</span>
                      <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">
                        {agent.tasksCompleted}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#86868B] dark:text-[#98989D]">Последняя активность:</span>
                      <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">
                        {agent.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-8 bg-gradient-to-r from-[#007AFF] to-[#AF52DE] rounded-3xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Все системы работают</h3>
            <p className="text-white/90">
              Агенты обрабатывают задачи в режиме реального времени. Следующая синхронизация через 5 минут.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#34C759] rounded-full animate-pulse" />
            <span className="font-semibold">Онлайн</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
