import React, { useState } from 'react';

const PayoutCalculator = () => {
  const [revenue, setRevenue] = useState('');
  const [percentageShare, setPercentageShare] = useState('');
  const [fixedCosts, setFixedCosts] = useState('');
  const [payout, setPayout] = useState(null);

  const calculatePayout = () => {
    if (!revenue || !percentageShare || !fixedCosts) {
      alert('Please fill in all fields');
      return;
    }

    const percentagePayout = (parseFloat(revenue) * parseFloat(percentageShare)) / 100;
    const totalPayout = percentagePayout - parseFloat(fixedCosts);
    setPayout(totalPayout >= 0 ? totalPayout : 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Calculate Payout</h2>
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Total Revenue"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Percentage Share (%)"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={percentageShare}
          onChange={(e) => setPercentageShare(e.target.value)}
        />
        <input
          type="number"
          placeholder="Fixed Costs"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={fixedCosts}
          onChange={(e) => setFixedCosts(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={calculatePayout}
      >
        Calculate
      </button>
      {payout !== null && (
        <div className="text-center mt-4 text-lg font-bold text-green-500">
          Payout: ${payout.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default PayoutCalculator;
