// AI Marketing Automation System
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type ContentType = 'social_post' | 'email' | 'blog' | 'ad_copy';
export type Platform = 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'telegram';
export type BusinessName = 'irespect' | 'Ritual-Service24' | 'AIRES';

interface ContentRequest {
  business: BusinessName;
  contentType: ContentType;
  platform?: Platform;
  topic?: string;
  tone?: 'professional' | 'casual' | 'empathetic' | 'promotional';
}

interface GeneratedContent {
  title?: string;
  content: string;
  hashtags?: string[];
  callToAction?: string;
  imagePrompt?: string;
}

// Промпты для каждого бизнеса
const businessContexts = {
  'irespect': {
    description: 'Маркетплейс услуг и товаров для ритуальных услуг',
    audience: 'Люди, столкнувшиеся с потерей близких, организаторы похорон',
    tone: 'empathetic',
    keywords: ['ритуальные услуги', 'похороны', 'память', 'поддержка'],
  },
  'Ritual-Service24': {
    description: 'Круглосуточная служба ритуальных услуг с AI-психологом',
    audience: 'Семьи в трудное время, нуждающиеся в поддержке и организации',
    tone: 'empathetic',
    keywords: ['поддержка 24/7', 'AI-психолог', 'организация похорон', 'помощь'],
  },
  'AIRES': {
    description: 'Мобильное приложение-каталог кладбищ и могил с навигацией',
    audience: 'Люди, ищущие могилы родных, посетители кладбищ',
    tone: 'professional',
    keywords: ['каталог могил', 'навигация', 'память', 'приложение'],
  },
};

// Генерация контента через Claude
export async function generateContent(request: ContentRequest): Promise<GeneratedContent> {
  const context = businessContexts[request.business];

  const prompt = `Ты - эксперт по контент-маркетингу для бизнеса "${request.business}".

КОНТЕКСТ БИЗНЕСА:
- Описание: ${context.description}
- Целевая аудитория: ${context.audience}
- Ключевые слова: ${context.keywords.join(', ')}

ЗАДАЧА: Создай ${getContentTypeDescription(request.contentType)} для ${request.platform || 'социальных сетей'}.

ТРЕБОВАНИЯ:
- Тон: ${request.tone || context.tone}
- Тема: ${request.topic || 'общая информация о сервисе'}
- Формат: ${getFormatRequirements(request.contentType, request.platform)}
- Обязательно включи эмоциональную связь с аудиторией
- Используй storytelling где уместно
- Добавь призыв к действию (CTA)

Верни ТОЛЬКО JSON в следующем формате (без markdown):
{
  "title": "Заголовок (если нужен)",
  "content": "Основной текст",
  "hashtags": ["хештег1", "хештег2"],
  "callToAction": "Призыв к действию",
  "imagePrompt": "Описание изображения для DALL-E"
}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: prompt
    }],
  });

  const response = message.content[0].type === 'text'
    ? message.content[0].text
    : '';

  try {
    // Извлекаем JSON из ответа (удаляем markdown если есть)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error parsing AI response:', error);
    // Fallback: возвращаем сырой текст
    return {
      content: response,
      hashtags: context.keywords.map(k => `#${k.replace(/\s/g, '')}`),
    };
  }
}

// Генерация серии постов (контент-план)
export async function generateContentPlan(
  business: BusinessName,
  platform: Platform,
  daysCount: number = 7
): Promise<GeneratedContent[]> {
  const topics = await generateTopics(business, daysCount);

  const posts = await Promise.all(
    topics.map(topic =>
      generateContent({
        business,
        contentType: 'social_post',
        platform,
        topic,
      })
    )
  );

  return posts;
}

// Генерация тем для контент-плана
async function generateTopics(business: BusinessName, count: number): Promise<string[]> {
  const context = businessContexts[business];

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Предложи ${count} тем для постов в социальных сетях для бизнеса "${business}".

Контекст: ${context.description}
Аудитория: ${context.audience}

Верни список тем в JSON формате: ["тема 1", "тема 2", ...]
Темы должны быть разнообразными и релевантными.`
    }],
  });

  const response = message.content[0].type === 'text'
    ? message.content[0].text
    : '';

  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error parsing topics:', error);
  }

  // Fallback темы
  return [
    'О нашем сервисе',
    'Истории клиентов',
    'Полезные советы',
    'Новости компании',
    'FAQ',
  ].slice(0, count);
}

// Вспомогательные функции
function getContentTypeDescription(type: ContentType): string {
  const types = {
    'social_post': 'пост для социальных сетей',
    'email': 'email рассылку',
    'blog': 'статью для блога',
    'ad_copy': 'рекламный текст',
  };
  return types[type];
}

function getFormatRequirements(type: ContentType, platform?: Platform): string {
  if (type === 'social_post') {
    const limits: Record<Platform, string> = {
      'instagram': 'до 2200 символов, визуально привлекательный',
      'facebook': 'до 500 символов, engaging',
      'linkedin': 'до 1300 символов, профессиональный',
      'twitter': 'до 280 символов, краткий и цепляющий',
      'telegram': 'до 4096 символов, информативный',
    };
    return platform ? limits[platform] : 'подходящий для любой платформы';
  }

  if (type === 'email') {
    return 'тема до 50 символов, тело до 1000 символов, персонализированный';
  }

  if (type === 'blog') {
    return '1500-2000 слов, SEO-оптимизированный, структурированный';
  }

  return 'подходящий для цели';
}

// Автоматический постинг (заглушка - реальная интеграция требует API ключей)
export async function schedulePost(
  content: GeneratedContent,
  platform: Platform,
  scheduledTime?: Date
): Promise<{ success: boolean; postId?: string; error?: string }> {
  // TODO: Интегрировать с реальными API:
  // - Instagram: через Meta Business API
  // - Facebook: через Graph API
  // - LinkedIn: через LinkedIn API
  // - Twitter/X: через X API
  // - Telegram: через Telegram Bot API

  console.log(`📅 Scheduled post for ${platform}:`, {
    content: content.content.substring(0, 100) + '...',
    scheduledTime: scheduledTime || 'now',
    hashtags: content.hashtags,
  });

  // Симуляция успешного постинга
  return {
    success: true,
    postId: `post_${Date.now()}`,
  };
}

// Анализ эффективности контента
export async function analyzeContentPerformance(
  postId: string
): Promise<{
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagement_rate: number;
}> {
  // TODO: Получать реальную статистику через API платформ

  // Заглушка с примерными данными
  return {
    views: Math.floor(Math.random() * 1000) + 500,
    likes: Math.floor(Math.random() * 100) + 50,
    shares: Math.floor(Math.random() * 20) + 5,
    comments: Math.floor(Math.random() * 30) + 10,
    engagement_rate: Math.random() * 10 + 2,
  };
}
