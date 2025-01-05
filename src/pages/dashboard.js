import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Sidebar from '../components/Sidebar';
import NewsTable from '../components/NewsTable';
import ExportButtons from '../components/ExportButtons';
import Charts from '../components/Charts'; // Insights (Graphical Charts)
import { fetchNews } from '../utils/fetchNews';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    author: '',
    dateRange: { start: '', end: '' },
    type: '',
  });
  const [payoutRates, setPayoutRates] = useState({});
  const [authorPayouts, setAuthorPayouts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = '/login';
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchNews();
        setNews(articles || []);
        calculatePayouts(articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    loadNews();
  }, []);

  const calculatePayouts = (articles) => {
    const authors = articles.map((article) => article.author || 'Unknown');
    const counts = authors.reduce((acc, author) => {
      acc[author] = (acc[author] || 0) + 1;
      return acc;
    }, {});
    const payouts = Object.keys(counts).map((author) => ({
      author,
      articles: counts[author],
      payout: (payoutRates[author] || 0) * counts[author],
    }));
    setAuthorPayouts(payouts);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    return news.filter((article) => {
      const matchesAuthor = filters.author
        ? article.author?.toLowerCase().includes(filters.author.toLowerCase())
        : true;
      const matchesDateRange =
        filters.dateRange.start && filters.dateRange.end
          ? new Date(article.date) >= new Date(filters.dateRange.start) &&
            new Date(article.date) <= new Date(filters.dateRange.end)
          : true;
      const matchesType = filters.type
        ? article.type?.toLowerCase() === filters.type.toLowerCase()
        : true;
      const matchesSearch = article.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesAuthor && matchesDateRange && matchesType && matchesSearch;
    });
  };

  const filteredNews = applyFilters();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 p-6">
        {/* Left Section: News and Search */}
        <div className="flex-1 flex flex-col space-y-6">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 text-xl font-bold shadow-md">
                {user?.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                Welcome, {user?.displayName || 'User'}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          {/* Filters and Search Section */}
          <div className="space-y-4 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Search by keyword..."
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input
                type="text"
                placeholder="Filter by author..."
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
                value={filters.author}
                onChange={(e) => handleFilterChange('author', e.target.value)}
              />
              <select
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="news">News</option>
                <option value="blog">Blog</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-4">
              <input
                type="date"
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
                value={filters.dateRange.start}
                onChange={(e) =>
                  handleFilterChange('dateRange', {
                    ...filters.dateRange,
                    start: e.target.value,
                  })
                }
              />
              <input
                type="date"
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
                value={filters.dateRange.end}
                onChange={(e) =>
                  handleFilterChange('dateRange', {
                    ...filters.dateRange,
                    end: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* News Table */}
          <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Latest News</h2>
            <NewsTable news={filteredNews} />
          </div>
        </div>

        {/* Right Section: Insights and Payouts */}
        <div className="w-full md:w-1/3 flex flex-col space-y-6">
          {/* Insights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Insights</h2>
            <Charts data={filteredNews} />
          </div>

          {/* Payout Details */}
          <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payout Details</h2>
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Author</th>
                  <th className="px-4 py-2 border-b">Articles</th>
                  <th className="px-4 py-2 border-b">Rate</th>
                  <th className="px-4 py-2 border-b">Payout</th>
                </tr>
              </thead>
              <tbody>
                {authorPayouts.map((payout) => (
                  <tr key={payout.author}>
                    <td className="px-4 py-2 border-b">{payout.author}</td>
                    <td className="px-4 py-2 border-b">{payout.articles}</td>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="number"
                        value={payoutRates[payout.author] || 0}
                        onChange={(e) =>
                          handleRateChange(payout.author, parseFloat(e.target.value))
                        }
                        className="w-16 py-1 px-2 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">${payout.payout.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
