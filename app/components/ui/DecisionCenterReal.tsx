'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { Decision, getPendingDecisions, updateDecisionStatus, subscribeToDecisions } from '@/app/lib/supabase';

export default function DecisionCenter() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadDecisions();

    // Real-time subscription
    const channel = subscribeToDecisions((payload) => {
      console.log('Decision updated:', payload);
      if (payload.eventType === 'UPDATE') {
        const updated = payload.new as Decision;
        if (updated.status !== 'pending') {
          setDecisions((prev) => prev.filter((d) => d.id !== updated.id));
        }
      } else if (payload.eventType === 'INSERT') {
        setDecisions((prev) => [payload.new as Decision, ...prev]);
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const loadDecisions = async () => {
    try {
      const data = await getPendingDecisions();
      setDecisions(data);
    } catch (error) {
      console.error('Error loading decisions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id: string, status: 'approved' | 'rejected' | 'deferred') => {
    setUpdating(id);
    try {
      await updateDecisionStatus(id, status);
      // Optimistic UI update
      setDecisions((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error('Error updating decision:', error);
      alert('Failed to update decision. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-[#FF3B30] bg-[#FF3B30]/10';
      case 'medium':
        return 'text-[#FF9500] bg-[#FF9500]/10';
      case 'low':
        return 'text-[#34C759] bg-[#34C759]/10';
      default:
        return 'text-[#86868B] bg-[#86868B]/10';
    }
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
          <div className="w-12 h-12 rounded-xl bg-[#FF9500]/10 flex items-center justify-center">
            <AlertTriangle size={24} className="text-[#FF9500]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">Decision Center</h3>
            <p className="text-sm text-[#86868B] dark:text-[#98989D]">
              {decisions.length} decisions need your attention
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {decisions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-[#86868B]"
            >
              <CheckCircle size={48} className="mx-auto mb-4 text-[#34C759]" />
              <p className="text-lg font-medium">All caught up!</p>
              <p className="text-sm">No pending decisions at the moment.</p>
            </motion.div>
          ) : (
            decisions.map((decision, index) => (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-6 rounded-2xl border-2 border-[#D2D2D7] dark:border-[#38383A] hover:border-[#007AFF] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                          decision.priority
                        )}`}
                      >
                        {decision.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-[#86868B]">
                        by {decision.proposed_by}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">
                      {decision.title}
                    </h4>
                    <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-3">
                      {decision.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#86868B]">Impact:</span>
                      <span className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {decision.impact}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleDecision(decision.id, 'approved')}
                    disabled={updating === decision.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#34C759] text-white rounded-xl font-semibold hover:bg-[#34C759]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating === decision.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(decision.id, 'deferred')}
                    disabled={updating === decision.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FF9500] text-white rounded-xl font-semibold hover:bg-[#FF9500]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating === decision.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Clock size={18} />
                    )}
                    Defer
                  </button>
                  <button
                    onClick={() => handleDecision(decision.id, 'rejected')}
                    disabled={updating === decision.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FF3B30] text-white rounded-xl font-semibold hover:bg-[#FF3B30]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating === decision.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <XCircle size={18} />
                    )}
                    Reject
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
