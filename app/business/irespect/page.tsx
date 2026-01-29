'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Target, Calendar, Zap } from 'lucide-react';
import MetricCard from '@/app/components/ui/MetricCard';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Янв', revenue: 5000 },
  { month: 'Фев', revenue: 8000 },
  { month: 'Мар', revenue: 12000 },
  { month: 'Апр', revenue: 15000 },
  { month: 'Май', revenue: 18000 },
  { month: 'Июн', revenue: 20000 },
];

const userGrowthData = [
  { month: 'Янв', users: 50 },
  { month: 'Фев', users: 120 },
  { month: 'Мар', users: 250 },
  { month: 'Апр', users: 400 },
  { month: 'Май', users: 650 },
  { month: 'Июн', users: 1000 },
];

export default function IRespecPage() {
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
            💼
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">irespect</h1>
            <p className="text-xl text-[#86868B] dark:text-[#98989D]">Платформа маркетплейса услуг</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-3 h-3 bg-[#34C759] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Запущен</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Месячный доход"
          value="€20К"
          change="+15%"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          label="Активные пользователи"
          value="1,000"
          change="+54%"
          icon={Users}
          trend="up"
        />
        <MetricCard
          label="Темп роста"
          value="54%"
          change="м/м"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          label="Конверсия"
          value="12.5%"
          change="+2.3%"
          icon={Target}
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Рост доходов</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2D2D7" opacity={0.3} />
              <XAxis dataKey="month" stroke="#86868B" />
              <YAxis stroke="#86868B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#007AFF"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Рост пользователей</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2D2D7" opacity={0.3} />
              <XAxis dataKey="month" stroke="#86868B" />
              <YAxis stroke="#86868B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#34C759"
                strokeWidth={3}
                dot={{ fill: '#34C759', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Strategy Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Бизнес-стратегия</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
              <Target size={24} className="text-[#007AFF]" />
            </div>
            <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Текущий фокус</h4>
            <p className="text-sm text-[#86868B] dark:text-[#98989D]">
              Масштабирование привлечения пользователей через таргетированные маркетинговые кампании и партнерские программы
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#34C759]/10 flex items-center justify-center">
              <Calendar size={24} className="text-[#34C759]" />
            </div>
            <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Следующая цель</h4>
            <p className="text-sm text-[#86868B] dark:text-[#98989D]">
              Достичь €50К MRR к Q3 2026 через расширение категорий услуг и премиум-функций
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#AF52DE]/10 flex items-center justify-center">
              <Zap size={24} className="text-[#AF52DE]" />
            </div>
            <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Ключевые преимущества</h4>
            <p className="text-sm text-[#86868B] dark:text-[#98989D]">
              AI-подбор, автоматизированные операции и поддержка 24/7 через AI агентов
            </p>
          </div>
        </div>
      </motion.div>

      {/* Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-[#007AFF] to-[#AF52DE] rounded-3xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-6">Предстоящие функции</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Продвинутая верификация исполнителей',
            'Система внутренних сообщений',
            'Премиум подписка',
            'Запуск мобильного приложения (iOS и Android)',
            'AI-рекомендации услуг',
            'Интегрированная платежная система',
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <span className="text-white">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
