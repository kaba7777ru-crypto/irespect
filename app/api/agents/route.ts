import { NextRequest, NextResponse } from 'next/server';
import { Agent } from '@/app/types/agents';

// Временное хранилище (в продакшене используйте базу данных)
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Analytics Agent',
    category: 'analytics',
    status: 'active',
    description: 'Анализирует метрики и KPI бизнеса',
    businessId: 'business-1',
    lastActive: new Date(),
    tasksCompleted: 145,
    currentTask: 'Анализ продаж за последний месяц',
    capabilities: ['data analysis', 'reporting', 'visualization'],
    metrics: {
      successRate: 98.5,
      averageResponseTime: 2.3,
      tasksInQueue: 3,
      errorCount: 2
    }
  },
  {
    id: '2',
    name: 'Financial Agent',
    category: 'financial',
    status: 'busy',
    description: 'Отслеживает финансовые показатели',
    businessId: 'business-1',
    lastActive: new Date(),
    tasksCompleted: 89,
    currentTask: 'Подготовка финансового отчета',
    capabilities: ['financial analysis', 'budgeting', 'forecasting'],
    metrics: {
      successRate: 99.2,
      averageResponseTime: 3.1,
      tasksInQueue: 5,
      errorCount: 1
    }
  },
  {
    id: '3',
    name: 'Marketing Agent',
    category: 'marketing',
    status: 'idle',
    description: 'Управляет маркетинговыми кампаниями',
    businessId: 'business-2',
    lastActive: new Date(),
    tasksCompleted: 234,
    capabilities: ['content creation', 'SEO', 'social media'],
    metrics: {
      successRate: 96.8,
      averageResponseTime: 1.8,
      tasksInQueue: 0,
      errorCount: 8
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId');
    const category = searchParams.get('category');

    let filteredAgents = mockAgents;

    if (businessId) {
      filteredAgents = filteredAgents.filter(agent => agent.businessId === businessId);
    }

    if (category) {
      filteredAgents = filteredAgents.filter(agent => agent.category === category);
    }

    return NextResponse.json({
      success: true,
      data: filteredAgents,
      count: filteredAgents.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: body.name,
      category: body.category,
      status: 'idle',
      description: body.description,
      businessId: body.businessId,
      lastActive: new Date(),
      tasksCompleted: 0,
      capabilities: body.capabilities || [],
      metrics: {
        successRate: 100,
        averageResponseTime: 0,
        tasksInQueue: 0,
        errorCount: 0
      }
    };

    mockAgents.push(newAgent);

    return NextResponse.json({
      success: true,
      data: newAgent
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}
