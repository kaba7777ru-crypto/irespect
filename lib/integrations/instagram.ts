// Instagram Business API Integration
// Документация: https://developers.facebook.com/docs/instagram-api

interface InstagramCredentials {
  accessToken: string;
  instagramBusinessAccountId: string;
}

interface InstagramPost {
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
}

interface InstagramPostResponse {
  id: string;
  permalink: string;
}

/**
 * Публикация поста в Instagram
 *
 * Требования:
 * 1. Instagram Business аккаунт
 * 2. Facebook Page, связанная с Instagram аккаунтом
 * 3. Meta App с правами instagram_basic, instagram_content_publish
 * 4. Access Token с нужными разрешениями
 */
export class InstagramAPI {
  private accessToken: string;
  private accountId: string;
  private baseUrl = 'https://graph.facebook.com/v18.0';

  constructor(credentials: InstagramCredentials) {
    this.accessToken = credentials.accessToken;
    this.accountId = credentials.instagramBusinessAccountId;
  }

  /**
   * Создать медиа-контейнер (шаг 1 публикации)
   */
  private async createMediaContainer(post: InstagramPost): Promise<string> {
    const params = new URLSearchParams({
      access_token: this.accessToken,
      caption: post.caption,
    });

    // Добавляем изображение или видео
    if (post.imageUrl) {
      params.append('image_url', post.imageUrl);
    } else if (post.videoUrl) {
      params.append('media_type', 'VIDEO');
      params.append('video_url', post.videoUrl);
    } else {
      throw new Error('Either imageUrl or videoUrl is required');
    }

    const response = await fetch(
      `${this.baseUrl}/${this.accountId}/media?${params.toString()}`,
      { method: 'POST' }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create media container: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    return data.id;
  }

  /**
   * Опубликовать медиа-контейнер (шаг 2 публикации)
   */
  private async publishMediaContainer(containerId: string): Promise<InstagramPostResponse> {
    const params = new URLSearchParams({
      access_token: this.accessToken,
      creation_id: containerId,
    });

    const response = await fetch(
      `${this.baseUrl}/${this.accountId}/media_publish?${params.toString()}`,
      { method: 'POST' }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to publish media: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    // Получить permalink опубликованного поста
    const permalink = await this.getPostPermalink(data.id);

    return {
      id: data.id,
      permalink,
    };
  }

  /**
   * Получить ссылку на опубликованный пост
   */
  private async getPostPermalink(mediaId: string): Promise<string> {
    const params = new URLSearchParams({
      access_token: this.accessToken,
      fields: 'permalink',
    });

    const response = await fetch(
      `${this.baseUrl}/${mediaId}?${params.toString()}`
    );

    if (!response.ok) {
      return '';
    }

    const data = await response.json();
    return data.permalink || '';
  }

  /**
   * Полный процесс публикации в Instagram
   */
  async publishPost(post: InstagramPost): Promise<InstagramPostResponse> {
    try {
      // Шаг 1: Создать медиа-контейнер
      console.log('📸 Creating Instagram media container...');
      const containerId = await this.createMediaContainer(post);

      // Для видео нужно подождать обработки
      if (post.videoUrl) {
        console.log('🎬 Waiting for video processing...');
        await this.waitForVideoProcessing(containerId);
      }

      // Шаг 2: Опубликовать
      console.log('✨ Publishing to Instagram...');
      const result = await this.publishMediaContainer(containerId);

      console.log('✅ Published successfully:', result.permalink);
      return result;

    } catch (error) {
      console.error('❌ Instagram publish error:', error);
      throw error;
    }
  }

  /**
   * Ожидание обработки видео (для видео-постов)
   */
  private async waitForVideoProcessing(containerId: string, maxAttempts = 20): Promise<void> {
    for (let i = 0; i < maxAttempts; i++) {
      const params = new URLSearchParams({
        access_token: this.accessToken,
        fields: 'status_code',
      });

      const response = await fetch(
        `${this.baseUrl}/${containerId}?${params.toString()}`
      );

      const data = await response.json();

      if (data.status_code === 'FINISHED') {
        return;
      }

      if (data.status_code === 'ERROR') {
        throw new Error('Video processing failed');
      }

      // Ждем 3 секунды перед следующей проверкой
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    throw new Error('Video processing timeout');
  }

  /**
   * Получить insights (статистику) поста
   */
  async getPostInsights(mediaId: string): Promise<{
    likes: number;
    comments: number;
    reach: number;
    impressions: number;
  }> {
    const params = new URLSearchParams({
      access_token: this.accessToken,
      metric: 'likes,comments,reach,impressions',
    });

    try {
      const response = await fetch(
        `${this.baseUrl}/${mediaId}/insights?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch insights');
      }

      const data = await response.json();

      const insights = {
        likes: 0,
        comments: 0,
        reach: 0,
        impressions: 0,
      };

      data.data?.forEach((metric: any) => {
        insights[metric.name as keyof typeof insights] = metric.values[0]?.value || 0;
      });

      return insights;
    } catch (error) {
      console.error('Error fetching insights:', error);
      // Возвращаем базовую статистику из основного запроса
      return this.getBasicStats(mediaId);
    }
  }

  /**
   * Получить базовую статистику (лайки, комментарии)
   */
  private async getBasicStats(mediaId: string): Promise<{
    likes: number;
    comments: number;
    reach: number;
    impressions: number;
  }> {
    const params = new URLSearchParams({
      access_token: this.accessToken,
      fields: 'like_count,comments_count',
    });

    const response = await fetch(
      `${this.baseUrl}/${mediaId}?${params.toString()}`
    );

    if (!response.ok) {
      return { likes: 0, comments: 0, reach: 0, impressions: 0 };
    }

    const data = await response.json();

    return {
      likes: data.like_count || 0,
      comments: data.comments_count || 0,
      reach: 0,
      impressions: 0,
    };
  }
}

/**
 * Получить Instagram API клиент из environment variables
 */
export function getInstagramClient(businessName: string): InstagramAPI | null {
  // Ищем credentials для конкретного бизнеса
  const accessToken = process.env[`INSTAGRAM_ACCESS_TOKEN_${businessName.toUpperCase().replace(/-/g, '_')}`];
  const accountId = process.env[`INSTAGRAM_ACCOUNT_ID_${businessName.toUpperCase().replace(/-/g, '_')}`];

  if (!accessToken || !accountId) {
    console.warn(`Instagram credentials not found for ${businessName}`);
    return null;
  }

  return new InstagramAPI({
    accessToken,
    instagramBusinessAccountId: accountId,
  });
}

/**
 * Проверка подключения Instagram аккаунта
 */
export async function verifyInstagramConnection(
  accessToken: string,
  accountId: string
): Promise<{ valid: boolean; username?: string; error?: string }> {
  try {
    const params = new URLSearchParams({
      access_token: accessToken,
      fields: 'username,profile_picture_url',
    });

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}?${params.toString()}`
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        valid: false,
        error: error.error?.message || 'Invalid credentials',
      };
    }

    const data = await response.json();
    return {
      valid: true,
      username: data.username,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}
