import React from 'react';
import logo from '../assets/logo.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

const Navbar = () => {
  
  const list_item_class = "text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-200 rounded-lg hover:bg-blue-100 w-full text-start";
  const list_class = "flex flex-wrap flex-col items-start gap-y-0.5 text-lg font-normal w-full";
  const location = useLocation();
  const {isLoggedIn , setLoggedIn , username , setUsername} = useUser();
  console.log(isLoggedIn , username)
  // console.log(isLoggedIn , username)

  return (
    <nav className="h-screen sticky padding top-0 left-0 flex flex-col backdrop-blur-md px-3 py-4 justify-between items-center gap-y-3 mx-2.5 my-4 bg-white min-w-[18rem] shadow-lg rounded-lg z-10 font-[roboto]">
      <div className="flex flex-col justify-start w-full gap-3">
        <div className="w-full flex flex-col items-start mb-3 gap-3">
          <div className="flex text-2xl font-bold text-blue-500">
            <Link to="/" className="cursor-pointer flex items-center hover:opacity-80 transition-opacity">
              <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
              InventAI
            </Link>
          </div>
          <hr className="w-full border-t-2 border-blue-200" />
        </div>

        <div className="flex flex-col ml-6 gap-2">
          <div className="flex flex-col text-lg w-fit text-blue-500">
            <span className="mr-10 font-normal">List of Features</span>
            <hr className="w-full border-t-2 border-blue-200" />
          </div>
          <ul className={list_class}>
            <li className={list_item_class}>
              <NavLink to="/predict-demand" className={({isActive}) => `flex ml-10 w-full py-2 ${isActive ? "text-blue-500 bg-blue-50" : ""}`}>
                Predict Demand
              </NavLink>
            </li>
            <li className={list_item_class}>
              <NavLink to="/reorder-stock" className={({isActive}) => `flex ml-10 w-full py-2 ${isActive ? "text-blue-500 bg-blue-50" : ""}`}>
                Reorder Stock
              </NavLink>
            </li>
            <li className={list_item_class}>
              <NavLink to="/ps-insights" className={({isActive}) => `flex ml-10 w-full py-2 ${isActive ? "text-blue-500 bg-blue-50" : ""}`}>
                Store Insights
              </NavLink>
            </li>
            <li className={list_item_class}>
              <NavLink to="/upload-csv" className={({isActive}) => `flex ml-10 w-full py-2 ${isActive ? "text-blue-500 bg-blue-50" : ""}`}>
                Upload CSV
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {
        isLoggedIn? 
        <button 
        onClick = {() => {
          setLoggedIn(false);
          setUsername("");
        }}

        className='w-full py-2 px-4 bg-blue-500 text-white rounded-lg text-center font-medium hover:bg-blue-600 transition-colors'
        >Logout</button>
        :<div className="w-full px-4 flex flex-col gap-2">
        {location.pathname !== '/login' && location.pathname !== '/register' && (
          <>
            <Link to="/login" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg text-center font-medium hover:bg-blue-600 transition-colors">
              Login
            </Link>
            <Link to="/register" className="w-full py-2 px-4 border-2 border-blue-500 text-blue-500 rounded-lg text-center font-medium hover:bg-blue-50 transition-colors">
              Register
            </Link>
          </>
        )}
      </div>}
    </nav>
  );
};

export default Navbar;
