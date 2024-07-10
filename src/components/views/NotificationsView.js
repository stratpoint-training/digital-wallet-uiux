import React, { useState } from 'react';
import { Bell, DollarSign, CreditCard } from 'lucide-react';

function NotificationsView() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', message: 'Low balance in your checking account', time: '2 hours ago' },
    { id: 2, type: 'transaction', message: 'You received $500 from John Doe', time: '1 day ago' },
    { id: 3, type: 'card', message: 'Your new credit card has been shipped', time: '3 days ago' },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <Bell className="text-yellow-500" />;
      case 'transaction':
        return <DollarSign className="text-green-500" />;
      case 'card':
        return <CreditCard className="text-blue-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div key={notification.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 flex items-start">
          <div className="flex-shrink-0 mr-4">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{notification.message}</p>
            <p className="text-sm text-gray-500">{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationsView;