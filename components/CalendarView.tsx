import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, AlertCircle, Plus } from 'lucide-react';
import { Task, Document } from '../types';

interface CalendarViewProps {
  tasks: Task[];
  docs: Document[];
  onDateClick: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, docs, onDateClick }) => {
  // Default to Nov 2025 to match the mock data context
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getTasksForDay = (day: number) => {
    return tasks.filter(t => {
      const taskMonthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(t.month);
      return t.date === day && taskMonthIndex === currentDate.getMonth();
    });
  };

  const getDocsForDay = (day: number) => {
    return docs.filter(d => {
      const [dDay, dMonth] = d.deadline.split('/').map(Number);
      return dDay === day && (dMonth - 1) === currentDate.getMonth();
    });
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateClick(clickedDate);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty slots for previous month
    for (let i = 0; i < startDayOffset; i++) {
      days.push(
        <div key={`empty-${i}`} className="bg-gray-50/30 min-h-[100px] border-b border-r border-gray-100 p-2"></div>
      );
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = getTasksForDay(day);
      const dayDocs = getDocsForDay(day);
      
      const now = new Date();
      const isToday = day === now.getDate() && currentDate.getMonth() === now.getMonth() && currentDate.getFullYear() === now.getFullYear();

      days.push(
        <div 
            key={`day-${day}`} 
            onClick={() => handleDayClick(day)}
            className={`
                min-h-[100px] bg-white border-b border-r border-gray-100 p-2 hover:bg-gray-50 transition-colors group relative flex flex-col gap-1 cursor-pointer
                ${isToday ? 'bg-indigo-50/20' : ''}
            `}
        >
          {/* Day Number Header */}
          <div className="flex justify-between items-start">
            <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700'}`}>
              {day}
            </span>
            {(dayTasks.length > 0 || dayDocs.length > 0) && (
                 <span className="lg:hidden text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                     {dayTasks.length + dayDocs.length}
                 </span>
            )}
            
            {/* Add Icon on Hover */}
            <div className="hidden lg:flex absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 hover:text-indigo-600">
               <Plus size={16} />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-1 overflow-hidden">
            {dayTasks.map((task) => (
              <div 
                key={`t-${task.id}`} 
                onClick={(e) => { e.stopPropagation(); /* Prevent triggering day click if we wanted task details in future */ }}
                className="group/item relative text-[11px] p-1.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 truncate hover:bg-indigo-100 transition-colors"
              >
                 <div className="font-semibold truncate">{task.time.split(' - ')[0]} - {task.title}</div>
                 {/* Tooltip */}
                 <div className="absolute left-0 bottom-full mb-1 hidden group-hover/item:block z-10 w-48 bg-gray-800 text-white text-xs p-2 rounded shadow-lg whitespace-normal pointer-events-none">
                    <div className="font-bold">{task.title}</div>
                    <div className="text-gray-300">{task.time}</div>
                    <div className="text-gray-300">{task.location}</div>
                 </div>
              </div>
            ))}
            {dayDocs.map((doc) => (
              <div 
                key={`d-${doc.id}`} 
                onClick={(e) => { e.stopPropagation(); }}
                className="group/item relative text-[11px] p-1.5 rounded bg-red-50 text-red-700 border border-red-100 truncate hover:bg-red-100 transition-colors"
              >
                 <div className="flex items-center gap-1">
                     <AlertCircle size={10} className="shrink-0" />
                     <span className="truncate font-semibold">{doc.title}</span>
                 </div>
                 {/* Tooltip */}
                 <div className="absolute left-0 bottom-full mb-1 hidden group-hover/item:block z-10 w-48 bg-gray-800 text-white text-xs p-2 rounded shadow-lg whitespace-normal pointer-events-none">
                    <div className="font-bold">{doc.title}</div>
                    <div className="text-gray-300">Hạn chót: {doc.deadline}</div>
                    {doc.urgent && <div className="text-red-300 font-bold mt-1">Cấp bách</div>}
                 </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Fill remaining cells for grid to make it complete rect
    const totalCells = startDayOffset + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
         days.push(<div key={`empty-end-${i}`} className="bg-gray-50/30 min-h-[100px] border-b border-r border-gray-100 p-2"></div>);
    }

    return days;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Calendar Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <CalendarIcon size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
        </div>
        
        <div className="flex items-center gap-2">
            <button onClick={goToToday} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                Hôm nay
            </button>
            <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white">
                <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600 transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <div className="w-px h-5 bg-gray-200 mx-1"></div>
                <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600 transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
        {['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN'].map((day, idx) => (
          <div key={idx} className="py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-100/50 relative">
         <div className="grid grid-cols-7 border-l border-t border-gray-100 min-w-[800px] lg:min-w-0 min-h-full">
            {renderCalendarDays()}
         </div>
      </div>
    </div>
  );
};

export default CalendarView;