// Сброс и установка приоритетных задач
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ebehihysbaycfmklfiwd.supabase.co';
const supabaseKey = 'sb_publishable_wNbis2eP3guE9T6fygSA8w_MXZm9IAi';

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetPriorityTasks() {
  console.log('🔄 Сброс и установка приоритетных задач...\n');

  try {
    // 1. Удалить ВСЕ задачи
    const { error: decisionsError } = await supabase
      .from('decisions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (decisionsError) throw decisionsError;
    console.log('✅ Все старые задачи удалены');

    // 2. Удалить активности
    const { error: activitiesError } = await supabase
      .from('activities')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (activitiesError) throw activitiesError;
    console.log('✅ История активностей очищена');

    // 3. Добавить ТОЛЬКО критически важные задачи
    const priorityTasks = [
      {
        title: 'Настроить Stripe для приема платежей',
        description: 'Интегрировать Stripe Payment Gateway для всех 3 бизнесов. Настроить подписки, one-time платежи и webhooks.',
        priority: 'high',
        impact: 'Возможность принимать оплату онлайн. Критически важно для роста.',
        proposed_by: 'Development AI',
        status: 'pending'
      },
      {
        title: 'Запустить AI-автоматизацию маркетинга',
        description: 'Внедрить систему автоматической генерации контента и постинга в соцсети через Claude API.',
        priority: 'high',
        impact: 'Экономия 20+ часов/неделю на контент-маркетинге',
        proposed_by: 'Marketing AI',
        status: 'pending'
      },
      {
        title: 'Настроить мониторинг и алерты',
        description: 'Подключить систему мониторинга (Sentry, Datadog) для отслеживания ошибок и производительности в реальном времени.',
        priority: 'medium',
        impact: 'Быстрое обнаружение и исправление проблем до жалоб пользователей',
        proposed_by: 'DevOps AI',
        status: 'pending'
      }
    ];

    const { error: insertError } = await supabase
      .from('decisions')
      .insert(priorityTasks);

    if (insertError) throw insertError;
    console.log('✅ Добавлено', priorityTasks.length, 'приоритетных задач\n');

    // 4. Добавить свежую активность о сбросе
    const resetActivity = [
      {
        agent_name: 'Orchestrator',
        action: 'выполнил полный сброс задач и установил новые приоритеты'
      },
      {
        agent_name: 'Development AI',
        action: 'подготовил план интеграции Stripe Payment Gateway'
      },
      {
        agent_name: 'Marketing AI',
        action: 'составил стратегию автоматизации контент-маркетинга'
      }
    ];

    const { error: activityError } = await supabase
      .from('activities')
      .insert(resetActivity);

    if (activityError) throw activityError;
    console.log('✅ Добавлено', resetActivity.length, 'активностей\n');

    console.log('🎉 Готово! Новые приоритетные задачи:');
    priorityTasks.forEach((task, i) => {
      console.log(`\n${i + 1}. ${task.title} [${task.priority.toUpperCase()}]`);
      console.log(`   ${task.description}`);
      console.log(`   💡 Эффект: ${task.impact}`);
    });

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

resetPriorityTasks();
