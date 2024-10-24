import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import { Button } from "@mui/material";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { useUser } from "../../context/auth";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';

export default function Header() {
  const { user, isLoading } = useUser(); 
  const [anchorEl, setAnchorEl] = useState(null);
    const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <header>
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">
          <div className="col-sm-2 part1">
            <Link to="/" className="d-flex align-items-center logo">
              <img
                src={logo}
                alt="App Logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </div>

          <div className="col-sm-3 d-flex align-items-center part2 res-hide">
            <Button className="rounded-circle mr-3">
              <MdMenuOpen />
            </Button>
          </div>

          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
            <Button className="rounded-circle mr-3">
              <MdOutlineMenu />
            </Button>
            <Button className="rounded-circle mr-3">
              <CiLight />
            </Button>
            <Button className="rounded-circle mr-3">
              <FaRegBell />
            </Button>

            {/* User Section */}
            <div className="myAccWrapper">
              <Button className="myAcc myAcc-btn d-flex align-items-center">
                <div className="userImg">
                  <span className="rounded-circle">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="User" />
                    ) : (
                      <img src={logo} alt="Default" />
                    )}
                  </span>
                </div>
                <div className="userInfo">
                  <h4 className="ml-2">{user ? user.name : "Guest"}</h4>
                  <p className="ml-2">{user ? user.email : ""}</p>
                </div>
              </Button>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
