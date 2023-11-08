import React, { PropsWithChildren } from 'react';
import AppToolBar from '../UI/AppToolBar/AppToolBar';
import Footer from '../UI/Footer/Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <AppToolBar />
      </header>

      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
