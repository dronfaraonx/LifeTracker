import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import { Button, Divider } from "@mui/material";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { useUser } from "../../context/auth";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import { Settings } from "@mui/icons-material";
import LogoutButton from "./btns/LogoutBtn";

export default function Header() {
  const { user, isLoading } = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationEl, setNotificationEl] = useState<null | HTMLElement>(null);
  
  const openAcc = Boolean(anchorEl);
  const openNotification = Boolean(notificationEl);

  // Account menu handling
  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorEl(null);
  };

  // Notifications menu handling
  const handleClickNotification = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationEl(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setNotificationEl(null);
  }

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

            <Button className="rounded-circle mr-3" onClick={handleClickNotification}>
              <FaRegBell />
            </Button>

            <Menu
              anchorEl={notificationEl}
              className="notifications dropdown_list"
              id="notifications"
              open={openNotification}
              onClose={handleCloseNotification}
              onClick={handleCloseNotification}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <div className="head pl-3 pb-0">
                <h5 className="notif">Notifications (12)</h5>
              </div>
              <Divider />
              <MenuItem onClick={handleCloseNotification}>
                <ListItemIcon>
                  <PersonAdd fontSize="small"/>
                </ListItemIcon> 
                Notification 1
              </MenuItem>s
              <Divider className="mb-1" />
              <div className='scroll'>
                  <MenuItem onClick={handleCloseAccount}>
                      <div className='d-flex'>
                          <div className='dropdownInfo'>
                              <h4>
                                  <span>
                                      <b>Mahmudul </b>
                                      added to his favorite list
                                      <b> Leather belt steve madden</b>
                                  </span>
                              </h4>
                              <p className='text-sky mb-0'>few seconds ago</p>
                          </div>
                      </div>
                  </MenuItem>

                  <MenuItem onClick={handleCloseAccount}>
                      <div className='d-flex'>
                          <div>
                          </div>

                          <div className='dropdownInfo'>
                              <h4>
                                  <span>
                                      <b>Mahmudul </b>
                                      added to his favorite list
                                      <b> Leather belt steve madden</b>
                                  </span>
                              </h4>
                              <p className='text-sky mb-0'>few seconds ago</p>
                          </div>
                      </div>
                  </MenuItem>


                  <MenuItem onClick={handleCloseAccount}>
                      <div className='d-flex'>
                          <div>
    
                          </div>

                          <div className='dropdownInfo'>
                              <h4>
                                  <span>
                                      <b>Mahmudul </b>
                                      added to his favorite list
                                      <b> Leather belt steve madden</b>
                                  </span>
                              </h4>
                              <p className='text-sky mb-0'>few seconds ago</p>
                          </div>
                      </div>
                  </MenuItem>


                  <MenuItem onClick={handleCloseAccount}>
                      <div className='d-flex'>

                          <div className='dropdownInfo'>
                              <h4>
                                  <span>
                                      <b>Mahmudul </b>
                                      added to his favorite list
                                      <b> Leather belt steve madden</b>
                                  </span>
                              </h4>
                              <p className='text-sky mb-0'>few seconds ago</p>
                          </div>
                      </div>
                  </MenuItem>


                  <MenuItem onClick={handleCloseAccount}>
                      <div className='d-flex'>

                          <div className='dropdownInfo'>
                              <h4>
                                  <span>
                                      <b>Mahmudul </b>
                                      added to his favorite list
                                      <b> Leather belt steve madden</b>
                                  </span>
                              </h4>
                              <p className='text-sky mb-0'>few seconds ago</p>
                          </div>
                      </div>
                  </MenuItem>


                  <MenuItem onClick={handleCloseAccount}>
                      <div className='d-flex'>

                          <div className='dropdownInfo'>
                              <h4>
                                  <span>
                                      <b>Mahmudul </b>
                                      added to his favorite list
                                      <b> Leather belt steve madden</b>
                                  </span>
                              </h4>
                              <p className='text-sky mb-0'>few seconds ago</p>
                          </div>
                      </div>
                  </MenuItem>
              </div>
            </Menu>

            {/* User Section */}
            <div className="myAccWrapper">
              <Button 
                className="myAcc myAcc-btn d-flex align-items-center"
                onClick={handleClickAccount}
                style={{ padding: '0.5rem 1rem' }} // Ensure enough padding for hover area
              >
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

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openAcc}
                onClose={handleCloseAccount}
                onClick={handleCloseAccount}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleCloseAccount}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseAccount}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <LogoutButton />
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
