'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, Eye, MousePointer, ShoppingCart, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, Cell, LabelList } from 'recharts';

const funnelData = [
  { name: 'Посетители сайта', value: 10000, fill: '#007AFF' },
  { name: 'Просмотр услуг', value: 6500, fill: '#0051D5' },
  { name: 'Добавлено в корзину', value: 3200, fill: '#34C759' },
  { name: 'Начало оформления', value: 1800, fill: '#FF9500' },
  { name: 'Завершили покупку', value: 1200, fill: '#AF52DE' },
];

const retentionData = [
  { week: 'Неделя 1', irespect: 100, ritual: 100, aires: 100 },
  { week: 'Неделя 2', irespect: 78, ritual: 82, aires: 75 },
  { week: 'Неделя 3', irespect: 65, ritual: 71, aires: 60 },
  { week: 'Неделя 4', irespect: 58, ritual: 65, aires: 52 },
  { week: 'Неделя 5', irespect: 54, ritual: 62, aires: 48 },
  { week: 'Неделя 6', irespect: 52, ritual: 60, aires: 45 },
];

const trafficSources = [
  { source: 'Органический поиск', visits: 4500, conversions: 450, color: '#34C759' },
  { source: 'Прямой трафик', visits: 2800, conversions: 380, color: '#007AFF' },
  { source: 'Социальные сети', visits: 2100, conversions: 180, color: '#AF52DE' },
  { source: 'Реклама', visits: 1600, conversions: 240, color: '#FF9500' },
  { source: 'Email рассылки', visits: 800, conversions: 120, color: '#FF3B30' },
];

const cohortData = [
  { month: 'Янв', m0: 100, m1: 75, m2: 65, m3: 58 },
  { month: 'Фев', m0: 100, m1: 78, m2: 68, m3: 0 },
  { month: 'Мар', m0: 100, m1: 80, m2: 0, m3: 0 },
  { month: 'Апр', m0: 100, m1: 0, m2: 0, m3: 0 },
];

const metrics = [
  { label: 'Всего пользователей', value: '45,234', change: '+12.3%', icon: Users },
  { label: 'Просмотры страниц', value: '128,456', change: '+8.7%', icon: Eye },
  { label: 'Средний CTR', value: '4.2%', change: '+0.8%', icon: MousePointer },
  { label: 'Коэффициент конверсии', value: '12%', change: '+2.1%', icon: ShoppingCart },
];

export default function AnalyticsPage() {
  const totalVisits = trafficSources.reduce((sum, item) => sum + item.visits, 0);

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
            📊
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Аналитика</h1>
            <p className="text-xl text-[#86868B] dark:text-[#98989D]">Глубокий анализ пользователей и конверсий</p>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
                  <Icon size={24} className="text-[#007AFF]" />
                </div>
                <span className="text-sm font-medium text-[#34C759]">{metric.change}</span>
              </div>
              <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Воронка конверсии</h3>
        <div className="space-y-4">
          {funnelData.map((stage, index) => {
            const percentage = index === 0 ? 100 : Math.round((stage.value / funnelData[0].value) * 100);
            const dropoff = index > 0 ? Math.round(((funnelData[index - 1].value - stage.value) / funnelData[index - 1].value) * 100) : 0;

            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {stage.name}
                  </span>
                  <div className="flex items-center gap-3">
                    {index > 0 && (
                      <span className="text-xs text-[#FF3B30]">-{dropoff}%</span>
                    )}
                    <span className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {stage.value.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                </div>
                <div className="h-12 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-xl overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                    className="h-full flex items-center px-4"
                    style={{ backgroundColor: stage.fill }}
                  >
                    <span className="text-white font-semibold text-sm">{percentage}%</span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-6 p-4 bg-[#34C759]/10 rounded-xl">
          <p className="text-sm font-semibold text-[#34C759]">
            ✓ Общая конверсия: 12% • Среднерыночная: 8% • На 50% выше целевого показателя
          </p>
        </div>
      </motion.div>

      {/* Retention & Traffic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Retention Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Retention Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
              <XAxis dataKey="week" stroke="#86868B" />
              <YAxis stroke="#86868B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1C1E',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#F5F5F7',
                }}
              />
              <Line type="monotone" dataKey="irespect" stroke="#007AFF" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="ritual" stroke="#AF52DE" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="aires" stroke="#34C759" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#007AFF]" />
              <span className="text-xs text-[#86868B] dark:text-[#98989D]">irespect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#AF52DE]" />
              <span className="text-xs text-[#86868B] dark:text-[#98989D]">Ritual-Service24</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#34C759]" />
              <span className="text-xs text-[#86868B] dark:text-[#98989D]">AIRES</span>
            </div>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Источники трафика</h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => {
              const percentage = Math.round((source.visits / totalVisits) * 100);
              const conversionRate = Math.round((source.conversions / source.visits) * 100);

              return (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {source.source}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#86868B] dark:text-[#98989D]">
                        CR: {conversionRate}%
                      </span>
                      <span className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {source.visits.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Cohort Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Когортный анализ</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D2D2D7] dark:border-[#38383A]">
                <th className="text-left p-3 text-sm font-semibold text-[#86868B] dark:text-[#98989D]">Месяц</th>
                <th className="text-center p-3 text-sm font-semibold text-[#86868B] dark:text-[#98989D]">M0</th>
                <th className="text-center p-3 text-sm font-semibold text-[#86868B] dark:text-[#98989D]">M+1</th>
                <th className="text-center p-3 text-sm font-semibold text-[#86868B] dark:text-[#98989D]">M+2</th>
                <th className="text-center p-3 text-sm font-semibold text-[#86868B] dark:text-[#98989D]">M+3</th>
              </tr>
            </thead>
            <tbody>
              {cohortData.map((cohort, index) => (
                <motion.tr
                  key={cohort.month}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="border-b border-[#D2D2D7] dark:border-[#38383A]"
                >
                  <td className="p-3 font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{cohort.month}</td>
                  <td className="p-3 text-center">
                    <div className="inline-block px-3 py-1 rounded-lg bg-[#34C759] text-white font-semibold">
                      {cohort.m0}%
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    {cohort.m1 > 0 && (
                      <div
                        className="inline-block px-3 py-1 rounded-lg text-white font-semibold"
                        style={{ backgroundColor: cohort.m1 > 70 ? '#34C759' : cohort.m1 > 60 ? '#FF9500' : '#FF3B30' }}
                      >
                        {cohort.m1}%
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {cohort.m2 > 0 && (
                      <div
                        className="inline-block px-3 py-1 rounded-lg text-white font-semibold"
                        style={{ backgroundColor: cohort.m2 > 60 ? '#34C759' : cohort.m2 > 50 ? '#FF9500' : '#FF3B30' }}
                      >
                        {cohort.m2}%
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {cohort.m3 > 0 && (
                      <div
                        className="inline-block px-3 py-1 rounded-lg text-white font-semibold"
                        style={{ backgroundColor: cohort.m3 > 50 ? '#34C759' : cohort.m3 > 40 ? '#FF9500' : '#FF3B30' }}
                      >
                        {cohort.m3}%
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-[#007AFF] to-[#AF52DE] rounded-3xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-3">Ключевые инсайты</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Лучший источник</p>
            <p className="text-2xl font-bold">Органический поиск</p>
            <p className="text-sm text-white/90 mt-1">10% конверсия</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">6-недельный Retention</p>
            <p className="text-2xl font-bold">52-60%</p>
            <p className="text-sm text-white/90 mt-1">Выше среднего на 15%</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Потенциал роста</p>
            <p className="text-2xl font-bold">+35%</p>
            <p className="text-sm text-white/90 mt-1">При оптимизации воронки</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
