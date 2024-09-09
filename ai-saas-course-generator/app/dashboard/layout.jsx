'use client'; // Use this only if client-side rendering is necessary

import React from 'react';
import SideBar from './_components/SideBar';
import Header from '../_components/Header';

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <div className="md:w-64 hidden md:block">
        <SideBar />
      </div>
      <div className="flex-1">
        <Header />
        <div className='p-10'>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
