import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agentId = id;

    // В продакшене получайте из базы данных
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agentId = id;
    const body = await request.json();

    // В продакшене обновите в базе данных

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
