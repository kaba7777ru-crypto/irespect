import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if API key is set
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          message: "Чтобы включить AI чат, добавьте ваш Anthropic API ключ в .env.local:\n\nANTHROPIC_API_KEY=ваш_ключ\n\nПолучите ключ на: https://console.anthropic.com/"
        },
        { status: 200 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Convert messages to Anthropic format
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 1024,
      system: `Ты — полезный AI бизнес-консультант для команды из трех основателей (Рудольф, Женя, Витя), управляющих тремя бизнесами:

1. irespect - Маркетплейс услуг (запущен, €20К MRR)
2. Ritual-Service24 - Похоронные услуги + AI психолог (в планах, прогноз €10К MRR)
3. AIRES - Мобильное приложение для каталога могил (в планах, €1К MRR)

Ты помогаешь с:
- Стратегическими решениями и бизнес-планированием
- Интерпретацией аналитики и метрик
- Техническими архитектурными советами
- Маркетингом и стратегиями роста
- Финансовым планированием и прогнозами

Будь лаконичным, практичным и поддерживающим. Фокусируйся на практических советах. Отвечай на русском языке.`,
      messages: formattedMessages,
    });

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Извините, не удалось сгенерировать ответ.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error('Error calling Claude API:', error);
    return NextResponse.json(
      { message: `Ошибка: ${error.message || 'Что-то пошло не так'}` },
      { status: 500 }
    );
  }
}
