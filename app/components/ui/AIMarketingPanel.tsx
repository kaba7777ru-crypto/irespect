'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Send, Copy, Check } from 'lucide-react';

type BusinessName = 'irespect' | 'Ritual-Service24' | 'AIRES';
type Platform = 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'telegram';

interface GeneratedContent {
  title?: string;
  content: string;
  hashtags?: string[];
  callToAction?: string;
  imagePrompt?: string;
}

export default function AIMarketingPanel() {
  const [business, setBusiness] = useState<BusinessName>('irespect');
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'single',
          business,
          platform,
          topic: topic || undefined,
          contentType: 'social_post',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setGeneratedContent(result.data.content);
      } else {
        alert('Ошибка: ' + result.error);
      }
    } catch (error) {
      console.error('Generation error:', error);
      alert('Не удалось сгенерировать контент');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;

    const fullText = `${generatedContent.title ? generatedContent.title + '\n\n' : ''}${generatedContent.content}\n\n${generatedContent.hashtags?.join(' ') || ''}${generatedContent.callToAction ? '\n\n' + generatedContent.callToAction : ''}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#AF52DE] to-[#8E44AD] flex items-center justify-center">
          <Sparkles size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
            AI Генератор Контента
          </h3>
          <p className="text-sm text-[#86868B] dark:text-[#98989D]">
            Автоматическое создание постов для соцсетей
          </p>
        </div>
      </div>

      {/* Настройки */}
      <div className="space-y-4 mb-6">
        {/* Выбор бизнеса */}
        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">
            Бизнес
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['irespect', 'Ritual-Service24', 'AIRES'] as BusinessName[]).map((b) => (
              <button
                key={b}
                onClick={() => setBusiness(b)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  business === b
                    ? 'bg-[#007AFF] text-white'
                    : 'bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E5E5EA]'
                }`}
              >
                {b === 'irespect' ? '💼 iRespect' : b === 'Ritual-Service24' ? '🕊️ Ritual' : '📱 AIRES'}
              </button>
            ))}
          </div>
        </div>

        {/* Выбор платформы */}
        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">
            Платформа
          </label>
          <div className="flex gap-2 flex-wrap">
            {(['instagram', 'facebook', 'linkedin', 'telegram'] as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-xl font-medium transition-all capitalize ${
                  platform === p
                    ? 'bg-[#AF52DE] text-white'
                    : 'bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E5E5EA]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Тема поста */}
        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">
            Тема (опционально)
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Например: новая функция приложения"
            className="w-full px-4 py-3 rounded-xl border border-[#D2D2D7] dark:border-[#38383A] bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
          />
        </div>

        {/* Кнопка генерации */}
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#007AFF] to-[#AF52DE] text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Генерирую контент...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Сгенерировать контент
            </>
          )}
        </button>
      </div>

      {/* Результат */}
      {generatedContent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Сгенерированный контент
            </h4>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-xl hover:bg-[#E5E5EA] transition-all"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-[#34C759]" />
                  <span className="text-sm font-medium text-[#34C759]">Скопировано!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span className="text-sm font-medium">Копировать</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl space-y-4">
            {generatedContent.title && (
              <div>
                <p className="text-xs font-semibold text-[#86868B] mb-1">ЗАГОЛОВОК</p>
                <p className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {generatedContent.title}
                </p>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-[#86868B] mb-1">ТЕКСТ</p>
              <p className="text-[#1D1D1F] dark:text-[#F5F5F7] whitespace-pre-wrap">
                {generatedContent.content}
              </p>
            </div>

            {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#86868B] mb-1">ХЕШТЕГИ</p>
                <p className="text-[#007AFF] font-medium">
                  {generatedContent.hashtags.join(' ')}
                </p>
              </div>
            )}

            {generatedContent.callToAction && (
              <div>
                <p className="text-xs font-semibold text-[#86868B] mb-1">ПРИЗЫВ К ДЕЙСТВИЮ</p>
                <p className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">
                  {generatedContent.callToAction}
                </p>
              </div>
            )}

            {generatedContent.imagePrompt && (
              <div>
                <p className="text-xs font-semibold text-[#86868B] mb-1">ИДЕЯ ДЛЯ ИЗОБРАЖЕНИЯ</p>
                <p className="text-[#86868B] dark:text-[#98989D] text-sm italic">
                  {generatedContent.imagePrompt}
                </p>
              </div>
            )}
          </div>

          {/* Действия */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#34C759] text-white rounded-xl font-semibold hover:bg-[#34C759]/90 transition-all">
              <Send size={18} />
              Опубликовать сейчас
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FF9500] text-white rounded-xl font-semibold hover:bg-[#FF9500]/90 transition-all">
              <Calendar size={18} />
              Запланировать
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
