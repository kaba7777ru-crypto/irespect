import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const agentId = id;

    const mockAgent = {
      id: agentId,
      name: 'Sample Agent',
      category: 'analytics',
      status: 'active',
      description: 'Agent description',
      lastActive: new Date(),
      tasksCompleted: 100,
      capabilities: ['analysis', 'reporting'],
      metrics: {
        successRate: 98.5,
        averageResponseTime: 2.3,
        tasksInQueue: 3,
        errorCount: 2
      }
    };

    return NextResponse.json({
      success: true,
      data: mockAgent
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agent' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const agentId = id;
    const body = await request.json();

    return NextResponse.json({
      success: true,
      message: 'Agent updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update agent' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const agentId = id;

    // В продакшене удалите из базы данных

    return NextResponse.json({
      success: true,
      message: 'Agent deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete agent' },
      { status: 500 }
    );
  }
}
