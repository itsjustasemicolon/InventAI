import React, { useState } from 'react';
import Home from '../../Home';

export function DemandPredict() {
  const [form, setForm] = useState({ store_id: '', item_id: '', date: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/predict-demand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setResult(data.predicted_demand);
      else setError(data.message || 'Prediction failed');
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='justify-center items-center flex ml-100'>
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Predict Demand</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="store_id" className="block text-sm font-medium text-gray-700">
                  Store ID
                </label>
                <input
                  type="text"
                  id="store_id"
                  name="store_id"
                  value={form.store_id}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="item_id" className="block text-sm font-medium text-gray-700">
                  Item ID
                </label>
                <input
                  type="text"
                  id="item_id"
                  name="item_id"
                  value={form.item_id}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="date" className="block  text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Predicting...' : 'Predict Demand'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {result !== null && (
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Predicted Demand</h3>
              <p className="text-3xl font-bold text-green-600">{result}</p>
              <p className="text-sm text-gray-600 mt-2">units</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


