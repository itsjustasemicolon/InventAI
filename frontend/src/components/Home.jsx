import React from 'react';
import Card from './Card';

const Home = ({
  HeadText = "Inventory Management System",
}) => {
  return (
    <div className="min-h-screen w-full px-2 py-17 flex flex-col items-center text-black">
      <main className="text-center max-w-4xl">
        <h2 className="text-5xl font-bold leading-tight mb-6">
          {HeadText}<br /> Powered by <span className="text-blue-500">AI</span>
        </h2>
        <p className="text-lg text-gray-700 mb-10">
          Optimize stock levels, predict demand, reduce waste — all with intelligent automation.
        </p>
        <div className="flex justify-center gap-6">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition">
            Get Started 
          </button>
          <button 
            className={`border border-blue-500 px-6 py-3 rounded-xl
             text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition`}
          >
            Learn More
          </button>
        </div>
      </main>
         <Card/>
      <footer className="mt-auto text-gray-500 border-t border-grey-500 px-10 text-sm  ">
        © 2025 InventAI. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
