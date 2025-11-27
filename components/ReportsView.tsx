import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Calendar
} from 'lucide-react';

const ReportsView = () => {
  // Mock Data for Charts
  const monthlyData = [
    { month: 'T6', tasks: 45, docs: 30 },
    { month: 'T7', tasks: 52, docs: 35 },
    { month: 'T8', tasks: 48, docs: 42 },
    { month: 'T9', tasks: 61, docs: 48 },
    { month: 'T10', tasks: 55, docs: 50 },
    { month: 'T11', tasks: 67, docs: 58 },
  ];

  const departmentData = [
    { name: 'Phòng Hành chính', completed: 85, total: 120, status: 'excellent' },
    { name: 'Phòng Kế toán', completed: 92, total: 95, status: 'excellent' },
    { name: 'Ban Quản lý dự án', completed: 45, total: 80, status: 'warning' },
    { name: 'Phòng IT', completed: 78, total: 60, status: 'good' },
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.tasks, d.docs)));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="text-indigo-600" />
            Báo cáo thống kê
          </h2>
          <p className="text-sm text-gray-500 mt-1">Tổng hợp hiệu suất làm việc và xử lý văn bản</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <Calendar size={16} />
            Tháng 11, 2025
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
            <Download size={16} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-indigo-50 to-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <CheckCircle2 size={20} />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} className="mr-1" /> +12.5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">142</h3>
            <p className="text-sm text-gray-500">Nhiệm vụ hoàn thành</p>
          </div>

          <div className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Users size={20} />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} className="mr-1" /> +5.2%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">92%</h3>
            <p className="text-sm text-gray-500">Tỷ lệ tham gia họp</p>
          </div>

          <div className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Clock size={20} />
              </div>
              <span className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} className="mr-1" /> -2.4%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">12</h3>
            <p className="text-sm text-gray-500">Văn bản chờ xử lý</p>
          </div>

          <div className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-red-50 to-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <AlertCircle size={20} />
              </div>
              <span className="text-xs font-medium text-gray-400">Tháng này</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">3</h3>
            <p className="text-sm text-gray-500">Quá hạn (Cần xử lý)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Biểu đồ năng suất (6 tháng gần nhất)</h3>
            
            <div className="h-64 flex items-end justify-between gap-4">
              {monthlyData.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full flex items-end justify-center gap-1 h-full relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 pointer-events-none">
                      Nhiệm vụ: {data.tasks} | Văn bản: {data.docs}
                    </div>

                    {/* Task Bar */}
                    <div 
                      className="w-1/3 bg-indigo-500 rounded-t-sm hover:bg-indigo-600 transition-all duration-500"
                      style={{ height: `${(data.tasks / maxValue) * 100}%` }}
                    ></div>
                    {/* Doc Bar */}
                    <div 
                      className="w-1/3 bg-blue-300 rounded-t-sm hover:bg-blue-400 transition-all duration-500"
                      style={{ height: `${(data.docs / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-500">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
                <span className="text-xs text-gray-500">Nhiệm vụ hoàn thành</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
                <span className="text-xs text-gray-500">Văn bản xử lý</span>
              </div>
            </div>
          </div>

          {/* Progress / Status */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Trạng thái công việc</h3>
            <p className="text-sm text-gray-500 mb-6">Tỷ lệ hoàn thành theo danh mục</p>

            <div className="space-y-6 flex-1">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-700">Đúng hạn</span>
                  <span className="text-indigo-600">75%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full w-3/4"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-700">Đang xử lý</span>
                  <span className="text-blue-500">15%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[15%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-700">Trễ hạn</span>
                  <span className="text-red-500">10%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full w-[10%]"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
               <h4 className="text-sm font-bold text-gray-800 mb-1">Nhận xét từ hệ thống</h4>
               <p className="text-xs text-gray-500 leading-relaxed">
                 Hiệu suất làm việc tháng này tăng <span className="text-green-600 font-bold">5.2%</span> so với tháng trước. Tỷ lệ văn bản tồn đọng giảm đáng kể.
               </p>
            </div>
          </div>
        </div>

        {/* Department Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100">
             <h3 className="text-lg font-bold text-gray-800">Hiệu suất theo phòng ban</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Phòng ban</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Tiến độ tổng thể</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">Nhiệm vụ</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {departmentData.map((dept, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{dept.name}</td>
                    <td className="px-6 py-4 w-1/3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              dept.completed >= 80 ? 'bg-green-500' : dept.completed >= 60 ? 'bg-blue-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${dept.completed}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-600">{dept.completed}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">{dept.total}</td>
                    <td className="px-6 py-4 text-right">
                       <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize
                         ${dept.status === 'excellent' ? 'bg-green-100 text-green-700' : 
                           dept.status === 'good' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}
                       `}>
                         {dept.status === 'excellent' ? 'Xuất sắc' : dept.status === 'good' ? 'Tốt' : 'Cần cố gắng'}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportsView;