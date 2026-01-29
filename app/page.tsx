'use client';

import { useEffect, useState } from 'react';
import BrandedBusinessCard from './components/BrandedBusinessCard';
import DecisionCenter from './components/ui/DecisionCenterReal';
import WeeklyGoals from './components/ui/WeeklyGoals';
import ActivityFeed from './components/ui/ActivityFeedReal';
import TimeInvestment from './components/ui/TimeInvestment';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target, Loader2 } from 'lucide-react';
import { Business, getBusinesses, getAIAgents } from './lib/supabase';
import { type BusinessId } from './styles/brand-colors';

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [agentCount, setAgentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [businessData, agentData] = await Promise.all([
        getBusinesses(),
        getAIAgents(),
      ]);
      setBusinesses(businessData);
      setAgentCount(agentData.filter(a => a.status === 'active').length);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = businesses.reduce((sum, b) => sum + b.users_count, 0);

  const stats = [
    {
      label: 'Активные проекты',
      value: String(businesses.length),
      icon: Target,
      change: '100%'
    },
    {
      label: 'AI агенты',
      value: String(agentCount),
      icon: Sparkles,
      change: 'Активно'
    },
    {
      label: 'Пользователи',
      value: String(totalUsers),
      icon: TrendingUp,
      change: '+15%'
    },
  ];
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
          С возвращением, Виктор! 👋
        </h1>
        <p className="text-lg text-[#86868B] dark:text-[#98989D]">
          Обзор вашей AI-управляемой бизнес экосистемы
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
                  <Icon size={24} className="text-[#007AFF]" />
                </div>
                <span className="text-sm font-medium text-[#34C759]">{stat.change}</span>
              </div>
              <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Decision Center */}
      <div className="mb-8">
        <DecisionCenter />
      </div>

      {/* Weekly Goals */}
      <div className="mb-8">
        <WeeklyGoals />
      </div>

      {/* Business Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Ваши бизнесы</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-[#007AFF]" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {businesses.map((business, index) => {
              // Преобразуем название бизнеса в BusinessId
              let businessId: BusinessId = 'irespect';
              if (business.name.toLowerCase().includes('ritual')) {
                businessId = 'ritual';
              } else if (business.name.toLowerCase().includes('aires')) {
                businessId = 'aires';
              }

              const growth = business.status === 'launched' ? 15 : business.status === 'planning' ? 0 : 5;

              return (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <BrandedBusinessCard
                    businessId={businessId}
                    revenue={business.revenue_monthly || 0}
                    users={business.users_count}
                    growth={growth}
                    status={business.status}
                    onClick={() => {
                      window.location.href = `/business/${businessId}`;
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Activity & Time Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ActivityFeed />
        <TimeInvestment />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-[#007AFF] to-[#AF52DE] rounded-3xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-3">Готовы масштабироваться?</h3>
        <p className="text-white/90 mb-6">
          Ваши AI агенты работают 24/7 для роста бизнеса. Изучайте аналитику или общайтесь с Claude для получения инсайтов.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-[#007AFF] rounded-xl font-semibold hover:bg-opacity-90 transition-all">
            Аналитика
          </button>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all">
            Общаться с AI
          </button>
        </div>
      </motion.div>
    </div>
  );
}
