const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ebehihysbaycfmklfiwd.supabase.co',
  'sb_publishable_wNbis2eP3guE9T6fygSA8w_MXZm9IAi'
);

async function addMarketingTasks() {
  try {
    // Получаем ID бизнесов
    const { data: businesses } = await supabase
      .from('businesses')
      .select('id, name');

    const irespectId = businesses.find(b => b.name === 'irespect')?.id;
    const ritualId = businesses.find(b => b.name === 'Ritual-Service24')?.id;
    const airesId = businesses.find(b => b.name === 'AIRES')?.id;

    const tasks = [
      // irespect задачи (для Германии)
      {
        title: 'SEO для немецкого рынка',
        description: 'Создать 20 SEO статей на немецком: "Handwerker finden in [Stadt]", "Top 10 Dienstleistungen". Цель: 5000 органического трафика/мес',
        business_id: irespectId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Marketing Agent',
        impact: 'Органический трафик +300%, снижение CAC на 50%. Позиционирование в TopШ Google.de'
      },
      {
        title: 'Referral-Programm: €10 за друга',
        description: 'Немецкая реферальная программа: €10 скидка за друга. Мастера получают +15% к рейтингу. Email-кампании на немецком',
        business_id: irespectId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Growth Agent',
        impact: 'Вирусный рост +200%, снижение CAC на 70%. Немецкие пользователи любят рефералы'
      },
      {
        title: 'B2B: Hausverwaltungen партнерства',
        description: 'Холодная рассылка 1000 Hausverwaltungen (управляющих компаний). Корпоративные тарифы -20%',
        business_id: irespectId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Sales Agent',
        impact: 'B2B канал, прогноз €30К/мес. Немецкие Hausverwaltungen - огромный рынок'
      },
      {
        title: 'Google Ads кампания (Германия)',
        description: 'Бюджет €500/мес. Ключи: "Handwerker Berlin", "Notdienst Klempner". Геотаргет: Berlin, München, Hamburg. ROI 600%',
        business_id: irespectId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Marketing Agent',
        impact: 'Прогноз: 250 заказов/мес, доход €3000/мес. CPC в Германии выше, но и чеки больше'
      },
      {
        title: 'TikTok + Instagram (deutsche Version)',
        description: 'Контент на немецком. 3 Reels/Tag. Хештеги #Handwerker #Renovierung #Berlin. Коллабы с немецкими мастерами',
        business_id: irespectId,
        priority: 'medium',
        status: 'pending',
        proposed_by: 'Content Agent',
        impact: 'Охват 150К/мес в Германии, молодая аудитория 25-40 лет'
      },
      {
        title: 'Партнерство с MyHammer и Blauarbeit',
        description: 'Интеграция с крупнейшими платформами Германии. Автоматический импорт заказов',
        business_id: irespectId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Business Development',
        impact: 'Доступ к 2М пользователей, мгновенная экспансия на немецкий рынок'
      },

      // Ritual-Service24 задачи (для Германии)
      {
        title: 'KI-Psychologe auf Deutsch (Lead Magnet)',
        description: 'Бесплатная AI консультация на немецком. WhatsApp бот 24/7. Email-Kurs "Trauerbewältigung" (10 писем). GDPR compliant',
        business_id: ritualId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Product Strategy',
        impact: 'Конверсия 7% (выше чем в России), 1500 лидов/мес. Немцы доверяют технологиям'
      },
      {
        title: 'SEO: "Bestattung organisieren"',
        description: 'Гайд на немецком + Preisrechner. Топ-3 Google.de по 30 ключам: "Bestattung Kosten", "Beerdigung planen"',
        business_id: ritualId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Marketing Agent',
        impact: '3000 органики/мес. Средний чек в Германии €3500 (выше чем €1500 в России)'
      },
      {
        title: 'Partnerschaften mit Krankenhäusern',
        description: 'B2B договоры с 20 больницами Берлина, Мюнхена, Гамбурга. Комиссия 12%',
        business_id: ritualId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Sales Agent',
        impact: 'Стабильный поток 30-40 заказов/мес, средний чек €3500 = €120К выручки'
      },
      {
        title: 'Soziales Projekt: Kostenlose Bestattung',
        description: '2 бесплатные похороны/мес. PR в Bild, FAZ, Süddeutsche. Благотворительный фонд',
        business_id: ritualId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'PR Agent',
        impact: 'Огромный PR в Германии, публикации в топ-СМИ, доверие к бренду'
      },
      {
        title: 'Sterbegeldversicherung партнерство',
        description: 'Партнерство с немецкими страховыми: Allianz, HUK. Продукт: €80/год → покрытие €8000',
        business_id: ritualId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Business Development',
        impact: 'Огромный рынок в Германии. Прогноз €15К/мес пассивного дохода'
      },
      {
        title: 'Google Ads: Notfall-Bestattung',
        description: 'Бюджет €600/мес. Ключи: "Bestattung Notfall", "Beerdigung sofort". CPC €3-5',
        business_id: ritualId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Marketing Agent',
        impact: 'ROI 800%. 20 заказов/мес × €3500 = €70К выручки'
      },

      // AIRES задачи (для Германии)
      {
        title: 'Premium-Abo: €4.99/Monat (Германия)',
        description: 'QR-коды, unbegrenzte Fotos, AR-Navigation. Немцы платят больше за качество. Freemium модель',
        business_id: airesId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Product Strategy',
        impact: 'MRR €25К через 12 месяцев. Немецкий рынок платежеспособнее на 150%'
      },
      {
        title: 'Virales Wachstum: Finde das Grab deines Vorfahren',
        description: 'Бесплатный поиск по Германии. Интеграция с Ancestry.de, MyHeritage. Crowdsourcing немецких кладбищ',
        business_id: airesId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Growth Hacker',
        impact: 'Вирусный эффект. Немцы помешаны на генеалогии. 100К downloads/Jahr'
      },
      {
        title: 'B2B für Friedhöfe: €199/Monat',
        description: 'SaaS для немецких кладбищ. Digitalisierung, Grabverwaltung, Analytics. Цена выше - рынок богаче',
        business_id: airesId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Sales Agent',
        impact: '200 B2B клиентов = €40К MRR. В Германии 32000 кладбищ - огромный потенциал'
      },
      {
        title: 'AR-Navigation (Deutsche Friedhöfe)',
        description: 'AR для поиска могил на немецких кладбищах. Первая такая технология в Европе',
        business_id: airesId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Development Agent',
        impact: 'Конкурентное преимущество, PR в немецких tech-СМИ, wow-эффект'
      },
      {
        title: 'Virtuelle Blumen und Kerzen',
        description: 'Микротранзакции €1-€10 (выше чем в России). Немцы любят оставлять виртуальные цветы',
        business_id: airesId,
        priority: 'medium',
        status: 'pending',
        proposed_by: 'Monetization Agent',
        impact: '€8К/мес дополнительного дохода. Эмоциональная связь с продуктом'
      },
      {
        title: 'Partnerschaften mit Friedhofsgärtnereien',
        description: 'Партнерство с 500 немецкими садовниками кладбищ. Реклама услуг по уходу за могилами',
        business_id: airesId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Business Development',
        impact: 'Комиссия 15% с заказов. Прогноз €12К/мес пассивного дохода'
      },

      // Общие задачи по рекламе (Германия)
      {
        title: 'Marketing Budget irespect: €1000/мес',
        description: 'Google Ads €500, Facebook/Instagram €300, Content €200. CPC в Германии выше, но ROI 600%',
        business_id: irespectId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Marketing Agent',
        impact: 'Прогноз: €6000 выручки, 300 мастеров, 800 заказов. Немецкий рынок дороже но прибыльнее'
      },
      {
        title: 'Marketing Budget Ritual: €800/мес',
        description: 'SEO €300, Google Ads €300, Partnerschaften €200. ROI 1200% (выше чем в России)',
        business_id: ritualId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Marketing Agent',
        impact: 'Прогноз: €10К выручки, 40 заказов, средний чек €3500 (в 2x выше России)'
      },
      {
        title: 'Marketing Budget AIRES: €500/мес',
        description: 'App Store Ads €250, Google Ads €150, PR в немецких СМИ €100. Рост 15x',
        business_id: airesId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Marketing Agent',
        impact: 'Прогноз: 10К downloads/мес, 1000 premium подписок, MRR €5К'
      },
      {
        title: 'DSGVO Compliance für alle Projekte',
        description: 'Полная адаптация под GDPR/DSGVO. Cookie Consent, Datenschutz, Impressum. Обязательно для Германии',
        business_id: irespectId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Legal Agent',
        impact: 'Избежание штрафов до €20М, доверие немецких пользователей'
      },
      {
        title: 'Немецкая локализация всех продуктов',
        description: 'Профессиональный перевод UI, контента, SEO. Нанять native speaker для контента',
        business_id: irespectId,
        priority: 'high',
        status: 'pending',
        proposed_by: 'Product Manager',
        impact: 'Конверсия +50%. Немцы не любят плохие переводы'
      }
    ];

    // Добавляем задачи в базу
    const { data, error } = await supabase
      .from('decisions')
      .insert(tasks);

    if (error) {
      console.error('❌ Ошибка:', error);
      return;
    }

    console.log('✅ Успешно добавлено', tasks.length, 'маркетинговых задач для НЕМЕЦКОГО рынка!');
    console.log('\n📊 Задачи по бизнесам (Deutschland):');
    console.log('  - irespect: 6 задач (Handwerker-Marktplatz)');
    console.log('  - Ritual-Service24: 6 задач (Bestattungsservice + KI-Psychologe)');
    console.log('  - AIRES: 6 задач (Friedhofs-App)');
    console.log('  - Общие задачи: 5 задач (DSGVO, локализация)');
    console.log('\n💰 Общий рекламный бюджет: €2300/мес (выше для немецкого рынка)');
    console.log('📈 Прогноз общего дохода: €21К+/мес (ROI 900%)');
    console.log('💡 Средний чек в Германии на 150-200% выше чем в России');
    console.log('\n🇩🇪 Особенности немецкого рынка учтены:');
    console.log('  - DSGVO compliance обязателен');
    console.log('  - Немцы платят больше за качество');
    console.log('  - Доверие к технологиям выше');
    console.log('  - CPC дороже, но ROI лучше');
    console.log('\n🚀 Откройте dashboard чтобы увидеть все задачи!');

  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

addMarketingTasks();
