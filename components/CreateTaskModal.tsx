import React from 'react';
import { X, Calendar, Clock, AlignLeft } from 'lucide-react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, initialDate }) => {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden transform transition-all animate-[scaleIn_0.2s_ease-out]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">Thêm nhiệm vụ mới</h3>
            <p className="text-indigo-100 text-sm mt-1">Tạo nhắc nhở hoặc tải lên văn bản</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tiêu đề nhiệm vụ/Văn bản</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full pl-4 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                placeholder="Nhập tên nhiệm vụ..." 
                autoFocus
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                <Calendar size={14} className="text-gray-400" /> Ngày hết hạn
              </label>
              <input 
                type="date" 
                defaultValue={initialDate ? formatDate(initialDate) : ''}
                key={initialDate ? initialDate.toISOString() : 'default-date'}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-600" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                <Clock size={14} className="text-gray-400" /> Giờ
              </label>
              <input 
                type="time" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-600" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ ưu tiên</label>
            <div className="flex gap-3">
              <label className="flex-1 cursor-pointer group">
                <input type="radio" name="priority" className="peer sr-only" defaultChecked />
                <div className="text-center py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 peer-checked:bg-green-50 peer-checked:text-green-700 peer-checked:border-green-500 peer-checked:shadow-sm transition-all group-hover:border-gray-300">
                  Bình thường
                </div>
              </label>
              <label className="flex-1 cursor-pointer group">
                <input type="radio" name="priority" className="peer sr-only" />
                <div className="text-center py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 peer-checked:bg-orange-50 peer-checked:text-orange-700 peer-checked:border-orange-500 peer-checked:shadow-sm transition-all group-hover:border-gray-300">
                  Gấp
                </div>
              </label>
              <label className="flex-1 cursor-pointer group">
                <input type="radio" name="priority" className="peer sr-only" />
                <div className="text-center py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 peer-checked:bg-red-50 peer-checked:text-red-700 peer-checked:border-red-500 peer-checked:shadow-sm transition-all group-hover:border-gray-300">
                  Rất gấp
                </div>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
              <AlignLeft size={14} className="text-gray-400" /> Ghi chú thêm
            </label>
            <textarea 
              rows={3} 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-gray-600" 
              placeholder="Chi tiết nội dung..."
            ></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 pt-2 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-transparent hover:border-gray-200"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 active:scale-95"
          >
            Lưu nhiệm vụ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;