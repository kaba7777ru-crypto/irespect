'use client';

import { motion } from 'framer-motion';
import { FileText, Folder, Search, Download, Star, Clock, Users } from 'lucide-react';
import { useState } from 'react';

interface Document {
  id: number;
  name: string;
  type: string;
  category: 'Стратегия' | 'Финансы' | 'Маркетинг' | 'Техническое' | 'HR';
  business: 'irespect' | 'Ritual-Service24' | 'AIRES' | 'Общее';
  size: string;
  modified: string;
  starred: boolean;
  icon: any;
  color: string;
}

const documents: Document[] = [
  {
    id: 1,
    name: 'Бизнес-план irespect 2026',
    type: 'PDF',
    category: 'Стратегия',
    business: 'irespect',
    size: '2.4 MB',
    modified: '2 дня назад',
    starred: true,
    icon: FileText,
    color: 'text-[#007AFF] bg-[#007AFF]/10',
  },
  {
    id: 2,
    name: 'Финансовая модель Ritual-Service24',
    type: 'XLSX',
    category: 'Финансы',
    business: 'Ritual-Service24',
    size: '1.2 MB',
    modified: '5 дней назад',
    starred: true,
    icon: FileText,
    color: 'text-[#34C759] bg-[#34C759]/10',
  },
  {
    id: 3,
    name: 'MVP спецификация AIRES',
    type: 'PDF',
    category: 'Техническое',
    business: 'AIRES',
    size: '890 KB',
    modified: '1 неделю назад',
    starred: false,
    icon: FileText,
    color: 'text-[#AF52DE] bg-[#AF52DE]/10',
  },
  {
    id: 4,
    name: 'Маркетинговая стратегия Q2',
    type: 'DOCX',
    category: 'Маркетинг',
    business: 'Общее',
    size: '560 KB',
    modified: '3 дня назад',
    starred: true,
    icon: FileText,
    color: 'text-[#FF9500] bg-[#FF9500]/10',
  },
  {
    id: 5,
    name: 'Анализ конкурентов',
    type: 'PDF',
    category: 'Маркетинг',
    business: 'irespect',
    size: '3.1 MB',
    modified: '1 день назад',
    starred: false,
    icon: FileText,
    color: 'text-[#007AFF] bg-[#007AFF]/10',
  },
  {
    id: 6,
    name: 'План найма на 2026',
    type: 'XLSX',
    category: 'HR',
    business: 'Общее',
    size: '420 KB',
    modified: '1 неделю назад',
    starred: false,
    icon: FileText,
    color: 'text-[#FF3B30] bg-[#FF3B30]/10',
  },
  {
    id: 7,
    name: 'Техническая архитектура AIRES',
    type: 'PDF',
    category: 'Техническое',
    business: 'AIRES',
    size: '1.8 MB',
    modified: '4 дня назад',
    starred: true,
    icon: FileText,
    color: 'text-[#AF52DE] bg-[#AF52DE]/10',
  },
  {
    id: 8,
    name: 'P&L прогноз 2026',
    type: 'XLSX',
    category: 'Финансы',
    business: 'Общее',
    size: '780 KB',
    modified: '2 дня назад',
    starred: true,
    icon: FileText,
    color: 'text-[#34C759] bg-[#34C759]/10',
  },
];

const categories = ['Все', 'Стратегия', 'Финансы', 'Маркетинг', 'Техническое', 'HR'];
const businesses = ['Все', 'irespect', 'Ritual-Service24', 'AIRES', 'Общее'];

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedBusiness, setSelectedBusiness] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'Все' || doc.category === selectedCategory;
    const matchesBusiness = selectedBusiness === 'Все' || doc.business === selectedBusiness;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBusiness && matchesSearch;
  });

  const starredCount = documents.filter((d) => d.starred).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF9500] to-[#FF6B00] rounded-3xl flex items-center justify-center text-4xl shadow-lg">
            📄
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Документы</h1>
            <p className="text-xl text-[#86868B] dark:text-[#98989D]">
              {documents.length} документов • {starredCount} избранных
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm mb-6"
      >
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#86868B]" size={20} />
          <input
            type="text"
            placeholder="Поиск документов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] border-none rounded-xl text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] focus:ring-2 focus:ring-[#007AFF] transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-xs text-[#86868B] dark:text-[#98989D] mb-2 font-medium">Категория</p>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#007AFF] text-white'
                      : 'bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E5E5EA] dark:hover:bg-[#3A3A3C]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-[#86868B] dark:text-[#98989D] mb-2 font-medium">Бизнес</p>
            <div className="flex gap-2">
              {businesses.map((business) => (
                <button
                  key={business}
                  onClick={() => setSelectedBusiness(business)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedBusiness === business
                      ? 'bg-[#007AFF] text-white'
                      : 'bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E5E5EA] dark:hover:bg-[#3A3A3C]'
                  }`}
                >
                  {business}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc, index) => {
          const Icon = doc.icon;
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-[#D2D2D7] dark:border-[#38383A] shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
              {/* Icon & Star */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${doc.color} flex items-center justify-center`}>
                  <Icon size={28} />
                </div>
                <button className="p-2 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-lg transition-all">
                  <Star
                    size={20}
                    className={doc.starred ? 'text-[#FF9500] fill-[#FF9500]' : 'text-[#86868B]'}
                  />
                </button>
              </div>

              {/* Document Info */}
              <h4 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2 line-clamp-2">
                {doc.name}
              </h4>
              <p className="text-sm text-[#86868B] dark:text-[#98989D] mb-4">{doc.business}</p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-[#86868B] dark:text-[#98989D] mb-4">
                <span>{doc.type}</span>
                <span>{doc.size}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-[#86868B]" />
                <span className="text-xs text-[#86868B] dark:text-[#98989D]">{doc.modified}</span>
              </div>

              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-3 py-1 bg-[#007AFF]/10 text-[#007AFF] rounded-lg">
                  {doc.category}
                </span>
                <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-lg transition-all">
                  <Download size={18} className="text-[#007AFF]" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <FileText size={64} className="text-[#86868B] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">
            Документы не найдены
          </h3>
          <p className="text-[#86868B] dark:text-[#98989D]">
            Попробуйте изменить фильтры или поисковый запрос
          </p>
        </motion.div>
      )}

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-[#007AFF] to-[#AF52DE] rounded-3xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Загрузите новые документы</h3>
            <p className="text-white/90">
              Добавьте планы, отчёты и исследования для централизованного хранения
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-[#007AFF] rounded-xl font-semibold hover:bg-opacity-90 transition-all">
            Загрузить
          </button>
        </div>
      </motion.div>
    </div>
  );
}
