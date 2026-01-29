import { NextRequest, NextResponse } from 'next/server';
import { orchestrator } from '@/app/lib/orchestrator';

export async function GET() {
  try {
    const agents = orchestrator.getAllAgents();

    return NextResponse.json({
      success: true,
      data: {
        agents,
        totalAgents: agents.length,
        activeAgents: agents.filter(a => a.status === 'active').length,
        totalTasksCompleted: agents.reduce((sum, a) => sum + a.tasksCompleted, 0)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get orchestrator status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'delegate_task': {
        const { title, description, priority = 'medium' } = data;

        const task = {
          id: `task-${Date.now()}`,
          agentId: '',
          title,
          description,
          priority,
          status: 'pending' as const,
          createdAt: new Date()
        };

        const result = await orchestrator.delegateTask(task);

        return NextResponse.json({
          success: true,
          data: { result, task }
        });
      }

      case 'start_autonomous': {
        const { businessId } = data;
        orchestrator.runAutonomousLoop(businessId);

        return NextResponse.json({
          success: true,
          message: 'Autonomous loop started'
        });
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Orchestrator error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to execute action' },
      { status: 500 }
    );
  }
}
