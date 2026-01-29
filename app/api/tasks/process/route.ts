import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Определяем, какой агент подходит для какой задачи
function getAgentForTask(proposedBy: string) {
  const agentMap: Record<string, string> = {
    'Marketing Agent': 'marketing',
    'Growth Agent': 'growth',
    'Sales Agent': 'sales',
    'Content Agent': 'content',
    'Product Strategy': 'strategy',
    'PR Agent': 'pr',
    'Business Development': 'business_dev',
    'Legal Agent': 'legal',
    'Product Manager': 'product',
    'Development Agent': 'technical',
    'Monetization Agent': 'financial'
  };

  return agentMap[proposedBy] || 'general';
}

// Создаем промпт для агента
function createAgentPrompt(task: any, agentType: string): string {
  const basePrompt = `Вы AI агент для автоматизации бизнеса в Германии.

ЗАДАЧА: ${task.title}
ОПИСАНИЕ: ${task.description}
ПРИОРИТЕТ: ${task.priority}
ОЖИДАЕМЫЙ РЕЗУЛЬТАТ: ${task.impact}
БИЗНЕС: ${task.business_name || 'Общая задача'}

`;

  const rolePrompts: Record<string, string> = {
    marketing: `Вы Marketing Agent. Ваша специализация:
- Google Ads и Facebook/Instagram кампании
- SEO оптимизация для немецкого рынка
- Контент-маркетинг на немецком языке
- A/B тестирование и аналитика

Создайте детальный план выполнения этой маркетинговой задачи.`,

    sales: `Вы Sales Agent. Ваша специализация:
- B2B продажи и партнерства
- Холодные рассылки и follow-up
- Переговоры и закрытие сделок
- CRM и воронка продаж

Разработайте стратегию и конкретные шаги для выполнения этой задачи.`,

    content: `Вы Content Agent. Ваша специализация:
- Создание контента на немецком языке
- Social media (TikTok, Instagram, LinkedIn)
- SEO-статьи и блог-посты
- Видео-скрипты и копирайтинг

Создайте контент-план или напишите готовый контент для этой задачи.`,

    growth: `Вы Growth Hacker. Ваша специализация:
- Вирусный рост и реферальные программы
- Product-led growth
- Эксперименты и тестирование гипотез
- Автоматизация маркетинга

Предложите Growth-стратегию для выполнения этой задачи.`,

    strategy: `Вы Product Strategy Agent. Ваша специализация:
- Продуктовая стратегия и roadmap
- Монетизация и ценообразование
- User research и UX
- Product-market fit

Разработайте стратегический план для этой задачи.`,

    pr: `Вы PR Agent. Ваша специализация:
- Связи с прессой и СМИ
- Социальные проекты и CSR
- Кризисный менеджмент
- Репутация бренда

Создайте PR-стратегию для этой задачи.`,

    business_dev: `Вы Business Development Agent. Ваша специализация:
- Стратегические партнерства
- Новые каналы дистрибуции
- M&A и инвестиции
- Масштабирование бизнеса

Разработайте план развития бизнеса для этой задачи.`,

    legal: `Вы Legal Agent. Ваша специализация:
- GDPR/DSGVO compliance
- Договоры и соглашения
- Интеллектуальная собственность
- Нормативное регулирование в Германии

Проанализируйте юридические аспекты и предложите решение.`,

    technical: `Вы Development Agent. Ваша специализация:
- Разработка веб и мобильных приложений
- Архитектура и масштабирование
- DevOps и CI/CD
- Техническая документация

Создайте технический план реализации этой задачи.`,

    financial: `Вы Financial Agent. Ваша специализация:
- Финансовое моделирование
- Монетизация и pricing
- Управление бюджетами
- ROI и метрики прибыльности

Разработайте финансовую модель для этой задачи.`,

    general: `Вы General AI Agent. Проанализируйте задачу и предложите детальный план действий.`
  };

  return basePrompt + (rolePrompts[agentType] || rolePrompts.general) + `

ВАЖНО:
- Учитывайте специфику немецкого рынка
- Все рекомендации должны быть конкретными и actionable
- Укажите ожидаемые сроки и метрики успеха
- Предложите первые шаги для немедленного старта

Ваш ответ должен быть структурированным и содержать:
1. Анализ задачи
2. Конкретный план действий (шаги)
3. Необходимые ресурсы
4. Ожидаемые результаты
5. Метрики для отслеживания прогресса`;
}

export async function POST(request: NextRequest) {
  try {
    const { taskId, autoProcess } = await request.json();

    if (autoProcess) {
      // Автоматическая обработка всех pending задач
      const { data: pendingTasks } = await supabase
        .from('decisions')
        .select('*, businesses(name)')
        .eq('status', 'pending')
        .limit(5); // Обрабатываем по 5 задач за раз

      if (!pendingTasks || pendingTasks.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No pending tasks to process'
        });
      }

      const results = [];

      for (const task of pendingTasks) {
        const agentType = getAgentForTask(task.proposed_by);
        const prompt = createAgentPrompt({
          ...task,
          business_name: task.businesses?.name
        }, agentType);

        // Обновляем статус на "processing"
        await supabase
          .from('decisions')
          .update({
            status: 'approved',
            updated_at: new Date().toISOString()
          })
          .eq('id', task.id);

        // Отправляем задачу Claude
        const message = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
        });

        const result = message.content[0].type === 'text' ? message.content[0].text : '';

        // Сохраняем результат в activities
        await supabase
          .from('activities')
          .insert({
            agent_name: task.proposed_by,
            action: `Processed task: ${task.title}`,
            details: {
              task_id: task.id,
              result: result.substring(0, 500), // Первые 500 символов
              full_result: result,
              agent_type: agentType,
              priority: task.priority
            }
          });

        results.push({
          task_id: task.id,
          task_title: task.title,
          agent: task.proposed_by,
          status: 'completed',
          preview: result.substring(0, 200) + '...'
        });
      }

      return NextResponse.json({
        success: true,
        processed: results.length,
        results
      });

    } else if (taskId) {
      // Обработка конкретной задачи
      const { data: task } = await supabase
        .from('decisions')
        .select('*, businesses(name)')
        .eq('id', taskId)
        .single();

      if (!task) {
        return NextResponse.json(
          { success: false, error: 'Task not found' },
          { status: 404 }
        );
      }

      const agentType = getAgentForTask(task.proposed_by);
      const prompt = createAgentPrompt({
        ...task,
        business_name: task.businesses?.name
      }, agentType);

      // Обновляем статус
      await supabase
        .from('decisions')
        .update({
          status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId);

      // Отправляем задачу Claude
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      const result = message.content[0].type === 'text' ? message.content[0].text : '';

      // Сохраняем результат
      await supabase
        .from('activities')
        .insert({
          agent_name: task.proposed_by,
          action: `Processed task: ${task.title}`,
          details: {
            task_id: task.id,
            full_result: result,
            agent_type: agentType,
            priority: task.priority
          }
        });

      return NextResponse.json({
        success: true,
        task_id: taskId,
        agent: task.proposed_by,
        result
      });
    }

    return NextResponse.json(
      { success: false, error: 'Either taskId or autoProcess required' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error processing task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process task' },
      { status: 500 }
    );
  }
}

// GET endpoint для получения обработанных задач
export async function GET() {
  try {
    const { data: activities } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    return NextResponse.json({
      success: true,
      activities
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
