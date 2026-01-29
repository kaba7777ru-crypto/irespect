// Готовые сценарии использования AI-маркетинга
// для разных бизнес-задач

export interface MarketingScenario {
  id: string;
  category: 'advertising' | 'content' | 'business_communication' | 'other';
  title: string;
  description: string;
  prompt: string;
  platforms: ('instagram' | 'facebook' | 'linkedin' | 'telegram')[];
  frequency?: 'daily' | 'weekly' | 'monthly';
  businesses: ('irespect' | 'Ritual-Service24' | 'AIRES')[];
}

export const marketingScenarios: MarketingScenario[] = [
  // ============================================
  // РЕКЛАМА И МОНЕТИЗАЦИЯ (6)
  // ============================================
  {
    id: 'promo-new-service',
    category: 'advertising',
    title: 'Промо нового сервиса',
    description: 'Анонс запуска новой функции или услуги',
    prompt: 'Создай продающий пост о запуске новой услуги. Подчеркни выгоды для клиентов, добавь призыв к действию и специальное предложение для первых пользователей.',
    platforms: ['instagram', 'facebook', 'linkedin'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'discount-campaign',
    category: 'advertising',
    title: 'Акция со скидкой',
    description: 'Пост о специальном предложении или скидке',
    prompt: 'Создай рекламный пост об акции со скидкой 20% на услуги. Укажи срок действия, условия, и как воспользоваться предложением. Добавь sense of urgency.',
    platforms: ['instagram', 'facebook', 'telegram'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24'],
  },
  {
    id: 'testimonial-showcase',
    category: 'advertising',
    title: 'Отзыв клиента',
    description: 'История успеха клиента с эмоциональным откликом',
    prompt: 'Напиши пост с отзывом довольного клиента. Включи конкретные результаты, эмоции, и как наш сервис помог решить проблему. Сделай текст искренним и трогательным.',
    platforms: ['instagram', 'facebook', 'linkedin'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'before-after',
    category: 'advertising',
    title: 'До/После',
    description: 'Демонстрация трансформации или результата',
    prompt: 'Создай пост в формате "до/после" показывающий результаты использования нашего сервиса. Подчеркни измеримые улучшения и добавь social proof.',
    platforms: ['instagram', 'facebook'],
    frequency: 'weekly',
    businesses: ['irespect', 'AIRES'],
  },
  {
    id: 'limited-offer',
    category: 'advertising',
    title: 'Ограниченное предложение',
    description: 'Срочная акция с дедлайном',
    prompt: 'Создай срочный продающий пост об ограниченном предложении (только 3 дня). Используй FOMO (fear of missing out), укажи точное время окончания акции.',
    platforms: ['instagram', 'telegram'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24'],
  },
  {
    id: 'upsell-premium',
    category: 'advertising',
    title: 'Апсел премиум-услуги',
    description: 'Предложение перейти на расширенный тариф',
    prompt: 'Создай пост о премиум-тарифе нашего сервиса. Сравни базовый и премиум план, покажи дополнительную ценность, добавь ограниченное предложение для апгрейда.',
    platforms: ['linkedin', 'facebook'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },

  // ============================================
  // УПРАВЛЕНИЕ КОНТЕНТОМ (5)
  // ============================================
  {
    id: 'educational-tips',
    category: 'content',
    title: 'Полезные советы',
    description: 'Образовательный контент с ценными советами',
    prompt: 'Создай образовательный пост с 5 полезными советами по нашей тематике. Сделай контент практичным, легко применимым, добавь примеры.',
    platforms: ['instagram', 'linkedin', 'telegram'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'behind-scenes',
    category: 'content',
    title: 'За кулисами',
    description: 'Показать как работает команда или процесс',
    prompt: 'Напиши пост "за кулисами" нашей работы. Покажи человеческую сторону бизнеса, команду, процессы. Создай эмоциональную связь с аудиторией.',
    platforms: ['instagram', 'facebook'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'industry-news',
    category: 'content',
    title: 'Новости индустрии',
    description: 'Комментарий к актуальным событиям в отрасли',
    prompt: 'Создай пост о недавних изменениях или новостях в нашей индустрии. Дай экспертный комментарий, объясни как это влияет на клиентов.',
    platforms: ['linkedin', 'facebook', 'telegram'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'faq-answer',
    category: 'content',
    title: 'Ответ на частый вопрос',
    description: 'Развернутый ответ на популярный вопрос',
    prompt: 'Напиши подробный ответ на самый частый вопрос от клиентов. Объясни просто и понятно, добавь примеры, развей мифы если есть.',
    platforms: ['instagram', 'telegram', 'facebook'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'case-study',
    category: 'content',
    title: 'Кейс-стади',
    description: 'Детальный разбор успешного проекта',
    prompt: 'Создай подробный кейс-стади с реальным проектом. Опиши проблему, наше решение, процесс, результаты с цифрами. Структурируй в формате story.',
    platforms: ['linkedin', 'facebook', 'telegram'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },

  // ============================================
  // БИЗНЕС-ПЕРЕПИСКА (3)
  // ============================================
  {
    id: 'partnership-proposal',
    category: 'business_communication',
    title: 'Предложение партнерства',
    description: 'Пост для привлечения потенциальных партнеров',
    prompt: 'Создай пост-приглашение к партнерству. Опиши выгоды сотрудничества, кого мы ищем, условия, как связаться. Сделай профессионально и привлекательно.',
    platforms: ['linkedin', 'telegram'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'hiring-announcement',
    category: 'business_communication',
    title: 'Вакансия в команду',
    description: 'Объявление об открытой позиции',
    prompt: 'Напиши привлекательное объявление о вакансии. Опиши позицию, требования, что предлагаем, почему круто работать у нас. Добавь культуру компании.',
    platforms: ['linkedin', 'facebook', 'telegram'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'company-milestone',
    category: 'business_communication',
    title: 'Достижение компании',
    description: 'Празднование важной вехи или результата',
    prompt: 'Создай праздничный пост о достижении компании (например 1000 клиентов, годовщина). Поблагодари клиентов, команду, поделись цифрами роста.',
    platforms: ['instagram', 'facebook', 'linkedin', 'telegram'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },

  // ============================================
  // ДРУГОЕ (5)
  // ============================================
  {
    id: 'seasonal-greeting',
    category: 'other',
    title: 'Сезонное поздравление',
    description: 'Пост к празднику или важной дате',
    prompt: 'Напиши теплое поздравление с праздником. Свяжи праздник с нашей тематикой, пожелай что-то искреннее, можно добавить специальное предложение.',
    platforms: ['instagram', 'facebook', 'telegram'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'community-engagement',
    category: 'other',
    title: 'Вовлечение сообщества',
    description: 'Интерактивный пост с вопросом или опросом',
    prompt: 'Создай вовлекающий пост с вопросом к аудитории. Попроси поделиться мнением, опытом, голосованием. Сделай так чтобы хотелось ответить.',
    platforms: ['instagram', 'facebook', 'telegram'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'motivational-quote',
    category: 'other',
    title: 'Мотивационная цитата',
    description: 'Вдохновляющая цитата с комментарием',
    prompt: 'Создай пост с мотивационной цитатой релевантной нашей аудитории. Добавь свой комментарий, как эта мысль связана с нашим сервисом.',
    platforms: ['instagram', 'facebook'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'product-update',
    category: 'other',
    title: 'Обновление продукта',
    description: 'Анонс новых функций или улучшений',
    prompt: 'Напиши пост об обновлении продукта. Опиши новые функции, как они помогут пользователям, когда доступны. Добавь screenshot или описание UI.',
    platforms: ['instagram', 'facebook', 'telegram'],
    frequency: 'monthly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
  {
    id: 'user-generated-content',
    category: 'other',
    title: 'Контент от пользователей',
    description: 'Репост или showcasing контента клиентов',
    prompt: 'Создай пост показывающий как клиенты используют наш сервис. Поблагодари автора, попроси остальных поделиться своим опытом с хештегом.',
    platforms: ['instagram', 'facebook'],
    frequency: 'weekly',
    businesses: ['irespect', 'Ritual-Service24', 'AIRES'],
  },
];

// Получить сценарии по категории
export function getScenariosByCategory(category: MarketingScenario['category']): MarketingScenario[] {
  return marketingScenarios.filter(s => s.category === category);
}

// Получить популярные сценарии (с highest frequency)
export function getPopularScenarios(): MarketingScenario[] {
  return marketingScenarios
    .filter(s => s.frequency === 'weekly' || s.frequency === 'daily')
    .slice(0, 6);
}

// Получить сценарии для конкретного бизнеса
export function getScenariosForBusiness(business: 'irespect' | 'Ritual-Service24' | 'AIRES'): MarketingScenario[] {
  return marketingScenarios.filter(s => s.businesses.includes(business));
}

// Получить сценарии для конкретной платформы
export function getScenariosForPlatform(platform: 'instagram' | 'facebook' | 'linkedin' | 'telegram'): MarketingScenario[] {
  return marketingScenarios.filter(s => s.platforms.includes(platform));
}

// Категории с переводами
export const categoryLabels = {
  advertising: 'Реклама и монетизация',
  content: 'Управление контентом',
  business_communication: 'Бизнес-переписка',
  other: 'Другое',
};

// Подсчет сценариев по категориям
export function getCategoryCounts() {
  return {
    popular: getPopularScenarios().length,
    all: marketingScenarios.length,
    advertising: getScenariosByCategory('advertising').length,
    content: getScenariosByCategory('content').length,
    business_communication: getScenariosByCategory('business_communication').length,
    other: getScenariosByCategory('other').length,
  };
}
