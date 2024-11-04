import Navbar from './ui/NavigationBar'; 

import { Outlet } from "react-router-dom";
import Footer from "./ui/Footer";

export default function Layout() {
  return (
    <>
              <Navbar />

              <Outlet/> 

              <Footer/>
    </>
  );
}
