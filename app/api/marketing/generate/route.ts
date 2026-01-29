import { NextRequest, NextResponse } from 'next/server';
import { generateContent, generateContentPlan } from '@/lib/ai-marketing';

type RouteContext = {
  params: Promise<Record<string, never>>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json();
    const { action, business, platform, contentType, topic, tone, daysCount } = body;

    if (action === 'plan') {
      // Генерация контент-плана на несколько дней
      const plan = await generateContentPlan(business, platform, daysCount || 7);

      return NextResponse.json({
        success: true,
        data: { plan }
      });
    }

    if (action === 'single') {
      // Генерация одного поста
      const content = await generateContent({
        business,
        contentType: contentType || 'social_post',
        platform,
        topic,
        tone,
      });

      return NextResponse.json({
        success: true,
        data: { content }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Marketing generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate content'
      },
      { status: 500 }
    );
  }
}
