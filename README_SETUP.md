# AI Business Ecosystem - Руководство по настройке

## Обзор системы

Эта система позволяет управлять 3 бизнесами одновременно с помощью AI агентов без участия людей.

### Созданные компоненты:

1. **API для управления агентами** - `/api/agents`
2. **GitHub интеграция** - `/api/github`
3. **Система оркестрации** - `/api/orchestrator`
4. **Dashboard для визуализации** - `AgentDashboard` компонент
5. **Code Viewer** - просмотр кода из GitHub

## Настройка окружения

### 1. Переменные окружения

Создайте файл `.env.local` и добавьте:

```env
# Anthropic API для AI агентов
ANTHROPIC_API_KEY=your_anthropic_api_key

# GitHub API для отображения кода (опционально)
GITHUB_TOKEN=your_github_personal_access_token

# Supabase (если используете БД)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Получение API ключей

#### Anthropic API Key:
1. Зарегистрируйтесь на https://console.anthropic.com
2. Создайте новый API ключ в разделе "API Keys"
3. Скопируйте ключ в `.env.local`

#### GitHub Token (для отображения кода):
1. Перейдите на https://github.com/settings/tokens
2. Создайте новый Personal Access Token (classic)
3. Выберите scope: `repo` (полный доступ к репозиториям)
4. Скопируйте токен в `.env.local`

### 3. Установка зависимостей

```bash
npm install
```

### 4. Запуск приложения

```bash
npm run dev
```

Откройте http://localhost:3000

## Использование системы

### 1. Управление агентами

```typescript
// GET - Получить всех агентов
fetch('/api/agents')

// POST - Создать нового агента
fetch('/api/agents', {
  method: 'POST',
  body: JSON.stringify({
    name: 'New Agent',
    category: 'analytics',
    description: 'Description',
    capabilities: ['analysis', 'reporting']
  })
})

// POST - Отправить задачу агенту
fetch('/api/agents/agent-id/task', {
  method: 'POST',
  body: JSON.stringify({
    task: 'Analyze sales data',
    priority: 'high'
  })
})
```

### 2. GitHub интеграция

```typescript
// Получить информацию о репозитории
fetch('/api/github/repo?owner=facebook&repo=react')

// Получить содержимое файла или директории
fetch('/api/github/contents?owner=facebook&repo=react&path=README.md')
```

### 3. Оркестратор агентов

```typescript
// Получить статус всех агентов
fetch('/api/orchestrator')

// Делегировать задачу автоматически
fetch('/api/orchestrator', {
  method: 'POST',
  body: JSON.stringify({
    action: 'delegate_task',
    data: {
      title: 'Market Analysis',
      description: 'Analyze competitor landscape',
      priority: 'high'
    }
  })
})

// Запустить автономный режим
fetch('/api/orchestrator', {
  method: 'POST',
  body: JSON.stringify({
    action: 'start_autonomous',
    data: { businessId: 'business-1' }
  })
})
```

## Архитектура агентов

### Категории агентов:

1. **Analytics** - Аналитика и метрики
2. **Financial** - Финансовое управление
3. **Marketing** - Маркетинг и продвижение
4. **Operations** - Операционная деятельность
5. **Technical** - Разработка и DevOps
6. **Strategic** - Стратегическое планирование

### Статусы агентов:

- `active` - Активен и готов к работе
- `busy` - Выполняет задачу
- `idle` - Ожидает задач
- `error` - Ошибка выполнения
- `offline` - Отключен

## Следующие шаги

### 1. Подключение к GitHub

Чтобы видеть код вашего проекта на сайте:

1. Создайте репозиторий на GitHub
2. Загрузите код: `git remote add origin https://github.com/username/repo.git`
3. Пушьте код: `git push -u origin main`
4. Используйте компонент `CodeViewer` для отображения

### 2. Добавление Supabase

Для хранения данных агентов и метрик:

1. Создайте проект на https://supabase.com
2. Выполните SQL из файла `supabase-schema.sql`
3. Добавьте ключи в `.env.local`
4. Обновите API endpoints для работы с Supabase

### 3. Расширение функционала

- Добавьте новых агентов в `orchestrator.ts`
- Создайте специализированные промпты для каждого бизнеса
- Добавьте webhook'и для автоматического запуска задач
- Интегрируйте с внешними API (Stripe, email, SMS)

## Рекомендуемые инструменты

Минимальный стек для начала:

1. ✅ Anthropic Claude API - AI агенты
2. ✅ GitHub - версионирование кода
3. ✅ Vercel - хостинг (бесплатно)
4. Supabase - база данных (опционально)
5. Upstash Redis - кеширование (опционально)

## Структура проекта

```
business-dashboard/
├── app/
│   ├── api/
│   │   ├── agents/          # API управления агентами
│   │   ├── github/          # GitHub интеграция
│   │   └── orchestrator/    # Система оркестрации
│   ├── components/
│   │   ├── AgentDashboard.tsx   # Dashboard агентов
│   │   └── CodeViewer.tsx       # Просмотр кода
│   ├── lib/
│   │   └── orchestrator.ts      # Логика оркестрации
│   └── types/
│       └── agents.ts            # TypeScript типы
└── .env.local                   # Переменные окружения
```

## Поддержка

Для вопросов и проблем создавайте issue в GitHub репозитории.

## Лицензия

MIT
