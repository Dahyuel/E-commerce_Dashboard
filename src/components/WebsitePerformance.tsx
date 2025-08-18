import React, { useState } from 'react';
import { Eye, ShoppingCart, CheckCircle, TrendingDown, BarChart3 } from 'lucide-react';

const WebsitePerformance: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const performanceData = {
    daily: { visits: 1250, addedToCart: 180, purchases: 47, conversionRate: 3.76 },
    weekly: { visits: 8900, addedToCart: 1340, purchases: 324, conversionRate: 3.64 },
    monthly: { visits: 38500, addedToCart: 5800, purchases: 1456, conversionRate: 3.78 }
  };

  const funnelData = [
    { stage: 'Site Visits', count: 8900, percentage: 100, color: 'bg-blue-500' },
    { stage: 'Product Views', count: 4200, percentage: 47, color: 'bg-blue-400' },
    { stage: 'Added to Cart', count: 1340, percentage: 15, color: 'bg-blue-300' },
    { stage: 'Checkout Started', count: 580, percentage: 6.5, color: 'bg-blue-200' },
    { stage: 'Completed Purchase', count: 324, percentage: 3.6, color: 'bg-blue-600' }
  ];

  const trendData = [
    { period: 'Week 1', visits: 7800, cart: 1200, purchases: 280 },
    { period: 'Week 2', visits: 8900, cart: 1340, purchases: 324 },
    { period: 'Week 3', visits: 9200, cart: 1450, purchases: 340 },
    { period: 'Week 4', visits: 8500, cart: 1280, purchases: 310 }
  ];

  const currentData = performanceData[timeframe];
  const abandonmentRate = ((currentData.addedToCart - currentData.purchases) / currentData.addedToCart * 100).toFixed(1);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Performance</h1>
          <p className="text-gray-600">Track visitor behavior and conversion metrics</p>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['daily', 'weekly', 'monthly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all hover:shadow-sm ${
                timeframe === period
                  ? 'bg-blue-600 text-white transform hover:scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Site Visits ({timeframe})</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{currentData.visits.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Added to Cart</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{currentData.addedToCart.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Purchases</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{currentData.purchases.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Cart Abandonment</p>
              <p className="text-2xl font-bold text-red-700 mt-1">{abandonmentRate}%</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{stage.count.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 ml-2">({stage.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`${stage.color} h-3 rounded-full transition-all hover:shadow-md`}
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Conversion Rate:</strong> {currentData.conversionRate}% of visitors complete a purchase
            </p>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trends</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {trendData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${(item.visits / 10000) * 100}%`, minHeight: '20px' }}
                    title={`Visits: ${item.visits}`}
                  ></div>
                  <div
                    className="w-full bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg transition-all hover:from-yellow-600 hover:to-yellow-500"
                    style={{ height: `${(item.cart / 1500) * 60}%`, minHeight: '15px' }}
                    title={`Cart: ${item.cart}`}
                  ></div>
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:from-green-600 hover:to-green-500"
                    style={{ height: `${(item.purchases / 400) * 40}%`, minHeight: '10px' }}
                    title={`Purchases: ${item.purchases}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{item.period}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Visits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-600">Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Purchases</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsitePerformance;