'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface Decision {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  business: string;
  proposedBy: string;
  impact: string;
}

const initialDecisions: Decision[] = [
  {
    id: 1,
    title: 'Запуск рекламы в Instagram для irespect',
    description: 'Бюджет €2,000/мес. Ожидаемый ROI 250%',
    priority: 'high',
    business: 'irespect',
    proposedBy: 'Маркетинг Агент',
    impact: 'Увеличение трафика на 40%',
  },
  {
    id: 2,
    title: 'Нанять 2 разработчиков для AIRES',
    description: 'Зарплата: €4,000/мес каждый',
    priority: 'high',
    business: 'AIRES',
    proposedBy: 'HR Рекрутер',
    impact: 'Ускорение разработки в 2 раза',
  },
  {
    id: 3,
    title: 'Добавить AI-психолога в Ritual-Service24',
    description: 'Интеграция GPT-4 для консультаций',
    priority: 'medium',
    business: 'Ritual-Service24',
    proposedBy: 'Аналитик Данных',
    impact: 'Новый поток дохода €5К/мес',
  },
];

export default function DecisionCenter() {
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);

  const handleDecision = (id: number, action: 'approve' | 'reject' | 'defer') => {
    setDecisions((prev) => prev.filter((d) => d.id !== id));

    // Show notification (could be expanded with a toast library)
    console.log(`Decision ${id} ${action}ed`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-[#FF3B30]';
      case 'medium':
        return 'text-[#FF9500]';
      case 'low':
        return 'text-[#34C759]';
      default:
        return 'text-[#86868B]';
    }
  };

  if (decisions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
      >
        <div className="text-center">
          <CheckCircle size={48} className="text-[#34C759] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">
            Все решения приняты
          </h3>
          <p className="text-[#86868B] dark:text-[#98989D]">
            Новые предложения появятся, когда AI агенты выявят возможности
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
            Центр Решений
          </h3>
          <p className="text-sm text-[#86868B] dark:text-[#98989D]">
            {decisions.length} решений требуют вашего внимания
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#FF9500]/10 flex items-center justify-center">
          <AlertTriangle size={24} className="text-[#FF9500]" />
        </div>
      </div>

      <div className="space-y-4">
        {decisions.map((decision, index) => (
          <motion.div
            key={decision.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6 border-2 border-[#D2D2D7] dark:border-[#38383A] rounded-2xl hover:border-[#007AFF] transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold uppercase ${getPriorityColor(decision.priority)}`}>
                    {decision.priority === 'high' && '🔴 Высокий'}
                    {decision.priority === 'medium' && '🟡 Средний'}
                    {decision.priority === 'low' && '🟢 Низкий'}
                  </span>
                  <span className="text-xs text-[#86868B] dark:text-[#98989D]">
                    • {decision.business}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
                  {decision.title}
                </h4>
                <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-3">
                  {decision.description}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="flex items-center gap-4 mb-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[#86868B] dark:text-[#98989D]">Предложил:</span>
                <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">
                  {decision.proposedBy}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#86868B] dark:text-[#98989D]">Эффект:</span>
                <span className="text-[#34C759] font-medium">{decision.impact}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDecision(decision.id, 'approve')}
                className="flex-1 px-4 py-3 bg-[#34C759] hover:bg-[#28A745] text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                Одобрить
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDecision(decision.id, 'defer')}
                className="px-4 py-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] dark:hover:bg-[#3A3A3C] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Clock size={18} />
                Отложить
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDecision(decision.id, 'reject')}
                className="px-4 py-3 bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 text-[#FF3B30] rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <XCircle size={18} />
                Отклонить
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
