import React from 'react';
import BottonNav from './BottonNav';
import Nav from './ContextNav';
import Footer from "./Footer"

const MainLayout = ({ children, usuario }) => {

  return (
    <div>
      <Nav />
      {children}
      <BottonNav usuario={usuario} />
      <Footer />
    </div>
  );
};

export default MainLayout;
