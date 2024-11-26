import React, { useContext } from 'react'
import Sidebar from './General/SideBar/Sidebar'
import Dashboard from './pages/Dashboard'
import Navbar from './General/Navbar'
import PopularDestinations from './pages/PopularDestinations'
import { CurrentPageContext } from './store/pages-context'
import { DASHBOARDPAGE, POPULARDESTINATIONPAGE } from './General/ConstStates'

const Home = () => {
  const {currentPage,handlePageClick} =useContext(CurrentPageContext)
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        {
           currentPage === DASHBOARDPAGE && <Dashboard/>
        }
        {currentPage === POPULARDESTINATIONPAGE && <PopularDestinations></PopularDestinations>}
        
      </div>
    </div>
  )
}

export default Home