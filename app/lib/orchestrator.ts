import Anthropic from '@anthropic-ai/sdk';
import { Agent, AgentTask } from '@/app/types/agents';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class AgentOrchestrator {
  private agents: Map<string, Agent> = new Map();
  private taskQueue: AgentTask[] = [];

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents() {
    // Инициализация базовых агентов
    const baseAgents: Agent[] = [
      {
        id: 'orchestrator-1',
        name: 'Orchestrator',
        category: 'strategic',
        status: 'active',
        description: 'Главный координатор всех агентов',
        tasksCompleted: 0,
        lastActive: new Date(),
        capabilities: ['coordination', 'delegation', 'monitoring'],
        metrics: {
          successRate: 100,
          averageResponseTime: 1.5,
          tasksInQueue: 0,
          errorCount: 0
        }
      },
      {
        id: 'analyst-1',
        name: 'Market Intelligence',
        category: 'analytics',
        status: 'active',
        description: 'Анализирует рынки и конкурентов',
        tasksCompleted: 0,
        lastActive: new Date(),
        capabilities: ['market research', 'competitor analysis', 'trend forecasting'],
        metrics: {
          successRate: 100,
          averageResponseTime: 3.2,
          tasksInQueue: 0,
          errorCount: 0
        }
      },
      {
        id: 'dev-1',
        name: 'Development Agent',
        category: 'technical',
        status: 'active',
        description: 'Разработка и код-ревью',
        tasksCompleted: 0,
        lastActive: new Date(),
        capabilities: ['coding', 'debugging', 'code review', 'architecture'],
        metrics: {
          successRate: 100,
          averageResponseTime: 4.5,
          tasksInQueue: 0,
          errorCount: 0
        }
      },
      {
        id: 'marketing-1',
        name: 'Marketing Agent',
        category: 'marketing',
        status: 'active',
        description: 'Маркетинговые стратегии и контент',
        tasksCompleted: 0,
        lastActive: new Date(),
        capabilities: ['content creation', 'SEO', 'social media', 'campaigns'],
        metrics: {
          successRate: 100,
          averageResponseTime: 2.8,
          tasksInQueue: 0,
          errorCount: 0
        }
      }
    ];

    baseAgents.forEach(agent => {
      this.agents.set(agent.id, agent);
    });
  }

  async delegateTask(task: AgentTask): Promise<string> {
    // Находим подходящего агента для задачи
    const agent = this.findBestAgent(task);

    if (!agent) {
      throw new Error('No suitable agent found for this task');
    }

    // Обновляем статус агента
    agent.status = 'busy';
    agent.metrics.tasksInQueue++;

    try {
      // Выполняем задачу через Claude API
      const result = await this.executeTask(agent, task);

      // Обновляем метрики
      agent.tasksCompleted++;
      agent.metrics.tasksInQueue--;
      agent.status = 'active';
      agent.lastActive = new Date();

      return result;
    } catch (error) {
      agent.metrics.errorCount++;
      agent.status = 'error';
      throw error;
    }
  }

  private findBestAgent(task: AgentTask): Agent | undefined {
    // Простая логика выбора агента по категории задачи
    const agents = Array.from(this.agents.values());

    // Приоритизируем агентов по статусу и загрузке
    const availableAgents = agents
      .filter(a => a.status !== 'error' && a.status !== 'offline')
      .sort((a, b) => {
        if (a.status === 'idle' && b.status !== 'idle') return -1;
        if (a.status !== 'idle' && b.status === 'idle') return 1;
        return a.metrics.tasksInQueue - b.metrics.tasksInQueue;
      });

    return availableAgents[0];
  }

  private async executeTask(agent: Agent, task: AgentTask): Promise<string> {
    const systemPrompt = this.getSystemPrompt(agent);

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Задача: ${task.title}\n\nОписание: ${task.description}\n\nПриоритет: ${task.priority}`
        }
      ],
    });

    const result = message.content[0].type === 'text' ? message.content[0].text : '';
    return result;
  }

  private getSystemPrompt(agent: Agent): string {
    const basePrompt = `Вы AI агент для автоматизации бизнеса. Ваша роль: ${agent.name}.
Описание: ${agent.description}
Возможности: ${agent.capabilities.join(', ')}`;

    // Специфичные промпты для разных типов агентов
    switch (agent.category) {
      case 'analytics':
        return `${basePrompt}\n\nВаша задача - предоставлять глубокую аналитику и инсайты на основе данных. Используйте статистические методы и четкие выводы.`;

      case 'technical':
        return `${basePrompt}\n\nВы эксперт в разработке ПО. Пишите качественный код, следуйте best practices, предлагайте оптимальные архитектурные решения.`;

      case 'marketing':
        return `${basePrompt}\n\nВы создаете эффективные маркетинговые стратегии. Фокусируйтесь на ROI, конверсиях и росте бизнеса.`;

      case 'financial':
        return `${basePrompt}\n\nВы управляете финансами бизнеса. Анализируйте прибыльность, оптимизируйте расходы, прогнозируйте доходы.`;

      case 'strategic':
        return `${basePrompt}\n\nВы стратегический лидер. Координируйте работу других агентов, принимайте ключевые решения, планируйте долгосрочное развитие.`;

      default:
        return basePrompt;
    }
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  async runAutonomousLoop(businessId: string): Promise<void> {
    // Автономный цикл для проактивной работы агентов
    console.log(`Starting autonomous loop for business: ${businessId}`);

    // Пример автономной задачи для аналитического агента
    const dailyAnalysis: AgentTask = {
      id: `task-${Date.now()}`,
      agentId: 'analyst-1',
      title: 'Ежедневный анализ метрик',
      description: 'Проанализировать ключевые метрики бизнеса за последние 24 часа',
      priority: 'high',
      status: 'pending',
      createdAt: new Date()
    };

    try {
      const result = await this.delegateTask(dailyAnalysis);
      console.log('Daily analysis completed:', result);
    } catch (error) {
      console.error('Error in autonomous loop:', error);
    }
  }
}

// Синглтон экземпляр
export const orchestrator = new AgentOrchestrator();
