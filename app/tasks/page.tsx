import TaskProcessor from '../components/TaskProcessor';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Task Automation
          </h1>
          <p className="text-gray-600">
            Автоматическая обработка маркетинговых задач с помощью AI агентов
          </p>
        </div>

        <TaskProcessor />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">📈 ROI</h3>
              <span className="text-3xl font-bold text-green-600">900%</span>
            </div>
            <p className="text-sm text-gray-600">
              Ожидаемый ROI при бюджете €2300/мес
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">💰 Доход</h3>
              <span className="text-3xl font-bold text-blue-600">€21K+</span>
            </div>
            <p className="text-sm text-gray-600">
              Прогноз месячного дохода
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">🤖 Агенты</h3>
              <span className="text-3xl font-bold text-purple-600">10+</span>
            </div>
            <p className="text-sm text-gray-600">
              Специализированных AI агентов
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
