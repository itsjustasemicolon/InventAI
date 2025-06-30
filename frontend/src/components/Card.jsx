import React from 'react'

const Card = () => {
  return (
    <div>
    <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
  <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
    <h3 className="text-xl font-semibold mb-2 text-blue-600">Smart Forecasting</h3>
    <p className="text-gray-700">AI models predict demand based on historical trends, seasons, and market dynamics.</p>
  </div>
  <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
    <h3 className="text-xl font-semibold mb-2 text-blue-600">Real-Time Tracking</h3>
    <p className="text-gray-700">Monitor inventory levels live and get instant alerts for low or surplus stock.</p>
  </div>
  <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
    <h3 className="text-xl font-semibold mb-2 text-blue-600">Optimal Reordering</h3>
    <p className="text-gray-700">Trigger smart purchase orders when stocks dip below ideal thresholds.</p>
  </div>
</section>

    </div>
  )
}

export default Card