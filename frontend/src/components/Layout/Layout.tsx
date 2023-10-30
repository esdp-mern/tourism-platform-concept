import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header></header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
