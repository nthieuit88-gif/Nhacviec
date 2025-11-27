import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  PieChart, 
  Settings, 
  LucideIcon 
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
      ${active ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
    `}
  >
    <Icon size={20} className={`${active ? 'text-indigo-300' : 'group-hover:text-indigo-300'} transition-colors`} />
    <span className="font-medium flex-1 text-left text-sm tracking-wide">{label}</span>
    {badge && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
        {badge}
      </span>
    )}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-[#1e1b4b] text-white flex flex-col shadow-2xl flex-shrink-0 z-30 h-full">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/50">
          TF
        </div>
        <span className="text-xl font-bold tracking-wide">TaskFlow</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        <NavItem 
          icon={LayoutDashboard} 
          label="Tổng quan" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
        />
        <NavItem 
          icon={Calendar} 
          label="Lịch công tác" 
          active={activeTab === 'calendar'} 
          onClick={() => setActiveTab('calendar')} 
        />
        <NavItem 
          icon={FileText} 
          label="Văn bản đến hạn" 
          active={activeTab === 'docs'} 
          onClick={() => setActiveTab('docs')} 
          badge={3}
        />
        <NavItem 
          icon={PieChart} 
          label="Báo cáo & Thống kê" 
          active={activeTab === 'reports'} 
          onClick={() => setActiveTab('reports')} 
        />
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-white/10">
        <NavItem 
          icon={Settings} 
          label="Cài đặt hệ thống" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
        />
        <div className="mt-6 flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
          <img src="https://picsum.photos/150" alt="User" className="w-9 h-9 rounded-full border-2 border-indigo-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Nguyễn Văn A</p>
            <p className="text-xs text-gray-400 truncate">Quản trị viên</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;