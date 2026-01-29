# Настройка интеграции с Instagram

Полная инструкция по подключению автоматического постинга в Instagram.

## Шаг 1: Создать Facebook Developer App

1. Перейдите на https://developers.facebook.com/
2. Нажмите **My Apps** → **Create App**
3. Выберите тип: **Business**
4. Заполните:
   - App Name: "iRespect Marketing Bot"
   - App Contact Email: ваш email
5. Нажмите **Create App**

## Шаг 2: Настроить Instagram Basic Display

1. В Dashboard вашего приложения найдите **Add Products**
2. Найдите **Instagram** → **Set Up**
3. В разделе **Instagram Basic Display** нажмите **Create New App**
4. Заполните:
   - Display Name: "iRespect Bot"
   - Valid OAuth Redirect URIs: `https://yourdomain.com/auth/instagram/callback`
   - Deauthorize Callback URL: `https://yourdomain.com/auth/instagram/deauth`
   - Data Deletion Request URL: `https://yourdomain.com/auth/instagram/delete`

## Шаг 3: Получить Instagram Business Account ID

### Через Graph API Explorer:

1. Откройте https://developers.facebook.com/tools/explorer
2. Выберите ваше приложение
3. Запросите права (permissions):
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
4. Сгенерируйте Access Token
5. Выполните запрос:
   ```
   GET /me/accounts
   ```
6. Найдите вашу Facebook Page
7. Скопируйте `id` страницы
8. Выполните запрос:
   ```
   GET /{page-id}?fields=instagram_business_account
   ```
9. Скопируйте `instagram_business_account.id`

## Шаг 4: Получить Long-Lived Access Token

Краткосрочный токен действует 1 час. Нужен долгосрочный (60 дней):

1. В Graph API Explorer выполните:
   ```
   GET /oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}
   ```
2. Скопируйте новый `access_token`

## Шаг 5: Добавить credentials в .env.local

```env
# Instagram для irespect
INSTAGRAM_ACCESS_TOKEN_IRESPECT=your_long_lived_access_token
INSTAGRAM_ACCOUNT_ID_IRESPECT=your_instagram_business_account_id

# Instagram для Ritual-Service24
INSTAGRAM_ACCESS_TOKEN_RITUAL_SERVICE24=your_token
INSTAGRAM_ACCOUNT_ID_RITUAL_SERVICE24=your_account_id

# Instagram для AIRES
INSTAGRAM_ACCESS_TOKEN_AIRES=your_token
INSTAGRAM_ACCOUNT_ID_AIRES=your_account_id
```

## Шаг 6: Требования к изображениям

Instagram требует:
- **Изображения:** Минимум 320px, максимум 8192px по каждой стороне
- **Формат:** JPG или PNG
- **Aspect ratio:** От 4:5 до 1.91:1
- **Размер файла:** До 8 MB

**Рекомендации:**
- 1080x1080px для квадратных постов
- 1080x1350px для портретных
- 1080x566px для landscape

## Шаг 7: Загрузка изображений

Изображение должно быть доступно по URL. Варианты:

### A. Использовать Cloudinary (рекомендуется)

```bash
npm install cloudinary
```

```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Загрузить изображение
const result = await cloudinary.uploader.upload(imageFile, {
  folder: 'instagram-posts',
});

const imageUrl = result.secure_url;
```

### B. Использовать Vercel Blob Storage

```bash
npm install @vercel/blob
```

```typescript
import { put } from '@vercel/blob';

const blob = await put('post-image.jpg', imageFile, {
  access: 'public',
});

const imageUrl = blob.url;
```

## Шаг 8: Тестирование

Проверьте подключение:

```bash
curl -X GET "https://graph.facebook.com/v18.0/{your-account-id}?fields=username&access_token={your-token}"
```

Должен вернуть:
```json
{
  "username": "your_instagram_username",
  "id": "123456789"
}
```

## Пример использования в коде

```typescript
import { InstagramAPI } from '@/lib/integrations/instagram';

const instagram = new InstagramAPI({
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN_IRESPECT!,
  instagramBusinessAccountId: process.env.INSTAGRAM_ACCOUNT_ID_IRESPECT!,
});

// Опубликовать пост
const result = await instagram.publishPost({
  caption: 'Ваш текст поста #хештеги',
  imageUrl: 'https://yourdomain.com/images/post.jpg',
});

console.log('Опубликовано:', result.permalink);
```

## Важные замечания

1. **Rate Limits:**
   - Максимум 25 постов в день
   - Максимум 1 пост каждые 5 минут
   - Максимум 50 API запросов в час

2. **Продление токена:**
   - Long-lived token действует 60 дней
   - Нужно обновлять каждые 50 дней
   - Используйте задачу в cron или Vercel Cron Jobs

3. **Альтернатива: Instagram Graph API через Buffer/Hootsuite:**
   - Более простая настройка
   - Платная подписка
   - Меньше технических сложностей

## Troubleshooting

**Ошибка: "Invalid OAuth access token"**
- Проверьте срок действия токена
- Убедитесь что у приложения есть нужные права

**Ошибка: "Media could not be published"**
- Проверьте размер и формат изображения
- URL изображения должен быть публично доступен
- Aspect ratio должен быть корректным

**Ошибка: "Rate limit exceeded"**
- Подождите 1 час
- Уменьшите частоту постинга

## Полезные ссылки

- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- [Content Publishing](https://developers.facebook.com/docs/instagram-api/guides/content-publishing)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer)
- [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken)
