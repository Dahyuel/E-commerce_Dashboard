import React, { useState } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users, TrendingDown, BarChart3, RefreshCw } from 'lucide-react';

const Sales: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const salesData = {
    daily: { 
      orders: 45, 
      totalSales: 3245, 
      conversionRate: 3.2, 
      netProfit: 1623, 
      costs: 1622,
      refunds: 125,
      clv: 89
    },
    weekly: { 
      orders: 324, 
      totalSales: 18567, 
      conversionRate: 3.64, 
      netProfit: 9284, 
      costs: 9283,
      refunds: 890,
      clv: 156
    },
    monthly: { 
      orders: 1456, 
      totalSales: 78234, 
      conversionRate: 3.78, 
      netProfit: 39117, 
      costs: 39117,
      refunds: 3245,
      clv: 234
    }
  };

  const orderTrends = [
    { period: 'Week 1', orders: 280, sales: 16800 },
    { period: 'Week 2', orders: 324, sales: 18567 },
    { period: 'Week 3', orders: 356, sales: 19234 },
    { period: 'Week 4', orders: 298, sales: 17890 }
  ];

  const topProducts = [
    {
      id: '1',
      name: 'Wireless Headphones Pro',
      image: '/images/headphones.jpg',
      profit: 2890,
      unitsSold: 156,
      profitMargin: 45
    },
    {
      id: '2',
      name: 'Smart Fitness Tracker',
      image: '/images/fitness-tracker.jpg',
      profit: 2340,
      unitsSold: 234,
      profitMargin: 38
    },
    {
      id: '3',
      name: 'Bluetooth Speaker Mini',
      image: '/images/speaker.jpg',
      profit: 1890,
      unitsSold: 189,
      profitMargin: 42
    }
  ];

  const clvData = [
    { segment: 'New Customers', value: 89, count: 156 },
    { segment: 'Returning Customers', value: 234, count: 89 },
    { segment: 'VIP Customers', value: 456, count: 23 }
  ];

  const expenseCategories = [
    { category: 'Marketing', amount: 3500, percentage: 35, color: 'bg-blue-500' },
    { category: 'Logistics', amount: 2000, percentage: 20, color: 'bg-green-500' },
    { category: 'Inventory', amount: 2500, percentage: 25, color: 'bg-purple-500' },
    { category: 'Operations', amount: 1500, percentage: 15, color: 'bg-yellow-500' },
    { category: 'Other', amount: 500, percentage: 5, color: 'bg-gray-500' }
  ];

  const refundImpact = [
    { period: 'Week 1', grossSales: 16800, refunds: 456, netSales: 16344 },
    { period: 'Week 2', grossSales: 18567, refunds: 890, netSales: 17677 },
    { period: 'Week 3', grossSales: 19234, refunds: 567, netSales: 18667 },
    { period: 'Week 4', grossSales: 17890, refunds: 234, netSales: 17656 }
  ];

  const currentData = salesData[timeframe];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600">Comprehensive sales performance and insights</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all hover:shadow-sm">
            <RefreshCw size={16} />
            Refresh Data
          </button>
          
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
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders ({timeframe})</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{currentData.orders.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${currentData.totalSales.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-blue-600 p-6 rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Conversion Rate</p>
              <p className="text-2xl font-bold text-white mt-1">{currentData.conversionRate}%</p>
              <p className="text-sm text-blue-200 mt-1">Site to Purchase</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${currentData.netProfit.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">After all costs</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Order Trends Chart */}
        <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Trends</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {orderTrends.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${(item.orders / 400) * 100}%`, minHeight: '25px' }}
                    title={`Orders: ${item.orders}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{item.period}</span>
                <span className="text-xs font-medium text-gray-900">{item.orders}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Profit Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.textContent = `P${index + 1}`;
                    }}
                  />
                  <span className="text-gray-600 font-medium hidden">P{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                  <p className="text-xs text-gray-600">{product.unitsSold} units sold</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-green-600">${product.profit}</span>
                    <span className="text-xs text-gray-500">{product.profitMargin}% margin</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Customer Lifetime Value */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Lifetime Value</h3>
          <div className="space-y-4">
            {clvData.map((segment, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{segment.segment}</span>
                  <span className="text-lg font-bold text-green-600">${segment.value}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{segment.count} customers</span>
                  <span>Avg. CLV</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all"
                    style={{ width: `${(segment.value / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Impact */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Refund Impact Analysis</h3>
          <div className="h-48 flex items-end justify-between gap-3">
            {refundImpact.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:from-green-600 hover:to-green-500"
                    style={{ height: `${(item.grossSales / 20000) * 100}%`, minHeight: '20px' }}
                    title={`Gross Sales: $${item.grossSales}`}
                  ></div>
                  <div
                    className="w-full bg-gradient-to-t from-red-500 to-red-400 transition-all hover:from-red-600 hover:to-red-500"
                    style={{ height: `${(item.refunds / 1000) * 20}%`, minHeight: '8px' }}
                    title={`Refunds: $${item.refunds}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{item.period}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Gross Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Refunds</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Refund Rate:</strong> {((currentData.refunds / currentData.totalSales) * 100).toFixed(1)}% of total sales
            </p>
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Categorization</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart Visual */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                {expenseCategories.map((category, index) => {
                  const startAngle = expenseCategories.slice(0, index).reduce((sum, cat) => sum + (cat.percentage * 3.6), 0);
                  const endAngle = startAngle + (category.percentage * 3.6);
                  const largeArcFlag = category.percentage > 50 ? 1 : 0;
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                  
                  return (
                    <path
                      key={index}
                      d={pathData}
                      className={`${category.color.replace('bg-', 'fill-')} transition-all hover:opacity-80`}
                      title={`${category.category}: $${category.amount}`}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">${currentData.costs.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Total Costs</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-3">
            {expenseCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                  <span className="font-medium text-gray-900">{category.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">${category.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
