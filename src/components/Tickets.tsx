import React, { useState } from 'react';
import { MessageSquare, RefreshCw, AlertCircle, CheckCircle, XCircle, Send } from 'lucide-react';

interface Ticket {
  id: string;
  customer: string;
  type: 'refund' | 'complaint' | 'other';
  subject: string;
  description: string;
  status: 'pending' | 'resolved' | 'declined';
  date: string;
  orderNumber?: string;
  instagramHandle: string;
}

const Tickets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'refunds' | 'complaints' | 'others'>('refunds');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const tickets: Ticket[] = [
    {
      id: '1',
      customer: 'Sarah Johnson',
      type: 'refund',
      subject: 'Product damaged during shipping',
      description: 'The wireless headphones arrived with a cracked case. The product itself seems fine but the packaging was damaged.',
      status: 'pending',
      date: '2025-01-15',
      orderNumber: '#ORD-2024-001',
      instagramHandle: '@sarah_j_music'
    },
    {
      id: '2',
      customer: 'Mike Chen',
      type: 'refund',
      subject: 'Wrong item received',
      description: 'Ordered a fitness tracker but received a bluetooth speaker instead.',
      status: 'pending',
      date: '2025-01-14',
      orderNumber: '#ORD-2024-002',
      instagramHandle: '@mike_fitness'
    },
    {
      id: '3',
      customer: 'Emma Davis',
      type: 'complaint',
      subject: 'Poor customer service',
      description: 'Called customer service multiple times but no one answers. Very disappointed with the lack of support.',
      status: 'pending',
      date: '2025-01-13',
      instagramHandle: '@emma_style'
    },
    {
      id: '4',
      customer: 'Alex Rodriguez',
      type: 'other',
      subject: 'Product inquiry',
      description: 'Do you have the wireless headphones in different colors? Looking for a red or green option.',
      status: 'pending',
      date: '2025-01-12',
      instagramHandle: '@alex_tech'
    },
    {
      id: '5',
      customer: 'Lisa Wang',
      type: 'complaint',
      subject: 'Delayed delivery',
      description: 'Order was supposed to arrive 3 days ago but still no updates on shipping status.',
      status: 'pending',
      date: '2025-01-11',
      orderNumber: '#ORD-2024-003',
      instagramHandle: '@lisa_shopping'
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'refunds') return ticket.type === 'refund';
    if (activeTab === 'complaints') return ticket.type === 'complaint';
    return ticket.type === 'other';
  });

  const handleTicketAction = (ticketId: string, action: 'accept' | 'decline') => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      // Simulate Instagram DM response
      const message = action === 'accept' 
        ? `Hi ${ticket.customer}! We've approved your refund request for ${ticket.orderNumber || 'your recent order'}. You'll receive a confirmation email shortly with next steps. Thank you for your patience!`
        : `Hi ${ticket.customer}, we've reviewed your refund request for ${ticket.orderNumber || 'your recent order'}. Unfortunately, we cannot process this refund as it doesn't meet our refund policy criteria. Please contact us if you have questions.`;
      
      alert(`Instagram DM sent to ${ticket.instagramHandle}:\n\n${message}`);
    }
  };

  const handleReply = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    const message = replyText[ticketId];
    
    if (ticket && message) {
      alert(`Instagram DM sent to ${ticket.instagramHandle}:\n\n${message}`);
      setReplyText({ ...replyText, [ticketId]: '' });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'declined':
        return <XCircle className="text-red-600" size={16} />;
      default:
        return <AlertCircle className="text-yellow-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-50';
      case 'declined':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticketing System</h1>
          <p className="text-gray-600">Manage customer support tickets and Instagram DM responses</p>
        </div>
        
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <RefreshCw size={16} />
          Sync from Sheet
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
              <p className="text-sm text-gray-600">Total Tickets</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'pending').length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'resolved').length}</p>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'declined').length}</p>
              <p className="text-sm text-gray-600">Declined</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8 px-6">
            {[
              { id: 'refunds', label: 'Refunds', count: tickets.filter(t => t.type === 'refund').length },
              { id: 'complaints', label: 'Complaints', count: tickets.filter(t => t.type === 'complaint').length },
              { id: 'others', label: 'Others', count: tickets.filter(t => t.type === 'other').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Tickets List */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Customer:</strong> {ticket.customer} ({ticket.instagramHandle})
                    </p>
                    {ticket.orderNumber && (
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Order:</strong> {ticket.orderNumber}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">{ticket.description}</p>
                  </div>
                </div>

                {/* Action Buttons for Refunds */}
                {ticket.type === 'refund' && ticket.status === 'pending' && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleTicketAction(ticket.id, 'accept')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle size={16} />
                      Accept Refund
                    </button>
                    <button
                      onClick={() => handleTicketAction(ticket.id, 'decline')}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      <XCircle size={16} />
                      Decline Refund
                    </button>
                  </div>
                )}

                {/* Reply Box for Complaints and Others */}
                {(ticket.type === 'complaint' || ticket.type === 'other') && ticket.status === 'pending' && (
                  <div className="mt-4">
                    <div className="flex gap-3">
                      <textarea
                        value={replyText[ticket.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [ticket.id]: e.target.value })}
                        placeholder="Type your reply message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                      />
                      <button
                        onClick={() => handleReply(ticket.id)}
                        disabled={!replyText[ticket.id]?.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send size={16} />
                        Send Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No {activeTab} tickets found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;