import React from "react";
import Navbar from './ui/NavigationBar'; 

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
              <Navbar />

              <Outlet/> 

    </>
  );
}
