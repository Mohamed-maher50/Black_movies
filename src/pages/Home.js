import React from "react";

import Footer from "../components/footer/Footer";
import Movies from "../components/Movies/Movies";
import Navbar from "../components/Navbar/Navbar";

import SideMenu from "../components/sideMenu/SideMenu";
function Home() {
  return (
    <div>
      <Navbar />
      <SideMenu />
      <Movies />
      <Footer />
    </div>
  );
}

export default Home;
