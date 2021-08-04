import React from "react";
import Nav from "./Nav";

//done
const Layout: React.FC = ({ children }) => {
  return (
    <div className=" text-gray-300 min-w-xxs  max-w-screen-2xl m-auto">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
