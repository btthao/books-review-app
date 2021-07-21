import React from "react";
import Nav from "./Nav";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="  min-w-full min-h-screen">
      <div className="  max-w-screen-2xl m-auto">
        <Nav />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
