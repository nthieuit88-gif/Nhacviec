import React, { useState } from 'react';
import { 
  FileText, 
  Calendar as CalendarIcon, 
  AlertTriangle,
  Plus
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import UpcomingTasks from './components/UpcomingTasks';
import DueDocuments from './components/DueDocuments';
import CreateTaskModal from './components/CreateTaskModal';
import CalendarView from './components/CalendarView';
import DocumentsView from './components/DocumentsView';
import ReportsView from './components/ReportsView';
import { Task, Document, StatItem, TabType } from './types';

const App = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Mock Data
  const stats: StatItem[] = [
    { label: 'Văn bản chờ xử lý', value: 12, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Hết hạn hôm nay', value: 3, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
    { label: 'Cuộc họp tuần này', value: 5, icon: CalendarIcon, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const tasks: Task[] = [
    { 
      id: 1, 
      date: 27, 
      month: 'Nov', 
      title: 'Họp giao ban Quý IV', 
      time: '14:00 - 16:00', 
      location: 'Phòng họp A', 
      urgent: true,
      status: 'Đang diễn ra',
      attendees: 12
    },
    { 
      id: 2, 
      date: 28, 
      month: 'Nov', 
      title: 'Kiểm tra tiến độ dự án Alpha', 
      time: '09:00 - 10:30', 
      location: 'Online (Zoom)', 
      urgent: false,
      status: 'Sắp tới',
      attendees: 5
    },
    { 
      id: 3, 
      date: 30, 
      month: 'Nov', 
      title: 'Tập huấn PCCC toàn đơn vị', 
      time: '08:00 - 11:30', 
      location: 'Sảnh chính', 
      urgent: false,
      status: 'Lên lịch',
      attendees: 45
    },
    { 
        id: 4, 
        date: 2, 
        month: 'Dec', 
        title: 'Báo cáo tổng kết năm', 
        time: '08:00 - 17:30', 
        location: 'Hội trường B', 
        urgent: false,
        status: 'Lên lịch',
        attendees: 120
      },
  ];

  const docs: Document[] = [
    { id: 1, title: 'CV số 452/UBND về PCCC', timeLeft: '4 giờ', deadline: '27/11', urgent: true, progress: 90 },
    { id: 2, title: 'Tờ trình ngân sách 2026', timeLeft: '2 ngày', deadline: '29/11', urgent: true, progress: 60 },
    { id: 3, title: 'Báo cáo nhân sự tháng 11', timeLeft: '5 ngày', deadline: '02/12', urgent: false, progress: 25 },
    { id: 4, title: 'Kế hoạch nghỉ Tết Nguyên Đán', timeLeft: '7 ngày', deadline: '04/12', urgent: false, progress: 15 },
    { id: 5, title: 'Đề xuất mua sắm thiết bị IT', timeLeft: '10 ngày', deadline: '07/12', urgent: false, progress: 10 },
    { id: 6, title: 'Quyết định bổ nhiệm cán bộ', timeLeft: '12 giờ', deadline: '28/11', urgent: true, progress: 80 },
    { id: 7, title: 'Thông báo lịch trực Tết', timeLeft: '15 ngày', deadline: '12/12', urgent: false, progress: 100 },
    { id: 8, title: 'Kế hoạch tổ chức Hội nghị CBCC', timeLeft: '20 ngày', deadline: '17/12', urgent: false, progress: 5 },
    { id: 9, title: 'Báo cáo tài chính quý IV', timeLeft: '1 tháng', deadline: '27/12', urgent: false, progress: 0 },
    { id: 10, title: 'Công văn rà soát thi đua', timeLeft: '3 ngày', deadline: '30/11', urgent: true, progress: 45 },
  ];

  const handleOpenModal = (open: boolean) => {
    if (open) {
      setSelectedDate(undefined);
    }
    setIsModalOpen(open);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Helper to determine overflow style based on active tab
  const getContainerStyle = () => {
    if (activeTab === 'calendar' || activeTab === 'docs' || activeTab === 'reports') {
      return 'overflow-hidden';
    }
    return 'overflow-y-auto';
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        <Header 
          setIsModalOpen={handleOpenModal} 
        />

        {/* Scrollable Content */}
        <div className={`flex-1 p-4 lg:p-8 pb-20 custom-scrollbar flex flex-col ${getContainerStyle()}`}>
          
          {activeTab === 'dashboard' && (
            <>
              <StatsGrid stats={stats} />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-8 flex-1">
                {/* Left Column: Task List (2/3 width) */}
                <div className="xl:col-span-2 h-full">
                   <UpcomingTasks tasks={tasks} />
                </div>

                {/* Right Column: Documents (1/3 width) */}
                <div className="xl:col-span-1 h-full">
                   <DueDocuments docs={docs} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'calendar' && (
             <div className="h-full flex flex-col">
                <CalendarView 
                  tasks={tasks} 
                  docs={docs} 
                  onDateClick={handleDateClick}
                />
             </div>
          )}

          {activeTab === 'docs' && (
            <div className="h-full flex flex-col">
               <DocumentsView docs={docs} />
            </div>
          )}

          {activeTab === 'reports' && (
             <div className="h-full flex flex-col">
                <ReportsView />
             </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 'dashboard' && activeTab !== 'calendar' && activeTab !== 'docs' && activeTab !== 'reports' && (
              <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
                  Tính năng đang được phát triển...
              </div>
          )}

        </div>
      </main>

      {/* Floating Action Button (Mobile Only) */}
      <button 
        onClick={() => handleOpenModal(true)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center z-40 active:scale-90 transition-transform hover:bg-indigo-700"
      >
        <Plus size={24} />
      </button>

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialDate={selectedDate}
      />

    </div>
  );
};

export default App;