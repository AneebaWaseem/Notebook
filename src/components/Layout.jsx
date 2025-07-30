// Layout.jsx
import React from 'react'
import Navbar from './Navigate'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
