'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity as ActivityIcon, Clock, Loader2 } from 'lucide-react';
import { supabase, Activity, getRecentActivities, subscribeToActivities } from '@/app/lib/supabase';

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();

    // Real-time subscription
    const channel = subscribeToActivities((payload) => {
      console.log('New activity:', payload);
      if (payload.eventType === 'INSERT') {
        setActivities((prev) => [payload.new as Activity, ...prev].slice(0, 10));
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getRecentActivities(10);
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 1000 / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A]"
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#007AFF]" size={32} />
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
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
            <ActivityIcon size={24} className="text-[#007AFF]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">Recent Activity</h3>
            <p className="text-sm text-[#86868B] dark:text-[#98989D]">Real-time updates</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
          <span className="text-xs text-[#34C759] font-medium">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {activities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-[#86868B]"
            >
              No recent activity
            </motion.div>
          ) : (
            activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex gap-4 p-4 rounded-2xl hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                  <ActivityIcon size={20} className="text-[#007AFF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                    <strong className="font-semibold">{activity.agent_name}</strong>{' '}
                    {activity.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={12} className="text-[#86868B]" />
                    <p className="text-xs text-[#86868B] dark:text-[#98989D]">
                      {formatTime(activity.created_at)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
