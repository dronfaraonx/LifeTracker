import React, { useState } from "react";
import "./../../index.css"
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
// import logo from "../../../public/LOGO circle.png";
import { useUser } from "../../context/auth";
import AccountModal from "../pages/Authorization/modal/AccountModal";
import SignupModal from "../pages/Authorization/modal/SignUpModal";
import { useCart } from "../../context/CountCart";

export default function Navbar() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { cartCounter } = useCart();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate(`/cart/${user.id}`);
  };

  const handleClonesClick = () => {
    navigate(`/clones`);
  };
  
  const handleSeedsClick = () => {
    navigate(`/seeds`);
  };

  const handleOpenMenu = (event: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);

  return (
<nav className="head">
      <AppBar
        position="static"
        sx={{
          background: "#00ab84",
          boxShadow: "none",
          borderBottom: "2px solid black",
         
        }}
      >

        <Toolbar
          sx={{ justifyContent: "space-between", background: "#00ab84", fontSize: "1rem" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "black",
            }}
          >
            <img
              src="/LOGO circle.png"
              alt="Logo"
              style={{ height: 70, cursor: "pointer"}}
              onClick={handleLogoClick}
            />
            <Typography
              variant="body1"
              className="header-link"
              style={{ cursor: "pointer",  fontSize:'1.3rem'}}

              sx={{
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              Растения
            </Typography>
            <Typography className="header-link" variant="body1"  onClick={handleClonesClick} style={{ cursor: "pointer" ,fontSize:'1.3rem'}}>
              Клоны
            </Typography>
            <Typography className="header-link" variant="body1" onClick={handleSeedsClick} style={{ cursor: "pointer", fontSize:'1.3rem' }}>
              Семена
            </Typography>
            <Typography className="header-link" variant="body1" style={{ cursor: "pointer", fontSize:'1.3rem' }}>
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
            <SearchIcon sx={{ color: "black" }} />
            <input
              placeholder="Поиск"
              style={{
                marginLeft: 10,
                color: "black",
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
            <IconButton onClick={user ? handleOpenMenu : handleOpenLogin}>
              <PersonIcon sx={{ color: "black" }} />
            </IconButton>

            {user ? (
              <AccountModal
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              />
            ) : (
              <SignupModal open={isLoginOpen} onClose={handleCloseLogin} />
            )}

            {user && (
              <>
                <IconButton>
                  <FavoriteIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton onClick={handleCartClick}>
                  <Badge
                    badgeContent={cartCounter}
                    color="primary"
                    showZero
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#e6f6f3",
                        color: "black",
                      },
                    }}
                  >
                    <ShoppingCartIcon sx={{ color: "black" }} />
                  </Badge>
                </IconButton>
              </>
            )}
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