import React from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <Dashboard/>
      </div>
    </div>
  )
}

export default Home