import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 px-26 py-4 flex justify-between  items-center bg-transparent text-     shadow-md">
      <div className="text-2xl font-bold text-blue-500">InventAI</div>

      <ul className="flex space-x-6 text-white font-medium">
        <li className="hover:text-blue-400 text-black cursor-pointer transition">Feature1</li>
        <li className="hover:text-blue-400 text-black cursor-pointer transition">Feature2</li>
        <li className="hover:text-blue-400 text-black cursor-pointer transition">Feature3</li> 
      </ul>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition">
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;
