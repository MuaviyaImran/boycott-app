import React from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Banner from "components/banner";
import { LayoutProps } from "types/types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <Banner />
      <main className="mx-5">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
