'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, MapPin, Camera, Star, Smartphone } from 'lucide-react';
import MetricCard from '@/app/components/ui/MetricCard';

export default function MemorialPage() {
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
          <div className="w-20 h-20 bg-gradient-to-br from-[#34C759] to-[#28A745] rounded-3xl flex items-center justify-center text-4xl shadow-lg">
            📱
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">AIRES</h1>
            <p className="text-xl text-[#86868B] dark:text-[#98989D]">Мобильный каталог могил и мемориалов</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF9500] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">В планах</span>
          </div>
        </div>
      </motion.div>

      {/* Projected Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Целевые загрузки"
          value="2,000"
          change="Первый квартал"
          icon={Smartphone}
          trend="neutral"
        />
        <MetricCard
          label="Прогноз дохода"
          value="€1,000"
          change="Месяц 6"
          icon={DollarSign}
          trend="neutral"
        />
        <MetricCard
          label="Записей могил"
          value="10,000+"
          change="Target"
          icon={MapPin}
          trend="neutral"
        />
        <MetricCard
          label="User Rating"
          value="4.8+"
          change="Target"
          icon={Star}
          trend="neutral"
        />
      </div>

      {/* App Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: MapPin,
              title: 'GPS Navigation',
              description: 'Find graves easily with precise GPS coordinates and turn-by-turn directions',
              color: 'bg-[#007AFF]/10 text-[#007AFF]',
            },
            {
              icon: Camera,
              title: 'Photo Gallery',
              description: 'Upload and share photos, create lasting digital memorials for loved ones',
              color: 'bg-[#AF52DE]/10 text-[#AF52DE]',
            },
            {
              icon: Users,
              title: 'Family Trees',
              description: 'Connect graves, build family history, and preserve genealogy for generations',
              color: 'bg-[#34C759]/10 text-[#34C759]',
            },
            {
              icon: Star,
              title: 'QR Codes',
              description: 'Place QR codes on graves linking to digital memorials and life stories',
              color: 'bg-[#FF9500]/10 text-[#FF9500]',
            },
            {
              icon: MapPin,
              title: 'Cemetery Maps',
              description: 'Interactive cemetery maps with search and filtering capabilities',
              color: 'bg-[#FF3B30]/10 text-[#FF3B30]',
            },
            {
              icon: Smartphone,
              title: 'Notifications',
              description: 'Remember important dates, anniversaries, and memorial events',
              color: 'bg-[#34C759]/10 text-[#34C759]',
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="p-6 border border-[#D2D2D7] dark:border-[#38383A] rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">{feature.title}</h4>
                <p className="text-sm text-[#86868B] dark:text-[#98989D]">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Monetization Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">Revenue Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-[#34C759]/10 to-transparent rounded-2xl border-2 border-[#34C759]">
            <div className="text-3xl font-bold text-[#34C759] mb-2">Free</div>
            <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">Basic</h4>
            <ul className="space-y-2 text-sm text-[#86868B] dark:text-[#98989D]">
              <li>• Search graves</li>
              <li>• GPS navigation</li>
              <li>• View memorials</li>
              <li>• Basic photo uploads (5)</li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#007AFF]/10 to-transparent rounded-2xl border-2 border-[#007AFF]">
            <div className="text-3xl font-bold text-[#007AFF] mb-2">$2.99</div>
            <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">Premium</h4>
            <ul className="space-y-2 text-sm text-[#86868B] dark:text-[#98989D]">
              <li>• Unlimited photos</li>
              <li>• Family tree builder</li>
              <li>• QR code generation</li>
              <li>• Ad-free experience</li>
              <li>• Priority support</li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#AF52DE]/10 to-transparent rounded-2xl border-2 border-[#AF52DE]">
            <div className="text-3xl font-bold text-[#AF52DE] mb-2">$9.99</div>
            <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">Family</h4>
            <ul className="space-y-2 text-sm text-[#86868B] dark:text-[#98989D]">
              <li>• Up to 5 users</li>
              <li>• Advanced genealogy</li>
              <li>• Video memories</li>
              <li>• Custom QR plaques</li>
              <li>• Life story templates</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Development Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-[#34C759] to-[#007AFF] rounded-3xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-6">Development Roadmap</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { milestone: 'MVP Design & Wireframes', timeline: 'Week 1-2' },
            { milestone: 'Core Features Development', timeline: 'Week 3-6' },
            { milestone: 'Database & Backend Setup', timeline: 'Week 7-8' },
            { milestone: 'Beta Testing (TestFlight)', timeline: 'Week 9-10' },
            { milestone: 'App Store Submission', timeline: 'Week 11' },
            { milestone: 'Public Launch (iOS)', timeline: 'Week 12' },
            { milestone: 'Android Development', timeline: 'Month 4-5' },
            { milestone: 'Cross-Platform Release', timeline: 'Month 6' },
          ].map((item, index) => (
            <motion.div
              key={item.milestone}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <span className="flex-1 pr-4">{item.milestone}</span>
              <div className="px-3 py-1 bg-white/20 rounded-lg text-sm font-semibold whitespace-nowrap">
                {item.timeline}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
