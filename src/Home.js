import React, { useContext } from 'react'
import Sidebar from './General/SideBar/Sidebar'
import Dashboard from './pages/Dashboard'
import Navbar from './General/Navbar'
import PopularDestinations from './pages/PopularDestinations'
import { CurrentPageContext } from './store/pages-context'
import { DASHBOARDPAGE, LOGINPAGE, POPULARDESTINATIONPAGE, REGISTERPAGE } from './General/ConstStates'
import Login from './General/Login/Login'
import Register from './General/Register/Register'

const Home = () => {
  const {currentPage,handlePageClick} =useContext(CurrentPageContext)
  return (
    <>
    {
      // currentPage === LOGINPAGE && <Login/>  &&
      currentPage === REGISTERPAGE && <Register/>
    }
    {
      currentPage !== LOGINPAGE && currentPage !== REGISTERPAGE &&
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
    }
    
    </>
  )
}

export default Home