import React from 'react';
import { StatItem } from '../types';

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-lg hover:border-indigo-100 transition-all cursor-pointer group"
        >
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1 group-hover:scale-105 transition-transform origin-left">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} transition-transform group-hover:rotate-6`}>
            <stat.icon size={24} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
