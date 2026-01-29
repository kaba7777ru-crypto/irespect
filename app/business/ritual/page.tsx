'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, Heart, Phone, BookOpen, Shield } from 'lucide-react';
import MetricCard from '@/app/components/ui/MetricCard';

export default function RitualPage() {
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
          <div className="w-20 h-20 bg-gradient-to-br from-[#AF52DE] to-[#8E44AD] rounded-3xl flex items-center justify-center text-4xl shadow-lg">
            🕊️
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Ritual-Service24</h1>
            <p className="text-xl text-[#86868B] dark:text-[#98989D]">Funeral Services + AI Psychologist</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF9500] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Planning</span>
          </div>
        </div>
      </motion.div>

      {/* Projected Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Projected Revenue"
          value="$10,000"
          change="Month 3"
          icon={DollarSign}
          trend="neutral"
        />
        <MetricCard
          label="Target Users"
          value="500"
          change="First Quarter"
          icon={Users}
          trend="neutral"
        />
        <MetricCard
          label="AI Consultations"
          value="24/7"
          change="Automated"
          icon={Heart}
          trend="neutral"
        />
        <MetricCard
          label="Response Time"
          value="< 5min"
          change="Guaranteed"
          icon={Phone}
          trend="neutral"
        />
      </div>

      {/* Business Model */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Business Model</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#AF52DE]/10 flex items-center justify-center flex-shrink-0">
              <Shield size={24} className="text-[#AF52DE]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Full-Service Funeral Planning</h4>
              <p className="text-sm text-[#86868B] dark:text-[#98989D]">
                Complete funeral organization including documentation, ceremony planning, and coordination with all necessary services. Average ticket: $5,000-15,000.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
              <Heart size={24} className="text-[#007AFF]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">AI-Powered Grief Counseling</h4>
              <p className="text-sm text-[#86868B] dark:text-[#98989D]">
                24/7 empathetic AI psychologist support for grieving families. Subscription: $49/month or included with funeral services.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#34C759]/10 flex items-center justify-center flex-shrink-0">
              <BookOpen size={24} className="text-[#34C759]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Educational Resources</h4>
              <p className="text-sm text-[#86868B] dark:text-[#98989D]">
                Guides, checklists, and resources for end-of-life planning and bereavement support. Freemium model with premium content.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Competitive Advantages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Why We'll Win</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'AI-First Approach',
              description: 'First funeral service with integrated AI grief counseling - unique market position',
            },
            {
              title: '24/7 Availability',
              description: 'Immediate response during difficult times - when families need support most',
            },
            {
              title: 'Transparent Pricing',
              description: 'Clear, upfront costs with no hidden fees - building trust in sensitive moments',
            },
            {
              title: 'Regulatory Compliance',
              description: 'Fully licensed and compliant with all regional funeral service regulations',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="p-6 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl"
            >
              <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">{item.title}</h4>
              <p className="text-sm text-[#86868B] dark:text-[#98989D]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Launch Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-[#AF52DE] to-[#FF3B30] rounded-3xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-6">Launch Roadmap</h3>
        <div className="space-y-4">
          {[
            { phase: 'Week 1-2', task: 'Legal setup & licensing' },
            { phase: 'Week 3-4', task: 'Build MVP & AI counselor training' },
            { phase: 'Week 5-6', task: 'Partner with funeral homes & test services' },
            { phase: 'Week 7-8', task: 'Soft launch with first 10 customers' },
            { phase: 'Month 3', task: 'Full launch & marketing campaign' },
          ].map((item, index) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <div className="w-20 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-sm font-bold">{item.phase}</span>
              </div>
              <span className="flex-1">{item.task}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
