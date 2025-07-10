import React from 'react';
import logo from '../assets/logo.svg'; // Adjust the path as necessary
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const list_item_class = "text-gray-600 hover:text-blue-500 cursor-pointer  transition-all duration-200 rounded-lg hover:bg-blue-100 w-full text-start"
  const list_class = "flex flex-wrap flex-col items-start gap-y-0.5 text-lg font-normal  w-full";




  return (


    <nav
      className="h-screen sticky padding top-0 left-0 flex flex-col backdrop-blur-md px-3 py-4 justify-between items-center gap-y-3 mx-2.5 my-4 bg-white min-w-[18rem] shadow-md  rounded-lg z-10 font-[roboto]"
    >

  
      <div className="flex flex-col justify-start w-full mb-4 gap-3">

        <div className="w-full flex flex-col items-start mb-3 gap-3">
          <div className=" flex text-2xl font-bold text-blue-500">
            <Link to="/" className={`cursor-pointer flex`}>
              <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
              InventAI  
            </Link>
          </div>
          <hr className="w-full border-t-2 border-blue-200" />
        </div>


        <div className="flex flex-col ml-6 gap-2">  
          <div className=" flex flex-col text-lg w-fit text-blue-500">
            <span className= "mr-10 font-normal">Main Menu</span>
           <hr className="w-full border-t-2 border-blue-200" />
          </div>
          <ul className={list_class}>
            <li className={list_item_class}><NavLink to="/predict-demand" className={({isActive}) => `flex ml-10 w-full py-2 ${isActive ? "text-blue-500" : ""}`}> 
              Predict Demand
            </NavLink></li>
            <li className={list_item_class}><NavLink to="/reorder-stock" className={({isActive}) => `flex ml-10 w-full py-2 ${isActive ? "text-blue-500" : ""}`}>
              Reorder Stock
            </NavLink></li>
            <li className={list_item_class}><NavLink to="/ps-insights" className={({isActive}) => `flex ml-10 w-full py-2 ${isActive ? "text-blue-500" : ""}`}>
                  Store Insights
            </NavLink></li>
          </ul>
        </div>

      </div>
       
    </nav>


  );
};

export default Navbar;
