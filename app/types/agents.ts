export type AgentStatus = 'active' | 'idle' | 'busy' | 'error' | 'offline';

export type AgentCategory =
  | 'analytics'
  | 'financial'
  | 'marketing'
  | 'operations'
  | 'technical'
  | 'strategic';

export interface Agent {
  id: string;
  name: string;
  category: AgentCategory;
  status: AgentStatus;
  description: string;
  businessId?: string;
  lastActive: Date;
  tasksCompleted: number;
  currentTask?: string;
  capabilities: string[];
  metrics: AgentMetrics;
}

export interface AgentMetrics {
  successRate: number;
  averageResponseTime: number;
  tasksInQueue: number;
  errorCount: number;
}

export interface AgentTask {
  id: string;
  agentId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  result?: string;
}

export interface AgentMessage {
  id: string;
  agentId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Business {
  id: string;
  name: string;
  agents: string[];
  metrics: BusinessMetrics;
}

export interface BusinessMetrics {
  revenue: number;
  customers: number;
  growth: number;
}
