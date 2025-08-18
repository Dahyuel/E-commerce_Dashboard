import React from 'react';
import { TrendingUp, ShoppingCart, DollarSign, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "36,159",
      subtitle: "Sales Today",
      bgColor: "bg-white",
      textColor: "text-gray-900"
    },
    {
      title: "Orders",
      value: "3,159",
      subtitle: "Today",
      bgColor: "bg-white", 
      textColor: "text-gray-900"
    },
    {
      title: "Revenue",
      value: "$36,159",
      subtitle: "This Month", 
      bgColor: "bg-blue-600",
      textColor: "text-white"
    }
  ];

  const chartData = [
    { day: 'Mon', value: 20 },
    { day: 'Tue', value: 35 },
    { day: 'Wed', value: 25 },
    { day: 'Thu', value: 45 },
    { day: 'Fri', value: 30 },
    { day: 'Sat', value: 55 },
    { day: 'Sun', value: 40 }
  ];

  const topProducts = [
    { name: 'Vector', percentage: 35, color: 'bg-blue-600' },
    { name: 'Template', percentage: 25, color: 'bg-gray-800' },
    { name: 'Presentation', percentage: 40, color: 'bg-gray-400' }
  ];


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Content - Stats and Chart */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className={`${stat.bgColor} p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-sm font-medium ${stat.textColor} opacity-70`}>{stat.title}</h3>
                    <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                    <p className={`text-xs ${stat.textColor} opacity-60 mt-1`}>{stat.subtitle}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg ${stat.bgColor === 'bg-blue-600' ? 'bg-white' : 'bg-blue-100'} flex items-center justify-center`}>
                    <TrendingUp size={16} className={stat.bgColor === 'bg-blue-600' ? 'text-blue-600' : 'text-blue-600'} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${(item.value / 60) * 100}%`, minHeight: '20px' }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">January 2025</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-105">←</button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-105">→</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
              {[5, 6, 7, 8, 9, 10, 11].map((date) => (
                <button
                  key={date}
                  className={`p-2 text-sm rounded-lg hover:bg-blue-50 transition-all hover:scale-105 ${
                    date === 7 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Top Product Sale */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Product Sale</h3>
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="12" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                  <circle 
                    cx="16" 
                    cy="16" 
                    r="12" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="4"
                    strokeDasharray="75.4"
                    strokeDashoffset="15"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">95K</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${product.color} rounded-full`}></div>
                    <span className="text-sm text-gray-700">{product.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{product.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Source */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Source</h3>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{source.source}</span>
                    <span className="text-sm font-medium text-gray-900">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;