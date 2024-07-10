import React, { useState } from 'react';
import { CreditCard, QrCode, X } from 'lucide-react';

const StorePurchase = () => {
  const [scanningMode, setScanningMode] = useState(null); // 'store' or 'item'
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Simulated database of QR codes
  const qrCodes = {
    store123: { id: 1, name: 'Grocery Store', distance: '0.5 miles' },
    store456: { id: 2, name: 'Electronics Shop', distance: '1.2 miles' },
    item789: { id: 1, name: 'Milk', price: 3.99 },
    itemABC: { id: 2, name: 'Bread', price: 2.49 },
  };

  const startScanning = (mode) => {
    setScanningMode(mode);
  };

  const handleScan = (qrCode) => {
    if (scanningMode === 'store') {
      const store = qrCodes[qrCode];
      if (store) {
        setSelectedStore(store);
        setScanningMode(null);
      } else {
        alert('Invalid store QR code');
      }
    } else if (scanningMode === 'item') {
      const item = qrCodes[qrCode];
      if (item) {
        addToCart(item);
        setScanningMode(null);
      } else {
        alert('Invalid item QR code');
      }
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    setTotal(total + item.price);
  };

  const removeFromCart = (item) => {
    const newCart = cart.filter(i => i.id !== item.id);
    setCart(newCart);
    setTotal(total - item.price);
  };

  const processPayment = () => {
    // In a real app, this would integrate with a payment gateway
    alert(`Payment of $${total.toFixed(2)} processed successfully!`);
    // Here you would typically call an API to record the transaction
    setCart([]);
    setTotal(0);
    setSelectedStore(null);
  };

  // Simulated QR code scanner
  const QRScanner = ({ onScan }) => (
    <div className="bg-gray-200 p-4 rounded-lg text-center">
      <p className="mb-2">Scanning QR Code...</p>
      <input 
        type="text" 
        placeholder="Enter QR code" 
        className="p-2 border rounded"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onScan(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <p className="mt-2 text-sm text-gray-600">
        (In a real app, this would use the device's camera)
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {!selectedStore ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Select a Store</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            {scanningMode === 'store' ? (
              <QRScanner onScan={handleScan} />
            ) : (
              <button 
                onClick={() => startScanning('store')}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <QrCode size={18} className="mr-2" />
                Scan Store QR Code
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedStore.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{selectedStore.distance}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Scan Items</h4>
                {scanningMode === 'item' ? (
                  <QRScanner onScan={handleScan} />
                ) : (
                  <button 
                    onClick={() => startScanning('item')}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <QrCode size={18} className="mr-2" />
                    Scan Item QR Code
                  </button>
                )}
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Your Cart</h4>
                <ul className="divide-y divide-gray-200">
                  {cart.map(item => (
                    <li key={item.id} className="py-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{item.name} - ${item.price.toFixed(2)}</p>
                        <button 
                          onClick={() => removeFromCart(item)}
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-medium text-gray-900">Total: ${total.toFixed(2)}</p>
                  <button 
                    onClick={processPayment}
                    className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <CreditCard size={18} className="mr-2" />
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePurchase;