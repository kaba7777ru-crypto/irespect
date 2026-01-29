'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Янв', irespect: 18000, ritual: 0, aires: 0 },
  { month: 'Фев', irespect: 19500, ritual: 0, aires: 0 },
  { month: 'Мар', irespect: 20000, ritual: 2000, aires: 0 },
  { month: 'Апр', irespect: 21000, ritual: 4000, aires: 100 },
  { month: 'Май', irespect: 22500, ritual: 6000, aires: 300 },
  { month: 'Июн', irespect: 24000, ritual: 10000, aires: 1000 },
];

const expensesData = [
  { category: 'Разработка', amount: 12000, color: '#007AFF' },
  { category: 'Маркетинг', amount: 8000, color: '#34C759' },
  { category: 'Операционные', amount: 4000, color: '#FF9500' },
  { category: 'AI агенты', amount: 2000, color: '#AF52DE' },
  { category: 'Прочее', amount: 3000, color: '#FF3B30' },
];

const profitData = [
  { month: 'Янв', profit: 5000 },
  { month: 'Фев', profit: 6500 },
  { month: 'Мар', profit: 8000 },
  { month: 'Апр', profit: 10000 },
  { month: 'Май', profit: 13800 },
  { month: 'Июн', profit: 18000 },
];

const metrics = [
  {
    label: 'Доход за месяц',
    value: '€35,000',
    change: '+13.2%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Расходы за месяц',
    value: '€17,000',
    change: '+5.1%',
    trend: 'up',
    icon: TrendingDown,
  },
  {
    label: 'Прибыль',
    value: '€18,000',
    change: '+28.4%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Маржа',
    value: '51.4%',
    change: '+6.2%',
    trend: 'up',
    icon: PieChart,
  },
];

export default function FinancialsPage() {
  const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);

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
          <div className="w-20 h-20 bg-gradient-to-br from-[#34C759] to-[#28A745] rounded-3xl flex items-center justify-center text-4xl shadow-lg">
            💰
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Финансы</h1>
            <p className="text-xl text-[#86868B] dark:text-[#98989D]">Финансовые показатели экосистемы</p>
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
                <div className="w-12 h-12 rounded-xl bg-[#34C759]/10 flex items-center justify-center">
                  <Icon size={24} className="text-[#34C759]" />
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' ? (
                    <ArrowUpRight size={16} className="text-[#34C759]" />
                  ) : (
                    <ArrowDownRight size={16} className="text-[#FF3B30]" />
                  )}
                  <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Доходы по проектам</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorIrespect" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRitual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#AF52DE" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#AF52DE" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAires" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34C759" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34C759" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
            <XAxis dataKey="month" stroke="#86868B" />
            <YAxis stroke="#86868B" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1C1C1E',
                border: 'none',
                borderRadius: '12px',
                color: '#F5F5F7',
              }}
            />
            <Area type="monotone" dataKey="irespect" stroke="#007AFF" fillOpacity={1} fill="url(#colorIrespect)" strokeWidth={2} />
            <Area type="monotone" dataKey="ritual" stroke="#AF52DE" fillOpacity={1} fill="url(#colorRitual)" strokeWidth={2} />
            <Area type="monotone" dataKey="aires" stroke="#34C759" fillOpacity={1} fill="url(#colorAires)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#007AFF]" />
            <span className="text-sm text-[#86868B] dark:text-[#98989D]">irespect</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#AF52DE]" />
            <span className="text-sm text-[#86868B] dark:text-[#98989D]">Ritual-Service24</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#34C759]" />
            <span className="text-sm text-[#86868B] dark:text-[#98989D]">AIRES</span>
          </div>
        </div>
      </motion.div>

      {/* Profit & Expenses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Profit Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Чистая прибыль</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
              <XAxis dataKey="month" stroke="#86868B" />
              <YAxis stroke="#86868B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1C1E',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#F5F5F7',
                }}
              />
              <Bar dataKey="profit" fill="#34C759" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expenses Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
        >
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Структура расходов</h3>
          <div className="space-y-4">
            {expensesData.map((expense, index) => {
              const percentage = Math.round((expense.amount / totalExpenses) * 100);
              return (
                <div key={expense.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {expense.category}
                    </span>
                    <span className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      €{expense.amount.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: expense.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-6 border-t border-[#D2D2D7] dark:border-[#38383A]">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">Итого</span>
              <span className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                €{totalExpenses.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cash Flow Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-[#34C759] to-[#007AFF] rounded-3xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-3">Прогноз денежного потока</h3>
        <p className="text-white/90 mb-6">
          На основе текущих трендов прогнозируется выручка €50К/мес к концу года с маржой 55%
        </p>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Q3 2026</p>
            <p className="text-3xl font-bold">€42К</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Q4 2026</p>
            <p className="text-3xl font-bold">€50К</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Годовая выручка</p>
            <p className="text-3xl font-bold">€420К</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
