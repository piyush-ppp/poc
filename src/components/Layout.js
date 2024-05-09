// components/Layout.js

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '50px' }}> {/* Padding bottom should be equal to the height of the footer */}
      <Navbar />
      <main style={{ marginTop: '20px' }}>
        {<Outlet/>}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
