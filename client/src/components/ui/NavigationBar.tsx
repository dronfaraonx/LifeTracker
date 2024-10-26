import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logo from '../../../public/LOGO circle.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); 
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/plants');
  };

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };
  
  return (
    <nav>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "2px solid green",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: 50, cursor: 'pointer' }}
              onClick={handleLogoClick}
            />
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontFamily: "Roboto, sans-serif",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              Растения
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "gray", fontFamily: "Roboto, sans-serif" }}
            >
              Клоны
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "gray", fontFamily: "Roboto, sans-serif" }}
            >
              Семена
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "gray", fontFamily: "Roboto, sans-serif" }}
            >
              Оплата и доставка
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            <SearchIcon sx={{ color: "gray" }} />
            <input
              placeholder="Поиск"
              style={{
                marginLeft: 10,
                color: "gray",
                border: "none",
                background: "transparent",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("Search:", e.currentTarget.value);
                }
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <PersonIcon sx={{ color: "gray" }} />
            </IconButton>
            <IconButton>
              <FavoriteIcon sx={{ color: "gray" }} />
            </IconButton>
            <IconButton onClick={handleAddToCart}>
              <Badge badgeContent={cartCount} color="primary" showZero
sx={{
  "& .MuiBadge-badge": {
    backgroundColor: "green", 
    color: "white",         
  },
}}>
                <ShoppingCartIcon sx={{ color: "gray" }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              position: "fixed",
              top: "180px",
              width: "100%",
              height: "calc(100vh - 180px)",
              margin: "0",
              borderRadius: 0,
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <DialogTitle>Каталог растений</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
              }}
            >
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "1.2rem" }}
              >
                Монстера
              </Link>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "1.2rem" }}
              >
                Алоказия
              </Link>
            </Box>
          </DialogContent>
        </Dialog>
      </AppBar>
    </nav>
  );
}
