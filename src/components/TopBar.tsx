import React from 'react';
import { Search, Bell, Mail, User } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2.5 bg-blue-600 text-white placeholder-blue-200 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:bg-blue-700"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Mail size={20} />
          </button>
          
          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">ROBERT WILLIAM</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;