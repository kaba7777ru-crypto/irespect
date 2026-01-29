import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agentId = params.id;
    const { task, priority = 'medium' } = await request.json();

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task description is required' },
        { status: 400 }
      );
    }

    // Отправляем задачу агенту через Anthropic API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Вы AI агент для бизнеса. Выполните следующую задачу:\n\n${task}`
        }
      ],
    });

    const result = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({
      success: true,
      data: {
        taskId: `task-${Date.now()}`,
        agentId,
        status: 'completed',
        result,
        completedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error processing task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process task' },
      { status: 500 }
    );
  }
}
