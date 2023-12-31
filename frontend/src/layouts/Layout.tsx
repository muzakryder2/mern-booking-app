import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Hero />
      <div className='container mx-auto py-10 flex-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
