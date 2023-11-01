import React, { PropsWithChildren } from 'react';
import AppToolBar from '../UI/AppToolBar/AppToolBar';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <AppToolBar />
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
