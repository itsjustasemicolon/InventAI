  import React from 'react'
  import Home from "./components/Home.jsx"
  import Navbar from './components/Navbar.jsx'

  const App = () => {
    return (
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute  bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] z-0" />
        
        <div className="relative z-10">
          <Navbar >
          </Navbar>

          <Home />
        </div>
      </div>
    )
  }

  export default App
