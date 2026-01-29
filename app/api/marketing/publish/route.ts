import { NextRequest, NextResponse } from 'next/server';
import { getInstagramClient } from '@/lib/integrations/instagram';

type RouteContext = {
  params: Promise<Record<string, never>>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json();
    const { platform, business, content, imageUrl } = body;

    if (!platform || !business || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Публикация в Instagram
    if (platform === 'instagram') {
      const instagram = getInstagramClient(business);

      if (!instagram) {
        return NextResponse.json(
          {
            success: false,
            error: 'Instagram not configured for this business',
            message: 'Добавьте INSTAGRAM_ACCESS_TOKEN и INSTAGRAM_ACCOUNT_ID в .env.local'
          },
          { status: 400 }
        );
      }

      if (!imageUrl) {
        return NextResponse.json(
          { success: false, error: 'Image URL is required for Instagram posts' },
          { status: 400 }
        );
      }

      try {
        const result = await instagram.publishPost({
          caption: content,
          imageUrl: imageUrl,
        });

        return NextResponse.json({
          success: true,
          data: {
            postId: result.id,
            permalink: result.permalink,
            platform: 'instagram',
          }
        });
      } catch (error: any) {
        console.error('Instagram publish error:', error);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to publish to Instagram',
            details: error.message,
          },
          { status: 500 }
        );
      }
    }

    // Публикация в Facebook
    if (platform === 'facebook') {
      // TODO: Реализовать Facebook Graph API
      return NextResponse.json(
        { success: false, error: 'Facebook publishing not yet implemented' },
        { status: 501 }
      );
    }

    // Публикация в LinkedIn
    if (platform === 'linkedin') {
      // TODO: Реализовать LinkedIn API
      return NextResponse.json(
        { success: false, error: 'LinkedIn publishing not yet implemented' },
        { status: 501 }
      );
    }

    // Публикация в Telegram
    if (platform === 'telegram') {
      // TODO: Реализовать Telegram Bot API
      return NextResponse.json(
        { success: false, error: 'Telegram publishing not yet implemented' },
        { status: 501 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported platform' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to publish'
      },
      { status: 500 }
    );
  }
}
