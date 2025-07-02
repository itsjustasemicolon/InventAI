  import React from 'react'
  import Home from "./components/Home.jsx"
  import Navbar from './components/Navbar.jsx'

  const App = () => {
    return (
      <div 
        className={`flex flex-row min-w-screen w-full min-h-screen bg-[#f5f5f5] 
          bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] 
          bg-[size:6rem_4rem]`}
      >
        <div
         className={`fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]
           z-0 min-h-screen `} 
        />

        <div 
        className={`relative z-10 flex min-w-full `}
        >
           <Navbar />
           <Home />
        </div>
      </div>
    )
  }

  export default App

