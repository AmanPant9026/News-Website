import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const router = useRouter();
  const [payoutRate, setPayoutRate] = useState('');
  const [articles, setArticles] = useState('');
  const [totalPayout, setTotalPayout] = useState(
    localStorage.getItem('totalPayout') || 0
  );

  const calculatePayout = () => {
    const payout = payoutRate * articles;
    setTotalPayout(payout);
    localStorage.setItem('totalPayout', payout); // Store in localStorage
  };

  const logout = () => {
    router.push('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Payout Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Payout Calculator
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">
                  Payout Rate (per article):
                </label>
                <input
                  type="number"
                  className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={payoutRate}
                  onChange={(e) => setPayoutRate(e.target.value)}
                  placeholder="Enter rate"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">
                  Number of Articles:
                </label>
                <input
                  type="number"
                  className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={articles}
                  onChange={(e) => setArticles(e.target.value)}
                  placeholder="Enter number"
                />
              </div>
            </div>
            <button
              onClick={calculatePayout}
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Calculate Payout
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              Total Payout: <span className="text-green-600">${totalPayout}</span>
            </h2>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Recent Activities
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <p className="text-gray-700">Published "Article 101"</p>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-gray-700">Approved new submissions</p>
                <span className="text-sm text-gray-500">1 day ago</span>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-gray-700">Updated payout rate</p>
                <span className="text-sm text-gray-500">3 days ago</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Quick Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-blue-800">
                Total Articles
              </h3>
              <p className="text-2xl font-bold text-blue-600">120</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-green-800">
                Total Payout
              </h3>
              <p className="text-2xl font-bold text-green-600">${totalPayout}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-yellow-800">
                Pending Reviews
              </h3>
              <p className="text-2xl font-bold text-yellow-600">15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
