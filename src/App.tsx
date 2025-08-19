import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import PersonalAssistant from './components/PersonalAssistant';
import AdCampaigns from './components/AdCampaigns';
import WebsitePerformance from './components/WebsitePerformance';
import SocialMedia from './components/SocialMedia';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import Tickets from './components/Tickets';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'assistant':
        return <PersonalAssistant />;
      case 'ads':
        return <AdCampaigns />;
      case 'website':
        return <WebsitePerformance />;
      case 'social':
        return <SocialMedia />;
      case 'inventory':
        return <Inventory />;
      case 'sales':
        return <Sales />;
      case 'tickets':
        return <Tickets />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;