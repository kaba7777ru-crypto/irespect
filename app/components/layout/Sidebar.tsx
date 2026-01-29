'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Cross, Smartphone, BarChart3, DollarSign, Bot, FileText, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Главная', href: '/', icon: Home },
  { name: 'irespect', href: '/business/irespect', icon: Briefcase },
  { name: 'Ritual-Service24', href: '/business/ritual', icon: Cross },
  { name: 'AIRES', href: '/business/memorial', icon: Smartphone },
];

const secondary = [
  { name: 'Аналитика', href: '/analytics', icon: BarChart3 },
  { name: 'Финансы', href: '/financials', icon: DollarSign },
  { name: 'AI Агенты', href: '/agents', icon: Bot },
  { name: 'Документы', href: '/documents', icon: FileText },
  { name: 'Настройки', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen w-[280px] bg-white dark:bg-[#1C1C1E] border-r border-[#D2D2D7] dark:border-[#38383A] flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-[#D2D2D7] dark:border-[#38383A]">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#007AFF] to-[#AF52DE] bg-clip-text text-transparent">
          AI Бизнес
        </h1>
        <p className="text-sm text-[#86868B] dark:text-[#98989D] mt-1">Дашборд экосистемы</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <div className="px-3">
          <div className="mb-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all
                      ${isActive
                        ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-500/30'
                        : 'text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E]'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-[#D2D2D7] dark:border-[#38383A] pt-6">
            {secondary.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all
                      ${isActive
                        ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-500/30'
                        : 'text-[#86868B] dark:text-[#98989D] hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#D2D2D7] dark:border-[#38383A]">
        <div className="px-2">
          <p className="text-xs text-[#86868B] dark:text-[#98989D] mb-3 font-medium">Основатели</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007AFF] to-[#0051D5] flex items-center justify-center text-white text-xs font-semibold">
              Р
            </div>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Рудольф</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#34C759] to-[#28A745] flex items-center justify-center text-white text-xs font-semibold">
              Ж
            </div>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Женя</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#AF52DE] to-[#8E44AD] flex items-center justify-center text-white text-xs font-semibold">
              В
            </div>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Витя</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
