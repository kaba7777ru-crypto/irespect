'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface BusinessCardProps {
  name: string;
  description: string;
  icon: string;
  progress: number;
  revenue: string;
  status: 'planning' | 'launched' | 'scaling';
  href: string;
  gradient: string;
}

const statusConfig = {
  planning: { color: 'bg-orange-500', text: 'В планах' },
  launched: { color: 'bg-green-500', text: 'Запущен' },
  scaling: { color: 'bg-blue-500', text: 'Масштабирование' },
};

export default function BusinessCard({
  name,
  description,
  icon,
  progress,
  revenue,
  status,
  href,
  gradient,
}: BusinessCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#1C1C1E] p-8 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border border-[#D2D2D7] dark:border-[#38383A]"
      >
        {/* Gradient Background */}
        <div className={`absolute top-0 right-0 w-48 h-48 ${gradient} opacity-10 rounded-full blur-3xl`} />

        {/* Header */}
        <div className="relative flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center text-3xl shadow-lg`}>
              {icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{name}</h3>
              <p className="text-sm text-[#86868B] dark:text-[#98989D] mt-1">{description}</p>
            </div>
          </div>
          <motion.div
            whileHover={{ x: 4 }}
            className="text-[#007AFF]"
          >
            <ArrowRight size={24} />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#86868B] dark:text-[#98989D]">Прогресс</span>
            <span className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{progress}%</span>
          </div>
          <div className="h-2 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className={`h-full ${gradient}`}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-1">Доход</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{revenue}</p>
              <TrendingUp size={16} className="text-[#34C759]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${statusInfo.color} rounded-full animate-pulse`} />
            <span className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{statusInfo.text}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
