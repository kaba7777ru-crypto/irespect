'use client';

import { useState, useEffect } from 'react';
import { Agent, AgentCategory } from '@/app/types/agents';

export default function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory | 'all'>('all');
  const [taskInput, setTaskInput] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
  }, [selectedCategory]);

  const fetchAgents = async () => {
    try {
      const url = selectedCategory === 'all'
        ? '/api/agents'
        : `/api/agents?category=${selectedCategory}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setAgents(data.data);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendTask = async (agentId: string) => {
    if (!taskInput.trim()) return;

    try {
      const response = await fetch(`/api/agents/${agentId}/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskInput })
      });

      const data = await response.json();

      if (data.success) {
        alert('Задача успешно отправлена агенту!');
        setTaskInput('');
        setSelectedAgent(null);
      }
    } catch (error) {
      console.error('Error sending task:', error);
      alert('Ошибка при отправке задачи');
    }
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'idle': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'busy': return 'Занят';
      case 'idle': return 'Ожидает';
      case 'error': return 'Ошибка';
      case 'offline': return 'Оффлайн';
      default: return status;
    }
  };

  const categories: { value: AgentCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'Все агенты' },
    { value: 'analytics', label: 'Аналитика' },
    { value: 'financial', label: 'Финансы' },
    { value: 'marketing', label: 'Маркетинг' },
    { value: 'operations', label: 'Операции' },
    { value: 'technical', label: 'Технические' },
    { value: 'strategic', label: 'Стратегия' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Панель управления агентами</h1>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {agents.filter(a => a.status === 'active').length} активных
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {agents.filter(a => a.status === 'busy').length} занятых
          </span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat.value
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <div
            key={agent.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                <span className="text-sm text-gray-500 capitalize">{agent.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} animate-pulse`}></span>
                <span className="text-sm font-medium text-gray-700">
                  {getStatusText(agent.status)}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{agent.description}</p>

            {agent.currentTask && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-blue-600 font-medium mb-1">Текущая задача:</p>
                <p className="text-sm text-blue-900">{agent.currentTask}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Успешность</p>
                <p className="text-lg font-bold text-gray-900">{agent.metrics.successRate}%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Выполнено</p>
                <p className="text-lg font-bold text-gray-900">{agent.tasksCompleted}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">В очереди</p>
                <p className="text-lg font-bold text-gray-900">{agent.metrics.tasksInQueue}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Время отклика</p>
                <p className="text-lg font-bold text-gray-900">{agent.metrics.averageResponseTime}s</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Возможности:</p>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.map((cap, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedAgent(agent.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Отправить задачу
            </button>
          </div>
        ))}
      </div>

      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Отправить задачу агенту</h3>
            <textarea
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Опишите задачу для агента..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => sendTask(selectedAgent)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Отправить
              </button>
              <button
                onClick={() => {
                  setSelectedAgent(null);
                  setTaskInput('');
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
