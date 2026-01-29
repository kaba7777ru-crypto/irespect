'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export default function MetricCard({ label, value, change, icon: Icon, trend = 'neutral' }: MetricCardProps) {
  const trendColors = {
    up: 'text-[#34C759]',
    down: 'text-[#FF3B30]',
    neutral: 'text-[#86868B]',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
          <Icon size={24} className="text-[#007AFF]" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${trendColors[trend]}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-1">{label}</p>
      <p className="text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{value}</p>
    </motion.div>
  );
}
