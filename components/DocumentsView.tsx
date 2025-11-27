import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreVertical, 
  FileText, 
  AlertTriangle, 
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { Document } from '../types';

interface DocumentsViewProps {
  docs: Document[];
}

const DocumentsView: React.FC<DocumentsViewProps> = ({ docs }) => {
  const [filter, setFilter] = useState('all'); // all, urgent, processing, completed

  const getStatusColor = (progress: number, urgent: boolean) => {
    if (progress === 100) return 'text-green-600 bg-green-50';
    if (urgent) return 'text-red-600 bg-red-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getStatusText = (progress: number, urgent: boolean) => {
    if (progress === 100) return 'Hoàn thành';
    if (urgent) return 'Gấp';
    return 'Đang xử lý';
  };

  const filteredDocs = docs.filter(doc => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return doc.urgent;
    if (filter === 'processing') return doc.progress < 100 && !doc.urgent;
    if (filter === 'completed') return doc.progress === 100;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
      {/* Header Toolbar */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-indigo-600" />
            Quản lý văn bản
          </h2>
          <p className="text-sm text-gray-500 mt-1">Theo dõi tiến độ và xử lý văn bản đến hạn</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm văn bản..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Tabs / Filters */}
      <div className="px-6 py-3 border-b border-gray-100 flex gap-6 overflow-x-auto custom-scrollbar">
        {['all', 'urgent', 'processing', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`
              pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap capitalize
              ${filter === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}
            `}
          >
            {tab === 'all' ? 'Tất cả' : tab === 'urgent' ? 'Cấp bách' : tab === 'processing' ? 'Đang xử lý' : 'Hoàn thành'}
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-50/50 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[40%]">Tên văn bản / Trích yếu</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  Hạn xử lý <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  Tiến độ <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 p-2 rounded-lg flex-shrink-0 ${doc.urgent ? 'bg-red-100 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      {doc.urgent ? <AlertTriangle size={18} /> : <FileText size={18} />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${doc.urgent ? 'text-gray-900' : 'text-gray-700'} line-clamp-2`}>
                        {doc.title}
                      </h4>
                      <span className="text-xs text-gray-500 mt-1 block">ID: VB-{2024000 + doc.id} • Ban hành: UBND TP</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium ${doc.urgent ? 'text-red-600' : 'text-gray-700'}`}>
                      {doc.deadline}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={12} /> Còn {doc.timeLeft}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.progress, doc.urgent)}`}>
                    {getStatusText(doc.progress, doc.urgent)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${doc.urgent ? 'bg-red-500' : doc.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'}`} 
                        style={{ width: `${doc.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600 w-8 text-right">{doc.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Xem chi tiết">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Tải xuống">
                      <Download size={18} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination */}
      <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 bg-gray-50/30 gap-4">
        <span>Hiển thị {filteredDocs.length} trên tổng số {filteredDocs.length} văn bản</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 transition-colors bg-white">Trước</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-white transition-colors bg-white">2</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-white transition-colors bg-white">3</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-white transition-colors bg-white">Sau</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsView;