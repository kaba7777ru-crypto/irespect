'use client';

import { brandColors, businessNames, type BusinessId } from '@/app/styles/brand-colors';

interface BrandedBusinessCardProps {
  businessId: BusinessId;
  revenue: number;
  users: number;
  growth: number;
  status: 'planning' | 'launched' | 'scaling';
  onClick?: () => void;
}

export default function BrandedBusinessCard({
  businessId,
  revenue,
  users,
  growth,
  status,
  onClick
}: BrandedBusinessCardProps) {
  const colors = brandColors[businessId];
  const info = businessNames[businessId];

  const statusConfig = {
    planning: { text: 'Planung', bg: 'bg-yellow-100', textColor: 'text-yellow-800' },
    launched: { text: 'Gestartet', bg: 'bg-green-100', textColor: 'text-green-800' },
    scaling: { text: 'Skalierung', bg: 'bg-blue-100', textColor: 'text-blue-800' }
  };

  const statusInfo = statusConfig[status];

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      style={{ backgroundColor: colors.light }}
    >
      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
        }}
      />

      {/* Content */}
      <div className="relative p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: colors.primary }}
            >
              {info.full}
            </h2>
            <p className="text-sm text-gray-600">{info.tagline}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.textColor}`}>
            {statusInfo.text}
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Revenue */}
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.primary + '15' }}
          >
            <p className="text-xs text-gray-600 mb-1">Umsatz/Monat</p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              €{(revenue / 1000).toFixed(1)}K
            </p>
          </div>

          {/* Users */}
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.primary + '15' }}
          >
            <p className="text-xs text-gray-600 mb-1">Nutzer</p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              {users.toLocaleString()}
            </p>
          </div>

          {/* Growth */}
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.primary + '15' }}
          >
            <p className="text-xs text-gray-600 mb-1">Wachstum</p>
            <p
              className="text-2xl font-bold flex items-center gap-1"
              style={{ color: growth >= 0 ? '#10B981' : '#EF4444' }}
            >
              {growth >= 0 ? '↗' : '↘'} {Math.abs(growth)}%
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-6">
          {info.description}
        </p>

        {/* CTA Button */}
        <button
          className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform group-hover:scale-105"
          style={{
            backgroundColor: colors.primary,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colors.hover;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary;
          }}
        >
          Dashboard öffnen →
        </button>

        {/* Decorative Element */}
        <div
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-5"
          style={{ backgroundColor: colors.primary }}
        />
      </div>
    </div>
  );
}
