import { PersonAdd, Logout } from "@mui/icons-material";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import React from "react";
import { IoShieldHalfSharp } from "react-icons/io5";
import LogoutButton from "../../../ui/btns/LogoutBtn";

export default function AccountModal({ anchorEl, open, onClose }) {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Мои заказы
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <IoShieldHalfSharp />
        </ListItemIcon>
        Изменить пароль
      </MenuItem>
      <LogoutButton/>
    </Menu>
  );
}
