import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Business {
  id: string;
  name: string;
  description: string;
  revenue_monthly: number;
  users_count: number;
  status: 'planning' | 'launched' | 'scaling';
  created_at: string;
}

export interface Metric {
  id: string;
  business_id: string;
  date: string;
  revenue: number;
  users: number;
  orders: number;
  conversion_rate: number;
  created_at: string;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'paused' | 'error';
  tasks_completed: number;
  quality_score: number;
  last_run: string;
  created_at: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  business_id: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected' | 'deferred';
  proposed_by: string;
  impact: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  agent_name: string;
  action: string;
  details: any;
  created_at: string;
}

// Helper functions
export const getBusinesses = async () => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Business[];
};

export const getBusinessById = async (id: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Business;
};

export const getMetrics = async (businessId?: string, days: number = 7) => {
  let query = supabase
    .from('metrics')
    .select('*')
    .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('date', { ascending: true });

  if (businessId) {
    query = query.eq('business_id', businessId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Metric[];
};

export const getAIAgents = async () => {
  const { data, error } = await supabase
    .from('ai_agents')
    .select('*')
    .order('quality_score', { ascending: false });

  if (error) throw error;
  return data as AIAgent[];
};

export const getPendingDecisions = async () => {
  const { data, error } = await supabase
    .from('decisions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Decision[];
};

export const updateDecisionStatus = async (
  id: string,
  status: 'approved' | 'rejected' | 'deferred'
) => {
  const { data, error } = await supabase
    .from('decisions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Decision;
};

export const getRecentActivities = async (limit: number = 10) => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Activity[];
};

export const addActivity = async (
  agent_name: string,
  action: string,
  details: any = {}
) => {
  const { data, error } = await supabase
    .from('activities')
    .insert({
      agent_name,
      action,
      details,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Activity;
};

// Realtime subscriptions
export const subscribeToMetrics = (
  businessId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`metrics:${businessId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'metrics',
        filter: `business_id=eq.${businessId}`,
      },
      callback
    )
    .subscribe();
};

export const subscribeToActivities = (callback: (payload: any) => void) => {
  return supabase
    .channel('activities')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'activities',
      },
      callback
    )
    .subscribe();
};

export const subscribeToDecisions = (callback: (payload: any) => void) => {
  return supabase
    .channel('decisions')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'decisions',
      },
      callback
    )
    .subscribe();
};
