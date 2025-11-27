import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

interface HeaderProps {
  setIsModalOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsModalOpen }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Xin chào, Admin! 👋</h2>
          <p className="text-sm text-gray-500 hidden sm:block">Thứ Năm, 27 tháng 11, 2025</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 rounded-full px-4 py-2 transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-gray-700 placeholder-gray-400" 
          />
        </div>
        
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors group">
          <Bell size={20} className="group-hover:text-gray-700" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 hover:shadow-indigo-500/40 active:translate-y-0"
        >
          <Plus size={18} />
          <span>Thêm mới</span>
        </button>
      </div>
    </header>
  );
};

export default Header;