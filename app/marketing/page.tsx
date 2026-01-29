'use client';

import { motion } from 'framer-motion';
import AIMarketingPanel from '../components/ui/AIMarketingPanel';
import { TrendingUp, Users, Eye, Heart } from 'lucide-react';

export default function MarketingPage() {
  const stats = [
    {
      label: 'Постов сгенерировано',
      value: '127',
      icon: TrendingUp,
      change: '+18 за неделю'
    },
    {
      label: 'Охват',
      value: '45.2K',
      icon: Eye,
      change: '+12%'
    },
    {
      label: 'Вовлеченность',
      value: '8.4%',
      icon: Heart,
      change: '+2.1%'
    },
    {
      label: 'Новых подписчиков',
      value: '1,234',
      icon: Users,
      change: '+156 за неделю'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">
          AI Маркетинг 🚀
        </h1>
        <p className="text-lg text-[#86868B] dark:text-[#98989D]">
          Автоматическая генерация и публикация контента для всех бизнесов
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
                  <Icon size={20} className="text-[#007AFF]" />
                </div>
              </div>
              <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-[#34C759] font-medium">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Generator */}
        <AIMarketingPanel />

        {/* Content Calendar Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A]"
        >
          <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">
            Запланированные посты
          </h3>

          <div className="space-y-4">
            {[
              { day: 'Сегодня', time: '18:00', platform: 'Instagram', business: 'irespect' },
              { day: 'Завтра', time: '12:00', platform: 'Facebook', business: 'Ritual-Service24' },
              { day: 'Пт, 31 янв', time: '15:00', platform: 'LinkedIn', business: 'AIRES' },
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] dark:hover:bg-[#3C3C3E] transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#AF52DE] flex items-center justify-center text-white font-bold">
                  {post.platform[0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {post.platform} • {post.business}
                  </p>
                  <p className="text-sm text-[#86868B]">
                    {post.day} в {post.time}
                  </p>
                </div>
                <button className="px-4 py-2 bg-[#007AFF] text-white rounded-xl text-sm font-semibold hover:bg-[#0066CC] transition-all">
                  Изменить
                </button>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-6 px-6 py-3 border-2 border-dashed border-[#D2D2D7] dark:border-[#38383A] rounded-xl text-[#86868B] hover:border-[#007AFF] hover:text-[#007AFF] transition-all font-medium">
            + Добавить новый пост
          </button>
        </motion.div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-[#AF52DE]/10 to-[#007AFF]/10 rounded-3xl p-6 border border-[#AF52DE]/20"
      >
        <h4 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
          💡 Советы по контент-маркетингу
        </h4>
        <ul className="space-y-2 text-[#86868B] dark:text-[#98989D]">
          <li>• Публикуйте регулярно: 3-5 постов в неделю для максимального охвата</li>
          <li>• Используйте эмоциональные истории для лучшего вовлечения</li>
          <li>• Экспериментируйте с разными форматами: текст, видео, карусели</li>
          <li>• Отвечайте на комментарии в течение первых 2 часов после публикации</li>
        </ul>
      </motion.div>
    </div>
  );
}
