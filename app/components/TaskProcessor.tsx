'use client';

import { useState } from 'react';

interface ProcessResult {
  task_id: string;
  task_title: string;
  agent: string;
  status: string;
  preview: string;
}

export default function TaskProcessor() {
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ProcessResult[]>([]);
  const [error, setError] = useState('');

  const processAllTasks = async () => {
    setProcessing(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/tasks/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoProcess: true })
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results || []);
      } else {
        setError(data.error || 'Ошибка обработки задач');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Task Processor</h2>
          <p className="text-sm text-gray-500 mt-1">
            Автоматическая обработка маркетинговых задач AI агентами
          </p>
        </div>
        <button
          onClick={processAllTasks}
          disabled={processing}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            processing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
          }`}
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Обработка...
            </span>
          ) : (
            '🤖 Запустить AI агентов'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {processing && (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">AI агенты обрабатывают задачи...</p>
            <p className="text-sm text-gray-500 mt-2">Это может занять несколько минут</p>
          </div>
        </div>
      )}

      {results.length > 0 && !processing && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-600 text-2xl">✓</span>
            <h3 className="text-lg font-bold text-gray-900">
              Обработано задач: {results.length}
            </h3>
          </div>

          {results.map((result, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900">{result.task_title}</h4>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {result.status}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">Агент:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {result.agent}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {result.preview}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 <strong>Результаты сохранены</strong> в разделе "Activities".
              Полные отчеты агентов можно посмотреть там.
            </p>
          </div>
        </div>
      )}

      {!processing && results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Готовы к автоматизации?
          </h3>
          <p className="text-gray-600 mb-6">
            Нажмите кнопку выше, чтобы AI агенты начали обрабатывать ваши задачи
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-bold text-gray-900 mb-1">Marketing Agent</h4>
              <p className="text-sm text-gray-600">SEO, Ads, Content</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="text-3xl mb-2">💼</div>
              <h4 className="font-bold text-gray-900 mb-1">Sales Agent</h4>
              <p className="text-sm text-gray-600">B2B, Partnerships</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-bold text-gray-900 mb-1">Growth Agent</h4>
              <p className="text-sm text-gray-600">Viral, Referrals</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>⚡</span> Что делают AI агенты:
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Берут pending задачи из dashboard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Анализируют задачу с учетом специфики немецкого рынка</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Создают детальный план действий с конкретными шагами</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Рассчитывают метрики и ожидаемые результаты</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Сохраняют результаты в Activities для отслеживания</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
