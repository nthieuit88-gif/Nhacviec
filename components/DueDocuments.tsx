import React from 'react';
import { FileWarning, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Document } from '../types';

interface DueDocumentsProps {
  docs: Document[];
}

const DueDocuments: React.FC<DueDocumentsProps> = ({ docs }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FileWarning className="text-red-500" size={20} />
          Văn bản đến hạn
        </h3>
        <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-md">
          {docs.filter(d => d.urgent).length} Cấp bách
        </span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {docs.map((doc) => (
          <div 
            key={doc.id} 
            className={`
              p-4 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer relative overflow-hidden group
              ${doc.urgent 
                ? 'bg-red-50 border-red-200 shadow-sm shadow-red-100' 
                : 'bg-white border-gray-100 hover:border-gray-300'}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3 relative z-10">
              <h4 className={`font-bold text-sm line-clamp-2 pr-4 ${doc.urgent ? 'text-gray-900' : 'text-gray-700'}`}>
                {doc.title}
              </h4>
              {doc.urgent && (
                <AlertTriangle size={18} className="text-red-500 animate-pulse flex-shrink-0" />
              )}
            </div>
            
            {/* Time Progress Bar */}
            <div className="mb-3 relative z-10">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className={`${doc.urgent ? 'text-red-600' : 'text-orange-600'} flex items-center gap-1`}>
                  <Clock size={12} /> Còn {doc.timeLeft}
                </span>
                <span className="text-gray-500">Hạn: {doc.deadline}</span>
              </div>
              {/* Progress Background */}
              <div className="w-full bg-gray-200/60 rounded-full h-1.5 overflow-hidden">
                {/* Progress Indicator */}
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    doc.urgent ? 'bg-red-500' : 'bg-orange-400'
                  }`}
                  style={{ width: `${doc.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Call to action (Hover only) */}
            <div className="flex items-center gap-1 text-xs font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-3 right-4 transform translate-y-2 group-hover:translate-y-0">
              Xử lý ngay <ArrowRight size={12} />
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2 group">
        Xem tất cả văn bản
        <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default DueDocuments;
