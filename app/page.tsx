'use client';

import BusinessCard from './components/ui/BusinessCard';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target } from 'lucide-react';

const businesses = [
  {
    name: 'iRespect',
    description: 'Marketplace Services',
    icon: '💼',
    progress: 80,
    revenue: '$20,000/mo',
    status: 'launched' as const,
    href: '/business/irespect',
    gradient: 'bg-gradient-to-br from-[#007AFF] to-[#0051D5]',
  },
  {
    name: 'Ritual-Service24',
    description: 'Funeral Services + AI Psychologist',
    icon: '🕊️',
    progress: 45,
    revenue: '$10,000/mo',
    status: 'planning' as const,
    href: '/business/ritual',
    gradient: 'bg-gradient-to-br from-[#AF52DE] to-[#8E44AD]',
  },
  {
    name: 'Memorial App',
    description: 'Mobile Grave Catalog',
    icon: '📱',
    progress: 20,
    revenue: '$1,000/mo',
    status: 'planning' as const,
    href: '/business/memorial',
    gradient: 'bg-gradient-to-br from-[#34C759] to-[#28A745]',
  },
];

const stats = [
  { label: 'Total MRR', value: '$31,000', icon: TrendingUp, change: '+24%' },
  { label: 'Active Projects', value: '3', icon: Target, change: '100%' },
  { label: 'AI Agents', value: '10', icon: Sparkles, change: 'Active' },
];

export default function Home() {
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
          Welcome back, Viktor! 👋
        </h1>
        <p className="text-lg text-[#86868B] dark:text-[#98989D]">
          Here's an overview of your AI-powered business ecosystem
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

      {/* Business Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Your Businesses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {businesses.map((business, index) => (
            <motion.div
              key={business.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <BusinessCard {...business} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-[#007AFF] to-[#AF52DE] rounded-3xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-3">Ready to scale?</h3>
        <p className="text-white/90 mb-6">
          Your AI agents are working 24/7 to grow your businesses. Check the analytics or chat with Claude for insights.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-[#007AFF] rounded-xl font-semibold hover:bg-opacity-90 transition-all">
            View Analytics
          </button>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all">
            Talk to AI
          </button>
        </div>
      </motion.div>
    </div>
  );
}
