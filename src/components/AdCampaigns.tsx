import React, { useState } from 'react';
import { TrendingUp, DollarSign, Target, BarChart3, Eye } from 'lucide-react';

const AdCampaigns: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const campaignData = {
    daily: { spend: 450, revenue: 1250, roas: 2.78 },
    weekly: { spend: 2800, revenue: 8900, roas: 3.18 },
    monthly: { spend: 12500, revenue: 42300, roas: 3.38 }
  };

  const campaigns = [
    {
      id: '1',
      name: 'Summer Collection Launch',
      platform: 'Facebook',
      spend: 1250,
      revenue: 4200,
      roas: 3.36,
      impressions: 45000,
      clicks: 890,
      status: 'active'
    },
    {
      id: '2',
      name: 'Retargeting Campaign',
      platform: 'Instagram',
      spend: 800,
      revenue: 2800,
      roas: 3.50,
      impressions: 28000,
      clicks: 560,
      status: 'active'
    },
    {
      id: '3',
      name: 'Lookalike Audience',
      platform: 'Facebook',
      spend: 750,
      revenue: 1900,
      roas: 2.53,
      impressions: 32000,
      clicks: 420,
      status: 'paused'
    }
  ];

  const chartData = [
    { period: 'Week 1', spend: 2200, revenue: 7800 },
    { period: 'Week 2', spend: 2800, revenue: 8900 },
    { period: 'Week 3', spend: 3100, revenue: 9200 },
    { period: 'Week 4', spend: 2900, revenue: 8500 }
  ];

  const currentData = campaignData[timeframe];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ad Campaign Tracker</h1>
          <p className="text-gray-600">Monitor your Meta Ads performance and ROI</p>
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
              <p className="text-sm font-medium text-gray-600">Ad Spend ({timeframe})</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${currentData.spend.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Generated Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${currentData.revenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-blue-600 p-6 rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">ROAS</p>
              <p className="text-2xl font-bold text-white mt-1">{currentData.roas}x</p>
              <p className="text-sm text-blue-200 mt-1">Return on Ad Spend</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Target className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${(currentData.revenue - currentData.spend).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Spend vs Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ad Spend vs Revenue</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all hover:from-red-600 hover:to-red-500"
                    style={{ height: `${(item.spend / 4000) * 100}%`, minHeight: '20px' }}
                    title={`Spend: $${item.spend}`}
                  ></div>
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:from-green-600 hover:to-green-500"
                    style={{ height: `${(item.revenue / 10000) * 100}%`, minHeight: '20px' }}
                    title={`Revenue: $${item.revenue}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{item.period}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Ad Spend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Campaigns</h3>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{campaign.platform}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Spend: </span>
                    <span className="font-medium">${campaign.spend}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Revenue: </span>
                    <span className="font-medium">${campaign.revenue}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">ROAS: </span>
                    <span className="font-medium">{campaign.roas}x</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Clicks: </span>
                    <span className="font-medium">{campaign.clicks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCampaigns;