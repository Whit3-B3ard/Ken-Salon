"use client"
import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

function Sidebar() {
  return (
    <div style={{backgroundColor:"#1F2937"}}>
      <DesktopSidebar />
      <MobileSidebar />
    </div>
  )
}

export default Sidebar
