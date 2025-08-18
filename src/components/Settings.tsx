import React, { useState } from 'react';
import { User, Bell, Lock, Database, Instagram, FileText, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Robert William',
      email: 'robert@example.com',
      phone: '+1 (555) 123-4567',
      timezone: 'America/New_York'
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      lowStockAlerts: true,
      newOrderAlerts: true
    },
    instagram: {
      connected: true,
      username: '@store_official',
      autoReply: true
    },
    googleSheets: {
      connected: true,
      sheetUrl: 'https://docs.google.com/spreadsheets/d/abc123...',
      lastSync: '2025-01-15 10:30 AM'
    }
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, name: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, email: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, phone: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.profile.timezone}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, timezone: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
      <div className="space-y-4">
        {[
          { key: 'emailAlerts', label: 'Email Alerts', description: 'Receive important updates via email' },
          { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser notifications for real-time updates' },
          { key: 'lowStockAlerts', label: 'Low Stock Alerts', description: 'Get notified when products are running low' },
          { key: 'newOrderAlerts', label: 'New Order Alerts', description: 'Instant notifications for new orders' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{item.label}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    [item.key]: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
      
      {/* Instagram Integration */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Instagram className="text-pink-600" size={24} />
          <div>
            <h4 className="font-semibold text-gray-900">Instagram Integration</h4>
            <p className="text-sm text-gray-600">Connect your Instagram account for DM automation</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Status: <span className={`${settings.instagram.connected ? 'text-green-600' : 'text-red-600'}`}>
                {settings.instagram.connected ? 'Connected' : 'Not Connected'}
              </span>
            </p>
            {settings.instagram.connected && (
              <p className="text-sm text-gray-600">Account: {settings.instagram.username}</p>
            )}
          </div>
          <button className={`px-4 py-2 rounded-lg font-medium ${
            settings.instagram.connected 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}>
            {settings.instagram.connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
        {settings.instagram.connected && (
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.instagram.autoReply}
                onChange={(e) => setSettings({
                  ...settings,
                  instagram: { ...settings.instagram, autoReply: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Enable automatic replies for ticket responses</span>
            </label>
          </div>
        )}
      </div>

      {/* Google Sheets Integration */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-green-600" size={24} />
          <div>
            <h4 className="font-semibold text-gray-900">Google Sheets Integration</h4>
            <p className="text-sm text-gray-600">Sync ticket data from Google Sheets</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sheet URL</label>
            <input
              type="url"
              value={settings.googleSheets.sheetUrl}
              onChange={(e) => setSettings({
                ...settings,
                googleSheets: { ...settings.googleSheets, sheetUrl: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Last sync: {settings.googleSheets.lastSync}
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              Sync Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Change Password</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Update Password
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {activeSection === 'profile' && renderProfileSettings()}
            {activeSection === 'notifications' && renderNotificationSettings()}
            {activeSection === 'integrations' && renderIntegrationSettings()}
            {activeSection === 'security' && renderSecuritySettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;