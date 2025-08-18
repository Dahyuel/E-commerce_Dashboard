import React, { useState } from 'react';
import { Users, Heart, Share, MessageCircle, TrendingUp, Instagram, Facebook } from 'lucide-react';

const SocialMedia: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'facebook' | 'instagram' | 'tiktok'>('all');

  const socialData = {
    weekly: {
      facebook: { followers: 12500, likes: 890, shares: 156, comments: 234, growth: 2.3 },
      instagram: { followers: 18200, likes: 1450, shares: 89, comments: 567, growth: 4.1 },
      tiktok: { followers: 8900, likes: 2300, shares: 445, comments: 189, growth: 8.7 }
    },
    monthly: {
      facebook: { followers: 12500, likes: 3560, shares: 624, comments: 936, growth: 8.9 },
      instagram: { followers: 18200, likes: 5800, shares: 356, comments: 2268, growth: 15.6 },
      tiktok: { followers: 8900, likes: 9200, shares: 1780, comments: 756, growth: 34.2 }
    }
  };

  const engagementTrends = [
    { period: 'Week 1', facebook: 1200, instagram: 1800, tiktok: 2100 },
    { period: 'Week 2', facebook: 1350, instagram: 2100, tiktok: 2400 },
    { period: 'Week 3', facebook: 1180, instagram: 1950, tiktok: 2800 },
    { period: 'Week 4', facebook: 1420, instagram: 2250, tiktok: 3200 }
  ];

  const topPosts = [
    {
      id: '1',
      platform: 'Instagram',
      content: 'New summer collection reveal! ✨',
      likes: 456,
      comments: 89,
      shares: 23,
      engagement: 4.2
    },
    {
      id: '2',
      platform: 'TikTok',
      content: 'Behind the scenes: Making our bestseller',
      likes: 1200,
      comments: 156,
      shares: 89,
      engagement: 8.7
    },
    {
      id: '3',
      platform: 'Facebook',
      content: 'Customer testimonial video',
      likes: 234,
      comments: 45,
      shares: 67,
      engagement: 3.1
    }
  ];

  const currentData = socialData[timeframe];
  const totalFollowers = currentData.facebook.followers + currentData.instagram.followers + currentData.tiktok.followers;
  const totalEngagement = currentData.facebook.likes + currentData.instagram.likes + currentData.tiktok.likes;

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook size={16} className="text-blue-600" />;
      case 'instagram':
        return <Instagram size={16} className="text-pink-600" />;
      case 'tiktok':
        return <div className="w-4 h-4 bg-black rounded-full"></div>;
      default:
        return <MessageCircle size={16} />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Social Media Analytics</h1>
          <p className="text-gray-600">Track engagement across Facebook, Instagram, and TikTok</p>
        </div>
        
        <div className="flex gap-3">
          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-300"
          >
            <option value="all">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
          </select>

          {/* Timeframe Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['weekly', 'monthly'] as const).map((period) => (
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

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Followers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalFollowers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Likes ({timeframe})</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalEngagement.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <Heart className="text-pink-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Shares</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(currentData.facebook.shares + currentData.instagram.shares + currentData.tiktok.shares).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Share className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Comments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(currentData.facebook.comments + currentData.instagram.comments + currentData.tiktok.comments).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Platform Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Performance</h3>
          <div className="space-y-6">
            {Object.entries(currentData).map(([platform, data]) => (
              <div key={platform} className="p-4 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(platform)}
                    <h4 className="font-semibold text-gray-900 capitalize">{platform}</h4>
                  </div>
                  <span className="text-sm text-green-600 font-medium">+{data.growth}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Followers: </span>
                    <span className="font-medium">{data.followers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Likes: </span>
                    <span className="font-medium">{data.likes.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Shares: </span>
                    <span className="font-medium">{data.shares.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Comments: </span>
                    <span className="font-medium">{data.comments.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Trends</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {engagementTrends.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${(item.facebook / 1500) * 100}%`, minHeight: '15px' }}
                    title={`Facebook: ${item.facebook}`}
                  ></div>
                  <div
                    className="w-full bg-gradient-to-t from-pink-500 to-pink-400 rounded-t-lg transition-all hover:from-pink-600 hover:to-pink-500"
                    style={{ height: `${(item.instagram / 2500) * 100}%`, minHeight: '15px' }}
                    title={`Instagram: ${item.instagram}`}
                  ></div>
                  <div
                    className="w-full bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-lg transition-all hover:from-gray-900 hover:to-gray-700"
                    style={{ height: `${(item.tiktok / 3500) * 100}%`, minHeight: '15px' }}
                    title={`TikTok: ${item.tiktok}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{item.period}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Facebook</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded"></div>
              <span className="text-sm text-gray-600">Instagram</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-800 rounded"></div>
              <span className="text-sm text-gray-600">TikTok</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPosts.map((post) => (
            <div key={post.id} className="p-4 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                {getPlatformIcon(post.platform)}
                <span className="font-medium text-gray-900">{post.platform}</span>
                <span className="text-sm text-green-600 ml-auto">{post.engagement}% engagement</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{post.content}</p>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
                <span>{post.shares} shares</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;