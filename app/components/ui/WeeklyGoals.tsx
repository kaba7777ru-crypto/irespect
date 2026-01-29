'use client';

import { motion } from 'framer-motion';
import { Target, CheckCircle, Circle } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  owner: 'Рудольф' | 'Женя' | 'Витя';
  progress: number;
  completed: boolean;
}

const goals: Goal[] = [
  {
    id: 1,
    title: 'Запустить рекламу для irespect',
    owner: 'Рудольф',
    progress: 75,
    completed: false,
  },
  {
    id: 2,
    title: 'Завершить MVP AIRES',
    owner: 'Витя',
    progress: 60,
    completed: false,
  },
  {
    id: 3,
    title: 'Провести 10 встреч с ритуальными службами',
    owner: 'Женя',
    progress: 100,
    completed: true,
  },
  {
    id: 4,
    title: 'Оптимизировать расходы на €2K',
    owner: 'Рудольф',
    progress: 45,
    completed: false,
  },
  {
    id: 5,
    title: 'Настроить аналитику для всех проектов',
    owner: 'Витя',
    progress: 80,
    completed: false,
  },
];

const getOwnerColor = (owner: string) => {
  switch (owner) {
    case 'Рудольф':
      return 'from-[#007AFF] to-[#0051D5]';
    case 'Женя':
      return 'from-[#34C759] to-[#28A745]';
    case 'Витя':
      return 'from-[#AF52DE] to-[#8E44AD]';
    default:
      return 'from-[#86868B] to-[#6E6E73]';
  }
};

const getOwnerInitial = (owner: string) => {
  return owner.charAt(0);
};

export default function WeeklyGoals() {
  const completedCount = goals.filter((g) => g.completed).length;
  const completionRate = Math.round((completedCount / goals.length) * 100);

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
            Цели недели
          </h3>
          <p className="text-sm text-[#86868B] dark:text-[#98989D]">
            {completedCount} из {goals.length} выполнено • {completionRate}%
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#34C759]/10 flex items-center justify-center">
          <Target size={24} className="text-[#34C759]" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#34C759] to-[#28A745] rounded-full"
          />
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`p-4 rounded-xl border ${
              goal.completed
                ? 'bg-[#34C759]/5 border-[#34C759]/30'
                : 'border-[#D2D2D7] dark:border-[#38383A]'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <div className="flex-shrink-0">
                {goal.completed ? (
                  <CheckCircle size={20} className="text-[#34C759]" />
                ) : (
                  <Circle size={20} className="text-[#86868B]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium mb-1 ${
                    goal.completed
                      ? 'text-[#86868B] dark:text-[#98989D] line-through'
                      : 'text-[#1D1D1F] dark:text-[#F5F5F7]'
                  }`}
                >
                  {goal.title}
                </p>
                {!goal.completed && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#007AFF] to-[#0051D5] rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#86868B] dark:text-[#98989D] font-medium">
                      {goal.progress}%
                    </span>
                  </div>
                )}
              </div>

              {/* Owner Avatar */}
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${getOwnerColor(
                  goal.owner
                )} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}
              >
                {getOwnerInitial(goal.owner)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}