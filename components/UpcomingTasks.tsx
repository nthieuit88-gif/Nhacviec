import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Task } from '../types';

interface UpcomingTasksProps {
  tasks: Task[];
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="text-indigo-500" size={20} />
          Lịch công tác sắp tới
        </h3>
        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">Xem tất cả</button>
      </div>
      
      <div className="divide-y divide-gray-50 overflow-y-auto">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`p-5 flex items-start gap-4 transition-all cursor-pointer group border-l-4 
              ${task.urgent ? 'bg-indigo-50/40 border-l-indigo-500' : 'hover:bg-gray-50 border-l-transparent'}
            `}
          >
            {/* Date Box */}
            <div className={`
              flex-shrink-0 w-16 h-16 rounded-xl border flex flex-col items-center justify-center text-center transition-colors
              ${task.urgent ? 'bg-indigo-100 border-indigo-200' : 'bg-gray-50 border-gray-100 group-hover:bg-white'}
            `}>
              <span className={`text-xl font-bold block leading-none ${task.urgent ? 'text-indigo-700' : 'text-gray-600'}`}>
                {task.date}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase mt-1">{task.month}</span>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className={`text-base font-bold mb-1 truncate ${task.urgent ? 'text-indigo-900' : 'text-gray-800'}`}>
                  {task.title}
                </h4>
                {task.urgent && <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping shrink-0 ml-2"></span>}
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mt-1">
                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md ${task.urgent ? 'bg-indigo-100 text-indigo-700 font-medium' : 'bg-gray-100'}`}>
                  <Clock size={14} /> {task.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {task.location}
                </span>
              </div>
            </div>

            {/* Status Tag & Actions */}
            <div className="hidden sm:flex flex-col items-end gap-2 min-w-[120px]">
              {task.urgent ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md shadow-indigo-200">
                   <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> {task.status}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                   {task.status}
                </span>
              )}
              
              <div className="flex items-center gap-3 mt-1 justify-end">
                <span className="text-xs text-gray-400 font-medium group-hover:hidden transition-all duration-200">
                  {task.attendees} người tham gia
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to mark this task as complete?')) {
                      console.log(`Task ${task.id} completed`);
                    }
                  }}
                  className="hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-all animate-[fadeIn_0.2s_ease-out]"
                >
                  <CheckCircle size={12} />
                  Xong
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;