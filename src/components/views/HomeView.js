import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';

function HomeView() {
  const [balance, setBalance] = useState(5000);

  const handleSendMoney = () => {
    const amount = parseFloat(prompt("Enter amount to send:"));
    if (amount && amount > 0 && amount <= balance) {
      setBalance(prevBalance => prevBalance - amount);
      alert(`$${amount} sent successfully!`);
    } else {
      alert("Invalid amount or insufficient funds.");
    }
  };

  const handleRequestMoney = () => {
    const amount = parseFloat(prompt("Enter amount to request:"));
    if (amount && amount > 0) {
      alert(`Request for $${amount} sent successfully!`);
    } else {
      alert("Invalid amount.");
    }
  };

  const handleAddFunds = () => {
    const amount = parseFloat(prompt("Enter amount to add:"));
    if (amount && amount > 0) {
      setBalance(prevBalance => prevBalance + amount);
      alert(`$${amount} added successfully!`);
    } else {
      alert("Invalid amount.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Total Balance</h3>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button onClick={handleSendMoney} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center">
              <ArrowUpRight className="mr-2" size={18} />
              Send Money
            </button>
            <button onClick={handleRequestMoney} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center">
              <ArrowDownLeft className="mr-2" size={18} />
              Request Money
            </button>
            <button onClick={handleAddFunds} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center">
              <Wallet className="mr-2" size={18} />
              Add Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;