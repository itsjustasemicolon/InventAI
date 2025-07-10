import React, { useState } from 'react';
import Home from "../../Home";

export function PSInsights() {
  const [storeId, setStoreId] = useState('');
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInsights(null);
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/store-insights?store_id=${encodeURIComponent(storeId)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (res.ok) setInsights(data.insights);
      else setError(data.message || 'Failed to fetch insights');
    } catch (err) {
      setError('Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='justify-center items-center flex ml-100'>
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-12 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Store Insights</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="store_id" className="block text-md font-medium text-gray-700">
                Store ID
              </label>
              <input
                type="text"
                id="store_id"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
                className="mt-5 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
                required
                placeholder="Enter store ID"
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Fetching insights...' : 'Get Insights'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {insights && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Store Insights</h3>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(insights).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </h4>
                      <p className="text-lg font-semibold text-gray-900">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
