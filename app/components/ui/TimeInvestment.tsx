'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeData {
  name: string;
  hours: number;
  color: string;
  business: string;
}

const timeData: TimeData[] = [
  { name: 'Рудольф', hours: 28, color: 'from-[#007AFF] to-[#0051D5]', business: 'irespect' },
  { name: 'Женя', hours: 24, color: 'from-[#34C759] to-[#28A745]', business: 'Ritual-Service24' },
  { name: 'Витя', hours: 32, color: 'from-[#AF52DE] to-[#8E44AD]', business: 'AIRES' },
];

export default function TimeInvestment() {
  const totalHours = timeData.reduce((sum, item) => sum + item.hours, 0);
  const avgHours = Math.round(totalHours / timeData.length);

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
            Время на неделе
          </h3>
          <p className="text-sm text-[#86868B] dark:text-[#98989D]">
            Инвестиции времени основателей
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#007AFF]/10 flex items-center justify-center">
          <Clock size={24} className="text-[#007AFF]" />
        </div>
      </div>

      {/* Time Bars */}
      <div className="space-y-6 mb-6">
        {timeData.map((person, index) => {
          const percentage = (person.hours / 40) * 100; // 40 hours = 100%
          return (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center text-white text-xs font-semibold`}>
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {person.name}
                    </p>
                    <p className="text-xs text-[#86868B] dark:text-[#98989D]">
                      {person.business}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {person.hours}ч
                </span>
              </div>
              <div className="h-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${person.color} rounded-full`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D2D2D7] dark:border-[#38383A]">
        <div>
          <p className="text-xs text-[#86868B] dark:text-[#98989D] mb-1">Всего часов</p>
          <p className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{totalHours}</p>
        </div>
        <div>
          <p className="text-xs text-[#86868B] dark:text-[#98989D] mb-1">В среднем</p>
          <p className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{avgHours}ч</p>
        </div>
      </div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 p-4 bg-[#34C759]/10 rounded-xl"
      >
        <p className="text-xs text-[#34C759] font-semibold">
          ✓ Отличная загруженность! Все основатели активно работают над проектами.
        </p>
      </motion.div>
    </motion.div>
  );
}
