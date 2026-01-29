// Скрипт для сброса аналитики и установки новых задач
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ebehihysbaycfmklfiwd.supabase.co';
const supabaseKey = 'sb_publishable_wNbis2eP3guE9T6fygSA8w_MXZm9IAi';

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetData() {
  console.log('🔄 Начинаю сброс данных...\n');

  try {
    // 1. Удалить все активности
    const { error: activitiesError } = await supabase
      .from('activities')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Удалить все

    if (activitiesError) throw activitiesError;
    console.log('✅ Активности удалены');

    // 2. Удалить все решения
    const { error: decisionsError } = await supabase
      .from('decisions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (decisionsError) throw decisionsError;
    console.log('✅ Решения удалены');

    // 3. Удалить метрики
    const { error: metricsError } = await supabase
      .from('metrics')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (metricsError) throw metricsError;
    console.log('✅ Метрики удалены');

    // 4. Получить ID бизнесов
    const { data: businesses } = await supabase
      .from('businesses')
      .select('id, name');

    const irespectId = businesses.find(b => b.name === 'irespect')?.id;
    const ritualId = businesses.find(b => b.name === 'Ritual-Service24')?.id;
    const airesId = businesses.find(b => b.name === 'AIRES')?.id;

    // 5. Добавить новые задачи
    const newDecisions = [
      {
        title: 'Запустить A/B тестирование главной страницы',
        description: 'Протестировать 3 варианта главной страницы для увеличения конверсии',
        priority: 'high',
        impact: 'Рост конверсии с 2% до 5%, +€3K выручки/месяц',
        proposed_by: 'UX/UI Design AI',
        status: 'pending'
      },
      {
        title: 'Интеграция с CRM системой',
        description: 'Подключить Bitrix24 для автоматизации продаж',
        priority: 'medium',
        impact: 'Автоматизация 80% рутинных задач отдела продаж',
        proposed_by: 'Development AI',
        status: 'pending'
      },
      {
        title: 'Добавить AI-ассистента для клиентов',
        description: 'Внедрить чат-бот на базе Claude для поддержки 24/7',
        priority: 'high',
        impact: 'Снижение нагрузки на поддержку на 70%',
        proposed_by: 'Customer Support AI',
        status: 'pending'
      },
      {
        title: 'Оптимизация SEO для органического трафика',
        description: 'Улучшить позиции в поиске по ключевым запросам',
        priority: 'medium',
        impact: 'Рост органического трафика на 150%',
        proposed_by: 'Marketing AI',
        status: 'pending'
      }
    ];

    const { error: decisionsInsertError } = await supabase
      .from('decisions')
      .insert(newDecisions);

    if (decisionsInsertError) throw decisionsInsertError;
    console.log('✅ Новые задачи добавлены:', newDecisions.length);

    // 6. Добавить свежие активности
    const newActivities = [
      {
        agent_name: 'Orchestrator',
        action: 'запустил утренний анализ всех бизнес-метрик для irespect'
      },
      {
        agent_name: 'Market Intelligence',
        action: 'обнаружил новый тренд: рост спроса на онлайн-поминки (Ritual-Service24)'
      },
      {
        agent_name: 'Development',
        action: 'завершил оптимизацию скорости загрузки AIRES приложения (-40%)'
      },
      {
        agent_name: 'Marketing',
        action: 'запустил новую рекламную кампанию в Instagram для irespect'
      },
      {
        agent_name: 'Product Strategy',
        action: 'предложил 3 новых функции для Ritual-Service24 на основе отзывов'
      },
      {
        agent_name: 'Customer Support',
        action: 'автоматически ответил на 47 запросов пользователей'
      },
      {
        agent_name: 'QA Testing',
        action: 'обнаружил и исправил 5 критических багов перед релизом'
      },
      {
        agent_name: 'DevOps',
        action: 'оптимизировал инфраструктуру, снизив расходы на 25%'
      }
    ];

    const { error: activitiesInsertError } = await supabase
      .from('activities')
      .insert(newActivities);

    if (activitiesInsertError) throw activitiesInsertError;
    console.log('✅ Новые активности добавлены:', newActivities.length);

    console.log('\n🎉 Данные успешно сброшены и обновлены!');
    console.log('\n📊 Итого:');
    console.log(`   - ${newDecisions.length} новых задач для принятия решений`);
    console.log(`   - ${newActivities.length} свежих активностей`);
    console.log('   - Все старые метрики удалены\n');

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

resetData();
