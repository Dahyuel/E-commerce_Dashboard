import React from 'react';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Package, 
  BarChart3, 
  Ticket, 
  Settings, 
  LogOut,
  TrendingUp,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant', label: 'Personal Assistant', icon: MessageCircle },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'sales', label: 'Sales', icon: BarChart3 },
    { id: 'ads', label: 'Ad Campaigns', icon: TrendingUp },
    { id: 'website', label: 'Website Performance', icon: BarChart3 },
    { id: 'social', label: 'Social Media', icon: Users },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">E-Commerce</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 ${
                activeTab === item.id 
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:shadow-md'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg">
          <LogOut size={20} />
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;