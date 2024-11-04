import { PersonAdd } from "@mui/icons-material";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { IoShieldHalfSharp } from "react-icons/io5";
import LogoutButton from "../../../ui/btns/LogoutBtn";
import { useNavigate } from "react-router-dom";


interface AccountModalProps {
  anchorEl: HTMLElement | null; 
  open: boolean; 
  onClose: () => void; 
}
export default function AccountModal({ anchorEl, open, onClose }: AccountModalProps) {
  const navigate = useNavigate();
  const handleAccClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleAccClick}>
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
